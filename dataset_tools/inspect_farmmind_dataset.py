"""
FarmMind AI - Dataset Audit Script
===================================
Inspects Cotton, Maize, and Paddy/Rice datasets.
Generates:
  - dataset_details.csv  (crop, class, image_path, width, height, format)
  - dataset_summary.csv  (crop, class, image_count)
  - Prints a full audit report to stdout.

Usage:
    python inspect_farmmind_dataset.py
"""

import os
import csv
import sys
import json
from pathlib import Path
from collections import Counter, defaultdict

# ---------------------------------------------------------------------------
# Try to import Pillow; install if missing
# ---------------------------------------------------------------------------
try:
    from PIL import Image
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image

# ---------------------------------------------------------------------------
# Configuration — dataset paths discovered on disk
# ---------------------------------------------------------------------------
DATASET_ROOT = Path(r"C:\Documents\EDI PROJECT\DATASETS")
OUTPUT_DIR = DATASET_ROOT / "dataset_audit"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".bmp", ".tif", ".tiff", ".webp", ".gif"}

# ---------------------------------------------------------------------------
# The cotton "main" dataset with the 6 disease/healthy classes
# Located at: cottondataset / Cotton leaves / 40 Images / <class>
# ---------------------------------------------------------------------------
COTTON_MAIN = DATASET_ROOT / "cottondataset" / "Cotton leaves" / "40 Images"

# Additional cotton variant folders (augmented / processed copies)
COTTON_VARIANTS = {
    "Cotton-Original":        DATASET_ROOT / "Cotton-Original" / "Cotton-Original",
    "Cotton plant disease":   DATASET_ROOT / "cottondataset" / "Cotton plant disease" / "Cotton plant disease",
    "5 Black and white":      DATASET_ROOT / "cottondataset" / "5 Black and white" / "5 Black and white",
    "HOG brighter":           DATASET_ROOT / "cottondataset" / "HOG brighter" / "4 HOG brighter",
    "HOG_data":               DATASET_ROOT / "cottondataset" / "HOG_data" / "3 HOG",
    "Main dataset (001)":     DATASET_ROOT / "cottondataset" / "Main dataset-20230209T170929Z-001" / "Main dataset",
    "Main dataset (002)":     DATASET_ROOT / "cottondataset" / "Main dataset-20230209T191052Z-001" / "Main dataset",
}

# Maize — two versions inside maize-diseases/versions/2/
MAIZE_V10 = DATASET_ROOT / "maize-diseases" / "versions" / "2" / "v1.0"
MAIZE_V11 = DATASET_ROOT / "maize-diseases" / "versions" / "2" / "v1.1"

# Paddy / Rice
PADDY_ROOT = DATASET_ROOT / "paddy-disease-classification"
PADDY_TRAIN = PADDY_ROOT / "train_images"
PADDY_TEST = PADDY_ROOT / "test_images"

# PlantVillage (multi-crop, has train/val split)
PLANTVILLAGE_ROOT = DATASET_ROOT / "PlantVillage" / "PlantVillage"


def is_image(path: Path) -> bool:
    return path.suffix.lower() in IMAGE_EXTENSIONS


def count_images_in_folder(folder: Path) -> int:
    """Count image files recursively."""
    if not folder.exists():
        return 0
    return sum(1 for f in folder.rglob("*") if f.is_file() and is_image(f))


def audit_class_folder(class_folder: Path):
    """
    Return dict with:
      count, extensions, dims, modes, corrupted, duplicates,
      empty_subfolders, nested_dirs, unusual_sizes
    """
    result = {
        "count": 0,
        "extensions": Counter(),
        "dims": [],          # list of (w, h)
        "modes": Counter(),  # RGB / L / etc.
        "corrupted": [],
        "filenames": [],
        "empty_subfolders": [],
        "nested_dirs": [],
        "unusual_sizes": [],
        "detail_rows": [],   # for CSV
    }
    if not class_folder.exists():
        return result

    # Detect nested dirs inside class folder
    for sub in class_folder.iterdir():
        if sub.is_dir():
            result["nested_dirs"].append(str(sub))
            # Check if nested dir is empty
            nested_imgs = [f for f in sub.rglob("*") if f.is_file() and is_image(f)]
            if not nested_imgs:
                result["empty_subfolders"].append(str(sub))

    # Walk all images recursively
    for img_path in class_folder.rglob("*"):
        if not img_path.is_file() or not is_image(img_path):
            continue
        result["count"] += 1
        result["extensions"][img_path.suffix.lower()] += 1
        result["filenames"].append(img_path.name)

        try:
            with Image.open(img_path) as im:
                im.verify()  # verify integrity
            # Re-open after verify (verify closes the file)
            with Image.open(img_path) as im:
                w, h = im.size
                mode = im.mode
                fmt = im.format or "UNKNOWN"
            result["dims"].append((w, h))
            result["modes"][mode] += 1
            result["detail_rows"].append({
                "path": str(img_path),
                "width": w,
                "height": h,
                "format": fmt,
            })
        except Exception as e:
            result["corrupted"].append((str(img_path), str(e)))
            result["detail_rows"].append({
                "path": str(img_path),
                "width": "",
                "height": "",
                "format": "CORRUPTED",
            })

    return result


