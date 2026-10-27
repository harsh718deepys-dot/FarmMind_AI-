"""
Build Clean Master Dataset for FarmMind AI
"""
import os
import shutil
import csv
import sys
from pathlib import Path
from collections import defaultdict

try:
    from PIL import Image
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image

DATASET_ROOT = Path(r"C:\Documents\EDI PROJECT\DATASETS")
OUTPUT_DIR = DATASET_ROOT / "FarmMind_Dataset"

# Sources
COTTON_SRC = DATASET_ROOT / "cottondataset" / "Cotton plant disease" / "Cotton plant disease"
MAIZE_SRC = DATASET_ROOT / "maize-diseases" / "versions" / "2" / "v1.0"
RICE_SRC = DATASET_ROOT / "paddy-disease-classification" / "train_images"

# Target counts
EXPECTED_COTTON = 237
EXPECTED_MAIZE = 3852
EXPECTED_RICE = 10407
EXPECTED_TOTAL = 14496

IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".bmp", ".tif", ".tiff", ".webp", ".gif"}

def is_image(path: Path) -> bool:
    return path.suffix.lower() in IMAGE_EXTENSIONS

# Mappings: (Crop, Source_Class_Name, Target_Class_Name)
MAPPINGS = {
    "Cotton": {
        "Aphids edited": "Aphids",
        "Army worm edited": "Army_worm",
        "Bacterial Blight edited": "Bacterial_Blight",
        "Healthy leaf edited": "Healthy",
        "Powdery Mildew Edited": "Powdery_Mildew",
        "Target spot edited": "Target_spot"
    },
    "Maize": {
        "Common Rust": "Common_Rust",
        "Gray Leaf Spot": "Gray_Leaf_Spot",
        "Healthy": "Healthy",
        "Northern Leaf Blight": "Northern_Leaf_Blight"
    },
    "Rice": {
        "bacterial_leaf_blight": "bacterial_leaf_blight",
        "bacterial_leaf_streak": "bacterial_leaf_streak",
        "bacterial_panicle_blight": "bacterial_panicle_blight",
        "blast": "blast",
        "brown_spot": "brown_spot",
        "dead_heart": "dead_heart",
        "downy_mildew": "downy_mildew",
        "hispa": "hispa",
        "normal": "normal",
        "tungro": "tungro"
    }
}

def verify_source_counts():
    """Verify that source directories have the expected counts before copying."""
    actual_counts = {"Cotton": 0, "Maize": 0, "Rice": 0}
    
    if COTTON_SRC.exists():
        actual_counts["Cotton"] = sum(1 for f in COTTON_SRC.rglob("*") if f.is_file() and is_image(f))
    if MAIZE_SRC.exists():
        actual_counts["Maize"] = sum(1 for f in MAIZE_SRC.rglob("*") if f.is_file() and is_image(f))
    if RICE_SRC.exists():
        actual_counts["Rice"] = sum(1 for f in RICE_SRC.rglob("*") if f.is_file() and is_image(f))
        
    print(f"Pre-copy check - Source Counts:")
    print(f"  Cotton: {actual_counts['Cotton']} (Expected: {EXPECTED_COTTON})")
    print(f"  Maize: {actual_counts['Maize']} (Expected: {EXPECTED_MAIZE})")
    print(f"  Rice: {actual_counts['Rice']} (Expected: {EXPECTED_RICE})")
    
    if actual_counts["Cotton"] != EXPECTED_COTTON or actual_counts["Maize"] != EXPECTED_MAIZE or actual_counts["Rice"] != EXPECTED_RICE:
        print("\nERROR: Source counts do not match expected totals. Aborting.")
        sys.exit(1)
    
    return True

