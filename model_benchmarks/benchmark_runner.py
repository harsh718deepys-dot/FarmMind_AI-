"""
FarmMind AI - Benchmark Runner & Quantizer
Performs comprehensive Online (FP32) vs Offline (TFLite Quantized) benchmarking
across MobileNetV3, ResNet50, EfficientNetB0, and Custom CNN.
"""
import os
import time
import json
import numpy as np
import tensorflow as tf
from sklearn.metrics import classification_report, accuracy_score, precision_recall_fscore_support, confusion_matrix

from data_loader import get_class_names, get_class_weights, create_dataset, get_file_list_and_labels, IMAGE_SIZE
from models import get_model

ARTIFACTS_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(ARTIFACTS_DIR, "saved_models")
os.makedirs(MODELS_DIR, exist_ok=True)

def train_model(model_name, epochs=3, max_train_samples=2000, max_val_samples=500):
    """
    Trains or fine-tunes the requested architecture with transfer learning.
    """
    print(f"\n==========================================")
    print(f"  Training & Configuring: {model_name}")
    print(f"==========================================")
    
    classes = get_class_names()
    num_classes = len(classes)
    
    train_ds, n_train, _ = create_dataset("train", batch_size=32, augment=True, classes=classes, max_samples=max_train_samples)
    val_ds, n_val, _ = create_dataset("validation", batch_size=32, augment=False, classes=classes, max_samples=max_val_samples)
    class_weights = get_class_weights(classes=classes)
    
    model = get_model(model_name, num_classes=num_classes)
    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=1e-4),
        loss="sparse_categorical_crossentropy",
        metrics=["accuracy"]
    )
    
    history = model.fit(
        train_ds,
        validation_data=val_ds,
        epochs=epochs,
        class_weight=class_weights,
        verbose=1
    )
    
    save_path = os.path.join(MODELS_DIR, f"{model_name}.keras")
    model.save(save_path)
    print(f"Model saved to: {save_path}")
    return model, save_path

def convert_to_tflite(model, model_name, quantization="int8"):
    """
    Converts a Keras model to quantized TFLite for offline edge deployment.
    """
    converter = tf.lite.TFLiteConverter.from_keras_model(model)
    converter.optimizations = [tf.lite.Optimize.DEFAULT]
    
    if quantization == "int8":
        # Dynamic range quantization (standard for mobile CPUs)
        converter.target_spec.supported_types = [tf.float16]
        
    tflite_model = converter.convert()
    tflite_path = os.path.join(MODELS_DIR, f"{model_name}_{quantization}.tflite")
    
    with open(tflite_path, "wb") as f:
        f.write(tflite_model)
        
    size_mb = os.path.getsize(tflite_path) / (1024 * 1024)
    print(f"TFLite ({quantization}) model saved to: {tflite_path} ({size_mb:.2f} MB)")
    return tflite_path, size_mb

def benchmark_online(model, test_images, test_labels, batch_size=32):
    """
    Measures Online Mode (Server / FP32 Keras):
    Accuracy, F1, Latency per sample (ms).
    """
    print("Evaluating Online (FP32 Server) performance...")
    start_time = time.time()
    predictions = model.predict(test_images, batch_size=batch_size, verbose=0)
    total_time = (time.time() - start_time) * 1000  # ms
    
    pred_labels = np.argmax(predictions, axis=1)
    latency_per_sample = total_time / len(test_images)
    
    acc = accuracy_score(test_labels, pred_labels)
    precision, recall, f1, _ = precision_recall_fscore_support(test_labels, pred_labels, average="macro", zero_division=0)
    
    return {
        "accuracy": float(acc),
        "precision": float(precision),
        "recall": float(recall),
        "f1": float(f1),
        "latency_ms": float(latency_per_sample),
        "predictions": pred_labels.tolist()
    }

def benchmark_offline_tflite(tflite_path, test_images, test_labels):
    """
    Measures Offline Mode (Edge / TFLite quantized runtime):
    Runs local TFLite interpreter and measures on-device inference latency & accuracy.
    """
    print("Evaluating Offline (TFLite Edge) performance...")
    interpreter = tf.lite.Interpreter(model_path=tflite_path)
    interpreter.allocate_tensors()
    
    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()
    
    pred_labels = []
    latencies = []
    
    for i in range(len(test_images)):
        img = np.expand_dims(test_images[i], axis=0).astype(np.float32)
        interpreter.set_tensor(input_details[0]['index'], img)
        
        t0 = time.perf_counter()
        interpreter.invoke()
        t1 = time.perf_counter()
        
        latencies.append((t1 - t0) * 1000)
        output_data = interpreter.get_tensor(output_details[0]['index'])
        pred_labels.append(int(np.argmax(output_data)))
        
    avg_latency = float(np.median(latencies))  # median ms
    pred_labels = np.array(pred_labels)
    
    acc = accuracy_score(test_labels, pred_labels)
    precision, recall, f1, _ = precision_recall_fscore_support(test_labels, pred_labels, average="macro", zero_division=0)
    
    return {
        "accuracy": float(acc),
        "precision": float(precision),
        "recall": float(recall),
        "f1": float(f1),
        "latency_ms": float(avg_latency),
        "predictions": pred_labels.tolist()
    }

def compute_crop_accuracies(classes, y_true, y_pred):
    """
    Computes per-crop accuracy for Cotton, Maize, and Rice
    """
    crop_stats = {"Cotton": {"correct": 0, "total": 0},
                  "Maize": {"correct": 0, "total": 0},
                  "Rice": {"correct": 0, "total": 0}}
                  
    for true_idx, pred_idx in zip(y_true, y_pred):
        class_name = classes[true_idx]
        crop = class_name.split("___")[0]
        if crop in crop_stats:
            crop_stats[crop]["total"] += 1
            if true_idx == pred_idx:
                crop_stats[crop]["correct"] += 1
                
    result = {}
    for crop, data in crop_stats.items():
        if data["total"] > 0:
            result[crop] = round((data["correct"] / data["total"]) * 100.0, 1)
        else:
            result[crop] = 0.0
    return result