def detect_unusual_sizes(all_dims):
    """Flag images whose area is > 4x or < 0.25x median area."""
    if not all_dims:
        return []
    areas = [w * h for w, h in all_dims]
    areas_sorted = sorted(areas)
    median_area = areas_sorted[len(areas_sorted) // 2]
    unusual = []
    for (w, h) in all_dims:
        a = w * h
        if median_area > 0 and (a > 4 * median_area or a < 0.25 * median_area):
            unusual.append((w, h, a, median_area))
    return unusual


def find_duplicate_filenames(filenames):
    """Return set of filenames appearing more than once."""
    counts = Counter(filenames)
    return {name for name, c in counts.items() if c > 1}


def summarise_dims(dims):
    """Return a human-readable summary of dimensions."""
    if not dims:
        return "N/A"
    widths = [w for w, h in dims]
    heights = [h for w, h in dims]
    min_w, max_w = min(widths), max(widths)
    min_h, max_h = min(heights), max(heights)
    if min_w == max_w and min_h == max_h:
        return f"{min_w}×{min_h} (uniform)"
    return f"{min_w}–{max_w} × {min_h}–{max_h}"


# ===========================================================================
# MAIN AUDIT
# ===========================================================================
def main():
    all_detail_rows = []   # for dataset_details.csv
    all_summary_rows = []  # for dataset_summary.csv
    report_lines = []

    def log(s=""):
        report_lines.append(s)
        print(s)

    # -----------------------------------------------------------------------
    # 1. COTTON — primary dataset  (Cotton leaves / 40 Images)
    # -----------------------------------------------------------------------
    log("=" * 70)
    log("COTTON  (primary: cottondataset/Cotton leaves/40 Images)")
    log(f"Path: {COTTON_MAIN}")
    log("=" * 70)

    cotton_all_filenames = []
    cotton_all_dims = []
    cotton_total = 0
    cotton_class_data = {}

    if COTTON_MAIN.exists():
        for class_dir in sorted(COTTON_MAIN.iterdir()):
            if not class_dir.is_dir():
                continue
            audit = audit_class_folder(class_dir)
            cotton_class_data[class_dir.name] = audit
            cotton_total += audit["count"]
            cotton_all_filenames.extend(audit["filenames"])
            cotton_all_dims.extend(audit["dims"])
            for row in audit["detail_rows"]:
                all_detail_rows.append({"crop": "Cotton", "class": class_dir.name, **row})

        log()
        log("| Class | Images |")
        log("| ----- | -----: |")
        for cls in sorted(cotton_class_data):
            cnt = cotton_class_data[cls]["count"]
            all_summary_rows.append({"crop": "Cotton", "class": cls, "image_count": cnt})
            log(f"| {cls} | {cnt} |")
        all_summary_rows.append({"crop": "Cotton", "class": "TOTAL", "image_count": cotton_total})
        log(f"| **TOTAL** | **{cotton_total}** |")

        # Extensions
        ext_counter = Counter()
        for a in cotton_class_data.values():
            ext_counter.update(a["extensions"])
        log(f"\nExtensions: {dict(ext_counter)}")
        log(f"Dimensions: {summarise_dims(cotton_all_dims)}")

        # Modes
        mode_counter = Counter()
        for a in cotton_class_data.values():
            mode_counter.update(a["modes"])
        log(f"Color modes: {dict(mode_counter)}")

        # Duplicates
        dups = find_duplicate_filenames(cotton_all_filenames)
        if dups:
            log(f"Duplicate filenames across classes: {len(dups)}  (e.g. {list(dups)[:5]})")

        # Corrupted
        corrupted = []
        for a in cotton_class_data.values():
            corrupted.extend(a["corrupted"])
        if corrupted:
            log(f"Corrupted images: {len(corrupted)}")
            for p, e in corrupted[:5]:
                log(f"  - {p}: {e}")

        # Nested dirs
        nested = []
        for a in cotton_class_data.values():
            nested.extend(a["nested_dirs"])
        if nested:
            log(f"Nested directories inside class folders: {len(nested)}")

        # Empty
        empty = []
        for a in cotton_class_data.values():
            empty.extend(a["empty_subfolders"])
        if empty:
            log(f"Empty sub-folders: {empty}")

        # Unusual sizes
        unusual = detect_unusual_sizes(cotton_all_dims)
        if unusual:
            log(f"Unusual image sizes (vs median): {len(unusual)} images")

        # Train/val/test split?
        has_split = any(
            d.name.lower() in {"train", "val", "validation", "test"}
            for d in COTTON_MAIN.iterdir() if d.is_dir()
        )
        log(f"Has train/val/test split: {has_split}")
    else:
        log("  *** COTTON_MAIN path not found! ***")

    # -----------------------------------------------------------------------
    # 1b. Cotton variant folders (report separately for transparency)
    # -----------------------------------------------------------------------
    log("\n--- Cotton variant / processed folders ---")
    for label, vpath in COTTON_VARIANTS.items():
        if not vpath.exists():
            log(f"  {label}: PATH NOT FOUND ({vpath})")
            continue
        classes = sorted([d.name for d in vpath.iterdir() if d.is_dir()])
        total = sum(count_images_in_folder(vpath / c) for c in classes)
        log(f"  {label}: {total} images across {len(classes)} classes ({', '.join(classes)})")

    # -----------------------------------------------------------------------
    # 2. MAIZE
    # -----------------------------------------------------------------------
    log("\n" + "=" * 70)
    log("MAIZE")
    log("=" * 70)

    for version_label, maize_path in [("v1.0", MAIZE_V10), ("v1.1", MAIZE_V11)]:
        log(f"\n--- Maize {version_label} ---")
        log(f"Path: {maize_path}")
        if not maize_path.exists():
            log("  *** PATH NOT FOUND ***")
            continue

        maize_all_filenames = []
        maize_all_dims = []
        maize_total = 0
        maize_class_data = {}

        for class_dir in sorted(maize_path.iterdir()):
            if not class_dir.is_dir():
                continue
            audit = audit_class_folder(class_dir)
            maize_class_data[class_dir.name] = audit
            maize_total += audit["count"]
            maize_all_filenames.extend(audit["filenames"])
            maize_all_dims.extend(audit["dims"])
            for row in audit["detail_rows"]:
                all_detail_rows.append({"crop": f"Maize ({version_label})", "class": class_dir.name, **row})

        log()
        log("| Class | Images |")
        log("| ----- | -----: |")
        for cls in sorted(maize_class_data):
            cnt = maize_class_data[cls]["count"]
            all_summary_rows.append({"crop": f"Maize ({version_label})", "class": cls, "image_count": cnt})
            log(f"| {cls} | {cnt} |")
        all_summary_rows.append({"crop": f"Maize ({version_label})", "class": "TOTAL", "image_count": maize_total})
        log(f"| **TOTAL** | **{maize_total}** |")

        ext_counter = Counter()
        for a in maize_class_data.values():
            ext_counter.update(a["extensions"])
        log(f"\nExtensions: {dict(ext_counter)}")
        log(f"Dimensions: {summarise_dims(maize_all_dims)}")

        mode_counter = Counter()
        for a in maize_class_data.values():
            mode_counter.update(a["modes"])
        log(f"Color modes: {dict(mode_counter)}")

        dups = find_duplicate_filenames(maize_all_filenames)
        if dups:
            log(f"Duplicate filenames across classes: {len(dups)}  (e.g. {list(dups)[:5]})")

        corrupted = []
        for a in maize_class_data.values():
            corrupted.extend(a["corrupted"])
        if corrupted:
            log(f"Corrupted images: {len(corrupted)}")
            for p, e in corrupted[:5]:
                log(f"  - {p}: {e}")

        nested = []
        for a in maize_class_data.values():
            nested.extend(a["nested_dirs"])
        if nested:
            log(f"Nested directories inside class folders: {len(nested)}")

        unusual = detect_unusual_sizes(maize_all_dims)
        if unusual:
            log(f"Unusual image sizes (vs median): {len(unusual)} images")

        has_split = any(
            d.name.lower() in {"train", "val", "validation", "test"}
            for d in maize_path.iterdir() if d.is_dir()
        )
        log(f"Has train/val/test split: {has_split}")

    # -----------------------------------------------------------------------
    # 3. RICE / PADDY
    # -----------------------------------------------------------------------
    log("\n" + "=" * 70)
    log("RICE / PADDY  (paddy-disease-classification)")
    log(f"Path: {PADDY_ROOT}")
    log("=" * 70)

    # Train images (class-labelled subfolders)
    log("\n--- train_images ---")
    if PADDY_TRAIN.exists():
        paddy_all_filenames = []
        paddy_all_dims = []
        paddy_total = 0
        paddy_class_data = {}

        for class_dir in sorted(PADDY_TRAIN.iterdir()):
            if not class_dir.is_dir():
                continue
            audit = audit_class_folder(class_dir)
            paddy_class_data[class_dir.name] = audit
            paddy_total += audit["count"]
            paddy_all_filenames.extend(audit["filenames"])
            paddy_all_dims.extend(audit["dims"])
            for row in audit["detail_rows"]:
                all_detail_rows.append({"crop": "Rice/Paddy", "class": class_dir.name, **row})

        log()
        log("| Class | Images |")
        log("| ----- | -----: |")
        for cls in sorted(paddy_class_data):
            cnt = paddy_class_data[cls]["count"]
            all_summary_rows.append({"crop": "Rice/Paddy", "class": cls, "image_count": cnt})
            log(f"| {cls} | {cnt} |")
        all_summary_rows.append({"crop": "Rice/Paddy", "class": "TOTAL", "image_count": paddy_total})
        log(f"| **TOTAL** | **{paddy_total}** |")

        ext_counter = Counter()
        for a in paddy_class_data.values():
            ext_counter.update(a["extensions"])
        log(f"\nExtensions: {dict(ext_counter)}")
        log(f"Dimensions: {summarise_dims(paddy_all_dims)}")

        mode_counter = Counter()
        for a in paddy_class_data.values():
            mode_counter.update(a["modes"])
        log(f"Color modes: {dict(mode_counter)}")

        dups = find_duplicate_filenames(paddy_all_filenames)
        if dups:
            log(f"Duplicate filenames across classes: {len(dups)}  (e.g. {list(dups)[:5]})")

        corrupted = []
        for a in paddy_class_data.values():
            corrupted.extend(a["corrupted"])
        if corrupted:
            log(f"Corrupted images: {len(corrupted)}")
            for p, e in corrupted[:5]:
                log(f"  - {p}: {e}")

        nested = []
        for a in paddy_class_data.values():
            nested.extend(a["nested_dirs"])
        if nested:
            log(f"Nested directories inside class folders: {len(nested)}")

        unusual = detect_unusual_sizes(paddy_all_dims)
        if unusual:
            log(f"Unusual image sizes (vs median): {len(unusual)} images")

        log(f"Has train/val/test split: True (train_images + test_images present)")
    else:
        log("  *** PADDY_TRAIN path not found! ***")

    # Test images (unlabelled, flat folder — Kaggle competition style)
    test_count = count_images_in_folder(PADDY_TEST) if PADDY_TEST.exists() else 0
    log(f"\n--- test_images (unlabelled): {test_count} images ---")

    # Check for train.csv / sample_submission.csv
    for csv_name in ["train.csv", "sample_submission.csv"]:
        csv_path = PADDY_ROOT / csv_name
        if csv_path.exists():
            log(f"  Found: {csv_name} ({csv_path.stat().st_size:,} bytes)")

    # -----------------------------------------------------------------------
    # 4. PlantVillage (bonus — not one of the 3 primary crops, but present)
    # -----------------------------------------------------------------------
    log("\n" + "=" * 70)
    log("PlantVillage  (multi-crop, FYI only)")
    log(f"Path: {PLANTVILLAGE_ROOT}")
    log("=" * 70)
    if PLANTVILLAGE_ROOT.exists():
        for split in ["train", "val"]:
            split_path = PLANTVILLAGE_ROOT / split
            if split_path.exists():
                classes = sorted([d.name for d in split_path.iterdir() if d.is_dir()])
                total = sum(count_images_in_folder(split_path / c) for c in classes)
                log(f"  {split}: {total} images across {len(classes)} classes")
                # List maize-relevant classes
                maize_classes = [c for c in classes if "corn" in c.lower() or "maize" in c.lower()]
                if maize_classes:
                    log(f"    Maize-related: {maize_classes}")
    else:
        log("  PlantVillage path not found.")

    # -----------------------------------------------------------------------
    # Write CSVs
    # -----------------------------------------------------------------------
    details_path = OUTPUT_DIR / "dataset_details.csv"
    with open(details_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["crop", "class", "image_path", "width", "height", "format"])
        writer.writeheader()
        for row in all_detail_rows:
            writer.writerow({
                "crop": row["crop"],
                "class": row["class"],
                "image_path": row["path"],
                "width": row["width"],
                "height": row["height"],
                "format": row["format"],
            })
    log(f"\n[OK] Saved: {details_path}")

    summary_path = OUTPUT_DIR / "dataset_summary.csv"
    with open(summary_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["crop", "class", "image_count"])
        writer.writeheader()
        for row in all_summary_rows:
            writer.writerow(row)
    log(f"[OK] Saved: {summary_path}")

    # Save full report as text too
    report_path = OUTPUT_DIR / "audit_report.txt"
    with open(report_path, "w", encoding="utf-8") as f:
        f.write("\n".join(report_lines))
    log(f"[OK] Saved: {report_path}")

    log("\nDone.")


if __name__ == "__main__":
    main()