def main():
    print("=" * 60)
    print("FarmMind AI - Dataset Builder")
    print("=" * 60)
    
    verify_source_counts()
    
    # Create target directory
    if OUTPUT_DIR.exists():
        print(f"\nWARNING: Output directory {OUTPUT_DIR} already exists. It will be populated with new files.")
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    # Structure setup
    for crop, classes in MAPPINGS.items():
        for dest_cls in classes.values():
            (OUTPUT_DIR / crop / dest_cls).mkdir(parents=True, exist_ok=True)
            
    manifest_rows = []
    summary_rows = []
    
    crop_counts = defaultdict(int)
    class_counts = defaultdict(lambda: defaultdict(int))
    
    sources = {
        "Cotton": COTTON_SRC,
        "Maize": MAIZE_SRC,
        "Rice": RICE_SRC
    }
    
    corrupted_count = 0
    duplicate_names = defaultdict(int)
    
    for crop, src_dir in sources.items():
        print(f"\nProcessing {crop}...")
        for src_cls, dest_cls in MAPPINGS[crop].items():
            cls_src_dir = src_dir / src_cls
            if not cls_src_dir.exists():
                print(f"  ERROR: Source class dir not found: {cls_src_dir}")
                continue
                
            cls_dest_dir = OUTPUT_DIR / crop / dest_cls
            
            # Keep track of target filenames to avoid collisions
            seen_names = set()
            
            for f in cls_src_dir.iterdir():
                if not f.is_file() or not is_image(f):
                    continue
                    
                target_filename = f.name
                
                # Handle duplicate filenames explicitly by appending a counter
                if target_filename in seen_names:
                    duplicate_names[crop] += 1
                    base = f.stem
                    ext = f.suffix
                    counter = 1
                    while f"{base}_{counter}{ext}" in seen_names:
                        counter += 1
                    target_filename = f"{base}_{counter}{ext}"
                
                seen_names.add(target_filename)
                
                dest_path = cls_dest_dir / target_filename
                
                # Copy file
                if not dest_path.exists():
                    shutil.copy2(f, dest_path)
                
                # Verify and get properties
                w, h, fmt = "", "", ""
                try:
                    with Image.open(dest_path) as im:
                        im.verify()
                    with Image.open(dest_path) as im:
                        w, h = im.size
                        fmt = im.format
                except Exception as e:
                    corrupted_count += 1
                    fmt = "CORRUPTED"
                
                manifest_rows.append({
                    "crop": crop,
                    "class": dest_cls,
                    "image_path": str(dest_path),
                    "source_path": str(f),
                    "width": w,
                    "height": h,
                    "format": fmt
                })
                
                crop_counts[crop] += 1
                class_counts[crop][dest_cls] += 1
                
        print(f"  Copied {crop_counts[crop]} {crop} images.")

    # Write Manifest
    manifest_path = OUTPUT_DIR / "dataset_manifest.csv"
    with open(manifest_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["crop", "class", "image_path", "source_path", "width", "height", "format"])
        writer.writeheader()
        writer.writerows(manifest_rows)
        
    # Write Summary
    summary_path = OUTPUT_DIR / "dataset_summary.csv"
    with open(summary_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["crop", "class", "image_count"])
        writer.writeheader()
        for crop, classes in sorted(class_counts.items()):
            for cls, count in sorted(classes.items()):
                writer.writerow({"crop": crop, "class": cls, "image_count": count})
                summary_rows.append({"crop": crop, "class": cls, "image_count": count})
                
    total_images = sum(crop_counts.values())
    
    print("\n" + "=" * 60)
    print("FINAL VERIFICATION")
    print("=" * 60)
    
    # 1. Image count per class
    print("\nClass-wise counts:")
    for crop, classes in sorted(class_counts.items()):
        print(f"  {crop}:")
        for cls, count in sorted(classes.items()):
            print(f"    - {cls}: {count}")

    # 2. Total images per crop
    print("\nTotal images per crop:")
    print(f"  Cotton: {crop_counts['Cotton']} (Expected: {EXPECTED_COTTON})")
    print(f"  Maize: {crop_counts['Maize']} (Expected: {EXPECTED_MAIZE})")
    print(f"  Rice: {crop_counts['Rice']} (Expected: {EXPECTED_RICE})")

    # 3. Total images overall
    print(f"\nTotal images overall: {total_images} (Expected: {EXPECTED_TOTAL})")
    
    # 4. Number of unreadable/corrupt images
    print(f"Corrupted images: {corrupted_count}")
    
    # 7. Duplicate filenames handled
    print(f"Duplicate filenames resolved: {dict(duplicate_names)}")
    
    if total_images == EXPECTED_TOTAL:
        print(f"\nSUCCESS: Exactly {EXPECTED_TOTAL} images were copied to FarmMind_Dataset.")
    else:
        print(f"\nERROR: Count mismatch! Expected {EXPECTED_TOTAL}, got {total_images}.")
        
if __name__ == "__main__":
    main()
