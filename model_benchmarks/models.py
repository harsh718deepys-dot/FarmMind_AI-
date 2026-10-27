"""
FarmMind AI - Model Architectures for Benchmarking
Implements MobileNetV3 (Primary), ResNet50, EfficientNetB0, and SimpleCNN baselines.
"""
import tensorflow as tf

def build_mobilenet_v3(num_classes=20, input_shape=(224, 224, 3), variant="large"):
    """
    MobileNetV3 (Primary FarmMind Edge Model)
    Optimized for low-latency, mobile CPU execution.
    """
    if variant == "small":
        base_model = tf.keras.applications.MobileNetV3Small(
            input_shape=input_shape, include_top=False, weights="imagenet"
        )
    else:
        base_model = tf.keras.applications.MobileNetV3Large(
            input_shape=input_shape, include_top=False, weights="imagenet"
        )
        
    inputs = tf.keras.Input(shape=input_shape, name="input_image")
    # Base model expects input scaled to [-1, 1] or [0, 255]
    x = tf.keras.applications.mobilenet_v3.preprocess_input(inputs * 255.0)
    x = base_model(x, training=False)
    x = tf.keras.layers.GlobalAveragePooling2D(name="avg_pool")(x)
    x = tf.keras.layers.BatchNormalization()(x)
    x = tf.keras.layers.Dropout(0.25)(x)
    x = tf.keras.layers.Dense(128, activation="relu")(x)
    outputs = tf.keras.layers.Dense(num_classes, activation="softmax", name="predictions")(x)
    
    model = tf.keras.Model(inputs=inputs, outputs=outputs, name=f"MobileNetV3_{variant.capitalize()}")
    return model

def build_resnet50(num_classes=20, input_shape=(224, 224, 3)):
    """
    ResNet-50 (Deep Residual Benchmark)
    Standard high-capacity comparative baseline. Heavy footprint.
    """
    base_model = tf.keras.applications.ResNet50(
        input_shape=input_shape, include_top=False, weights="imagenet"
    )
    
    inputs = tf.keras.Input(shape=input_shape, name="input_image")
    x = tf.keras.applications.resnet50.preprocess_input(inputs * 255.0)
    x = base_model(x, training=False)
    x = tf.keras.layers.GlobalAveragePooling2D(name="avg_pool")(x)
    x = tf.keras.layers.BatchNormalization()(x)
    x = tf.keras.layers.Dropout(0.3)(x)
    x = tf.keras.layers.Dense(128, activation="relu")(x)
    outputs = tf.keras.layers.Dense(num_classes, activation="softmax", name="predictions")(x)
    
    model = tf.keras.Model(inputs=inputs, outputs=outputs, name="ResNet50")
    return model

def build_efficientnet_b0(num_classes=20, input_shape=(224, 224, 3)):
    """
    EfficientNet-B0 (Compound Scaling Benchmark)
    Balanced accuracy vs parameter count.
    """
    base_model = tf.keras.applications.EfficientNetB0(
        input_shape=input_shape, include_top=False, weights="imagenet"
    )
    
    inputs = tf.keras.Input(shape=input_shape, name="input_image")
    # EfficientNet expects [0, 255] inputs
    x = inputs * 255.0
    x = base_model(x, training=False)
    x = tf.keras.layers.GlobalAveragePooling2D(name="avg_pool")(x)
    x = tf.keras.layers.BatchNormalization()(x)
    x = tf.keras.layers.Dropout(0.2)(x)
    x = tf.keras.layers.Dense(128, activation="relu")(x)
    outputs = tf.keras.layers.Dense(num_classes, activation="softmax", name="predictions")(x)
    
    model = tf.keras.Model(inputs=inputs, outputs=outputs, name="EfficientNetB0")
    return model

def build_custom_cnn(num_classes=20, input_shape=(224, 224, 3)):
    """
    Standard Convolutional Baseline (Scratch / Non-pretrained)
    Demonstrates baseline performance of standard CNN before transfer learning.
    """
    inputs = tf.keras.Input(shape=input_shape, name="input_image")
    x = tf.keras.layers.Conv2D(32, (3, 3), activation="relu", padding="same")(inputs)
    x = tf.keras.layers.MaxPooling2D((2, 2))(x)
    x = tf.keras.layers.Conv2D(64, (3, 3), activation="relu", padding="same")(x)
    x = tf.keras.layers.MaxPooling2D((2, 2))(x)
    x = tf.keras.layers.Conv2D(128, (3, 3), activation="relu", padding="same")(x)
    x = tf.keras.layers.MaxPooling2D((2, 2))(x)
    x = tf.keras.layers.GlobalAveragePooling2D()(x)
    x = tf.keras.layers.Dropout(0.2)(x)
    outputs = tf.keras.layers.Dense(num_classes, activation="softmax", name="predictions")(x)
    
    model = tf.keras.Model(inputs=inputs, outputs=outputs, name="Custom_CNN")
    return model

def get_model(name, num_classes=20):
    name_lower = name.lower()
    if "mobilenet" in name_lower and "small" in name_lower:
        return build_mobilenet_v3(num_classes=num_classes, variant="small")
    elif "mobilenet" in name_lower:
        return build_mobilenet_v3(num_classes=num_classes, variant="large")
    elif "resnet" in name_lower:
        return build_resnet50(num_classes=num_classes)
    elif "efficient" in name_lower:
        return build_efficientnet_b0(num_classes=num_classes)
    elif "cnn" in name_lower:
        return build_custom_cnn(num_classes=num_classes)
    else:
        raise ValueError(f"Unknown model name: {name}")

if __name__ == "__main__":
    for m_name in ["mobilenet_large", "mobilenet_small", "resnet50", "efficientnet_b0", "custom_cnn"]:
        m = get_model(m_name, num_classes=20)
        params = m.count_params()
        print(f"Created {m.name}: {params:,} parameters")
