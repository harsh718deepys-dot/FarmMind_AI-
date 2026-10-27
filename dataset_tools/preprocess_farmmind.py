"""
FarmMind AI - MobileNetV3 Preprocessing Pipeline
Creates TF datasets, applies targeted augmentation (train only),
MobileNetV3 preprocessing, and computes class weights.
"""
import os
import glob
import json
# pyrefly: ignore [missing-import]
import numpy as np
import tensorflow as tf
import matplotlib.pyplot as plt
from sklearn.utils.class_weight import compute_class_weight

SEED = 42
BATCH_SIZE = 32
IMAGE_SIZE = (224, 224)
SPLIT_DIR = r"C:\Documents\EDI PROJECT\DATASETS\FarmMind_Split"
OUTPUT_DIR = r"C:\Documents\EDI PROJECT\DATASETS\FarmMind_Split"

def main():
    print("=" * 60)
    print("FarmMind AI - MobileNetV3 Preprocessing Pipeline")
    print("=" * 60)

    # 1. Detect 20 classes by looking at train folder
    train_glob = os.path.join(SPLIT_DIR, 'train', '*', '*', '*.*')
    val_glob = os.path.join(SPLIT_DIR, 'validation', '*', '*', '*.*')
    test_glob = os.path.join(SPLIT_DIR, 'test', '*', '*', '*.*')

    train_files = glob.glob(train_glob)
    val_files = glob.glob(val_glob)
    test_files = glob.glob(test_glob)

    if not train_files:
        print("ERROR: No training files found! Please check the directory structure.")
        return

    # Extract labels (folder name)
    train_labels_text = [os.path.basename(os.path.dirname(f)) for f in train_files]
    classes = sorted(list(set(train_labels_text)))

    if len(classes) != 20:
        print(f"ERROR: Expected 20 classes, found {len(classes)}.")
        return

    print(f"Detected {len(classes)} classes:")
    print(classes)

    # 2. Calculate Class Weights (ONLY from training set)
    print("\nCalculating class weights from training set...")
    y_train = [classes.index(l) for l in train_labels_text]
    
    # compute_class_weight('balanced') gives a weight such that n_samples / (n_classes * np.bincount(y))
    cw_array = compute_class_weight('balanced', classes=np.unique(y_train), y=y_train)
    class_weights_dict = {classes[i]: float(cw_array[i]) for i in range(len(classes))}
    keras_class_weights = {i: float(cw_array[i]) for i in range(len(classes))}

    cw_path = os.path.join(OUTPUT_DIR, 'class_weights.json')
    with open(cw_path, 'w') as f:
        json.dump(class_weights_dict, f, indent=4)
    print(f"Class weights saved to: {cw_path}")
    for k, v in class_weights_dict.items():
        print(f"  {k}: {v:.4f}")

    # 3. Create TensorFlow Datasets
    # We use list_files and a mapping function to handle the 3-level deep nested structure
    class_names_tf = tf.constant(classes)

    def get_label(file_path):
        parts = tf.strings.split(file_path, os.path.sep)
        return tf.argmax(parts[-2] == class_names_tf)

    def decode_and_resize(file_path):
        img = tf.io.read_file(file_path)
        img = tf.image.decode_image(img, channels=3, expand_animations=False)
        img.set_shape([None, None, 3])
        img = tf.image.resize(img, IMAGE_SIZE)
        label = get_label(file_path)
        return img, label

    def mobilenet_preprocess(img, label):
        # MobileNetV3 expects inputs in range [-1, 1] or raw [0, 255] depending on include_top and config.
        # tf.keras.applications.mobilenet_v3.preprocess_input does standard scaling.
        img = tf.keras.applications.mobilenet_v3.preprocess_input(img)
        return img, label

    # Create base datasets
    train_ds = tf.data.Dataset.list_files(train_glob, seed=SEED, shuffle=True)
    val_ds = tf.data.Dataset.list_files(val_glob, shuffle=False)
    test_ds = tf.data.Dataset.list_files(test_glob, shuffle=False)

    train_ds = train_ds.map(decode_and_resize, num_parallel_calls=tf.data.AUTOTUNE)
    val_ds = val_ds.map(decode_and_resize, num_parallel_calls=tf.data.AUTOTUNE)
    test_ds = test_ds.map(decode_and_resize, num_parallel_calls=tf.data.AUTOTUNE)

    # 4. Define Training Augmentation
    data_augmentation = tf.keras.Sequential([
        tf.keras.layers.RandomFlip("horizontal", seed=SEED),
        tf.keras.layers.RandomRotation(0.1, seed=SEED),  # Small rotation
        tf.keras.layers.RandomZoom(0.1, seed=SEED),      # Small zoom
        tf.keras.layers.RandomTranslation(0.1, 0.1, seed=SEED), # Small translation
        tf.keras.layers.RandomContrast(0.2, seed=SEED),
        tf.keras.layers.RandomBrightness(0.2, value_range=(0, 255), seed=SEED) # Applied before preprocess_input
    ])

    def apply_augmentation(img, label):
        img = data_augmentation(img, training=True)
        return img, label

    # 5. Apply Pipeline
    # Train: Augment -> Preprocess
    train_ds = train_ds.batch(BATCH_SIZE)
    train_ds = train_ds.map(apply_augmentation, num_parallel_calls=tf.data.AUTOTUNE)
    train_ds = train_ds.map(mobilenet_preprocess, num_parallel_calls=tf.data.AUTOTUNE)
    train_ds = train_ds.prefetch(tf.data.AUTOTUNE)

    # Val/Test: Preprocess ONLY (No Augmentation)
    val_ds = val_ds.batch(BATCH_SIZE)
    val_ds = val_ds.map(mobilenet_preprocess, num_parallel_calls=tf.data.AUTOTUNE)
    val_ds = val_ds.prefetch(tf.data.AUTOTUNE)

    test_ds = test_ds.batch(BATCH_SIZE)
    test_ds = test_ds.map(mobilenet_preprocess, num_parallel_calls=tf.data.AUTOTUNE)
    test_ds = test_ds.prefetch(tf.data.AUTOTUNE)

    print("\nDataset Pipeline Configured:")
    print(f"  Training images: {len(train_files)}")
    print(f"  Validation images: {len(val_files)}")
    print(f"  Test images: {len(test_files)}")
    print(f"  Image shape: {IMAGE_SIZE} RGB")
    print(f"  Batch size: {BATCH_SIZE}")
    print(f"  Training Augmentation: Applied (Flip, Rotate, Zoom, Translate, Contrast, Brightness)")
    print(f"  Validation/Test Augmentation: NONE")

    # 6. Generate Preview Grid
    print("\nGenerating visualization grid from augmented training set...")
    plt.figure(figsize=(15, 10))
    for images, labels in train_ds.take(1):
        # MobileNetV3 preprocess_input scales to [-1, 1] usually. 
        # Convert back to [0, 1] for matplotlib plotting.
        # MobileNetV3 specifically uses (x / 127.5) - 1, so x = (x + 1) * 127.5
        vis_images = (images.numpy() + 1.0) / 2.0
        vis_images = np.clip(vis_images, 0, 1)
        
        for i in range(min(15, BATCH_SIZE)):
            ax = plt.subplot(3, 5, i + 1)
            plt.imshow(vis_images[i])
            plt.title(classes[labels[i].numpy()], fontsize=8)
            plt.axis("off")
            
    preview_path = os.path.join(OUTPUT_DIR, 'preprocessing_preview.png')
    plt.tight_layout()
    plt.savefig(preview_path, dpi=150)
    print(f"Preview saved to: {preview_path}")

if __name__ == "__main__":
    main()