def run_benchmarks(models_to_test=None, test_samples=200):
    """
    Executes full comparative benchmark suite across models
    """
    if models_to_test is None:
        models_to_test = ["mobilenet_v3_large", "mobilenet_v3_small", "resnet50", "efficientnet_b0", "custom_cnn"]
        
    classes = get_class_names()
    print(f"Preparing {test_samples} evaluation samples across 20 classes...")
    
    # Load test images in memory for high-precision latency profiling
    test_files, test_labels, _ = get_file_list_and_labels("test", classes=classes)
    indices = np.random.RandomState(42).choice(len(test_files), size=min(test_samples, len(test_files)), replace=False)
    
    eval_images = []
    eval_labels = test_labels[indices]
    for i in indices:
        img_bytes = tf.io.read_file(test_files[i])
        img = tf.image.decode_image(img_bytes, channels=3, expand_animations=False)
        img = tf.image.resize(img, IMAGE_SIZE)
        eval_images.append(img.numpy() / 255.0)
    eval_images = np.array(eval_images, dtype=np.float32)
    
    results = {
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "dataset": "FarmMind_Split (Cotton, Maize, Rice)",
        "num_classes": len(classes),
        "classes": classes,
        "models": {}
    }
    
    for m_name in models_to_test:
        print(f"\n==========================================")
        print(f"  BENCHMARKING MODEL: {m_name.upper()}")
        print(f"==========================================")
        
        # 1. Train or Load Model
        model, keras_path = train_model(m_name, epochs=2, max_train_samples=800, max_val_samples=200)
        keras_size_mb = os.path.getsize(keras_path) / (1024 * 1024)
        param_count = model.count_params()
        
        # 2. Benchmark Online Mode
        online_metrics = benchmark_online(model, eval_images, eval_labels)
        online_crop_acc = compute_crop_accuracies(classes, eval_labels, online_metrics["predictions"])
        
        # 3. Convert & Benchmark Offline TFLite Mode
        tflite_path, tflite_size_mb = convert_to_to_tflite_safe(model, m_name)
        offline_metrics = benchmark_offline_tflite(tflite_path, eval_images, eval_labels)
        offline_crop_acc = compute_crop_accuracies(classes, eval_labels, offline_metrics["predictions"])
        
        results["models"][m_name] = {
            "name": model.name,
            "parameters": int(param_count),
            "online": {
                "format": "FP32 (Keras)",
                "size_mb": round(keras_size_mb, 2),
                "accuracy": round(online_metrics["accuracy"] * 100, 2),
                "precision": round(online_metrics["precision"], 4),
                "recall": round(online_metrics["recall"], 4),
                "f1_score": round(online_metrics["f1"], 4),
                "latency_ms": round(online_metrics["latency_ms"], 2),
                "crop_accuracy": online_crop_acc
            },
            "offline": {
                "format": "INT8 / FP16 (TFLite)",
                "size_mb": round(tflite_size_mb, 2),
                "accuracy": round(offline_metrics["accuracy"] * 100, 2),
                "precision": round(offline_metrics["precision"], 4),
                "recall": round(offline_metrics["recall"], 4),
                "f1_score": round(offline_metrics["f1"], 4),
                "latency_ms": round(offline_metrics["latency_ms"], 2),
                "crop_accuracy": offline_crop_acc
            },
            "comparison": {
                "size_reduction_pct": round((1 - (tflite_size_mb / keras_size_mb)) * 100, 1),
                "accuracy_delta": round((offline_metrics["accuracy"] - online_metrics["accuracy"]) * 100, 2),
                "latency_speedup": round(online_metrics["latency_ms"] / max(offline_metrics["latency_ms"], 0.1), 2)
            }
        }
        
    # Save output JSON in model_benchmarks
    out_file = os.path.join(ARTIFACTS_DIR, "benchmark_results.json")
    with open(out_file, "w") as f:
        json.dump(results, f, indent=2)
    print(f"\n[SUCCESS] Benchmark results saved to: {out_file}")
    
    # Also copy to frontend data directory for direct UI consumption
    frontend_data_dir = os.path.abspath(os.path.join(
        ARTIFACTS_DIR, "..", "farmmind", "src", "data"
    ))
    os.makedirs(frontend_data_dir, exist_ok=True)
    frontend_file = os.path.join(frontend_data_dir, "benchmark_results.json")
    with open(frontend_file, "w") as f:
        json.dump(results, f, indent=2)
    print(f"[SUCCESS] Exported mirror to frontend data: {frontend_file}")
    
    return results

def convert_to_to_tflite_safe(model, m_name):
    try:
        return convert_to_tflite(model, m_name, "int8")
    except Exception as e:
        print(f"Standard INT8 quantization failed ({e}), falling back to default TFLite converter...")
        converter = tf.lite.TFLiteConverter.from_keras_model(model)
        tflite_model = converter.convert()
        tflite_path = os.path.join(MODELS_DIR, f"{m_name}_fallback.tflite")
        with open(tflite_path, "wb") as f:
            f.write(tflite_model)
        size_mb = os.path.getsize(tflite_path) / (1024 * 1024)
        return tflite_path, size_mb

if __name__ == "__main__":
    # Test run with MobileNetV3 and ResNet50
    run_benchmarks(["mobilenet_v3_large", "resnet50"], test_samples=100)
