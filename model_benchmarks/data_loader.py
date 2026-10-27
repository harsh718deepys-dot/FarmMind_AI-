"""
FarmMind AI - Model Benchmark Data Loader
Loads and prepares FarmMind_Split dataset (Cotton, Maize, Rice - 20 Classes)
"""
import os
import glob
import json
import numpy as np
import tensorflow as tf
from sklearn.utils.class_weight import compute_class_weight

IMAGE_SIZE = (224, 224)
BATCH_SIZE = 32
SEED = 42

DEFAULT_SPLIT_DIR = os.path.abspath(os.path.join(
    os.path.dirname(__file__), "..", "..", "DATASETS", "FarmMind_Split"
))

def get_class_names(split_dir=DEFAULT_SPLIT_DIR):
    """
    Returns sorted list of 20 unique classes formatted as <Crop>___<Class>
    """
    train_glob = os.path.join(split_dir, "train", "*", "*", "*.*")
    files = glob.glob(train_glob)
    if not files:
        raise FileNotFoundError(f"No train files found at: {train_glob}")
    
    classes = set()
    for f in files:
        parts = os.path.normpath(f).split(os.sep)
        crop = parts[-3]
        disease_class = parts[-2]
        classes.add(f"{crop}___{disease_class}")
        
    return sorted(list(classes))

def get_file_list_and_labels(split_name, split_dir=DEFAULT_SPLIT_DIR, classes=None):
    """
    Extracts all image paths and their integer labels for a split ('train', 'validation', 'test')
    """
    if classes is None:
        classes = get_class_names(split_dir)
        
    class_to_idx = {c: i for i, c in enumerate(classes)}
    pattern = os.path.join(split_dir, split_name, "*", "*", "*.*")
    files = glob.glob(pattern)
    
    file_paths = []
    labels = []
    
    for f in files:
        parts = os.path.normpath(f).split(os.sep)
        crop = parts[-3]
        disease_class = parts[-2]
        class_name = f"{crop}___{disease_class}"
        if class_name in class_to_idx:
            file_paths.append(f)
            labels.append(class_to_idx[class_name])
            
    return file_paths, np.array(labels, dtype=np.int32), classes

def get_class_weights(split_dir=DEFAULT_SPLIT_DIR, classes=None):
    """
    Calculates balanced class weights from training set to handle class imbalance
    """
    _, y_train, classes = get_file_list_and_labels("train", split_dir, classes)
    cw_array = compute_class_weight("balanced", classes=np.unique(y_train), y=y_train)
    return {i: float(cw_array[i]) for i in range(len(classes))}

def create_dataset(split_name, split_dir=DEFAULT_SPLIT_DIR, batch_size=BATCH_SIZE, augment=False, classes=None, max_samples=None):
    """
    Creates an optimized tf.data.Dataset
    """
    files, labels, classes = get_file_list_and_labels(split_name, split_dir, classes)
    
    if max_samples and max_samples < len(files):
        indices = np.random.RandomState(SEED).choice(len(files), size=max_samples, replace=False)
        files = [files[i] for i in indices]
        labels = labels[indices]
        
    file_ds = tf.data.Dataset.from_tensor_slices(files)
    label_ds = tf.data.Dataset.from_tensor_slices(labels)
    ds = tf.data.Dataset.zip((file_ds, label_ds))
    
    if augment:
        ds = ds.shuffle(buffer_size=min(len(files), 1000), seed=SEED)
        
    def load_and_preprocess(file_path, label):
        img_bytes = tf.io.read_file(file_path)
        img = tf.image.decode_image(img_bytes, channels=3, expand_animations=False)
        img.set_shape([None, None, 3])
        img = tf.image.resize(img, IMAGE_SIZE)
        img = tf.cast(img, tf.float32) / 255.0  # Normalized [0, 1]
        return img, label
        
    ds = ds.map(load_and_preprocess, num_parallel_calls=tf.data.AUTOTUNE)
    
    if augment:
        data_augmentation = tf.keras.Sequential([
            tf.keras.layers.RandomFlip("horizontal", seed=SEED),
            tf.keras.layers.RandomRotation(0.08, seed=SEED),
            tf.keras.layers.RandomZoom(0.08, seed=SEED),
            tf.keras.layers.RandomContrast(0.15, seed=SEED)
        ])
        ds = ds.map(lambda x, y: (data_augmentation(x, training=True), y), num_parallel_calls=tf.data.AUTOTUNE)
        
    ds = ds.batch(batch_size)
    ds = ds.prefetch(tf.data.AUTOTUNE)
    return ds, len(files), classes

if __name__ == "__main__":
    classes = get_class_names()
    print(f"Detected {len(classes)} classes:")
    for idx, c in enumerate(classes):
        print(f"  {idx}: {c}")
    
    weights = get_class_weights(classes=classes)
    print(f"Computed class weights for {len(weights)} classes.")
