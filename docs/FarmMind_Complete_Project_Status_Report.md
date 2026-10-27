# FarmMind AI — Complete Project Status Report

**Project Title:** FarmMind AI (formerly AgriScan / CropPilot)  
**Document Type:** Comprehensive Progress & Status Audit  
**Date:** October 2026  
**Primary Target Crops:** Cotton, Maize, Rice (20 Disease/Healthy Classes)

---

## 1. Executive Summary

FarmMind AI is an **offline-first, continuous crop-health intelligence and disease detection system** designed to assist farmers across the entire crop lifecycle — from sowing to harvest. 

Unlike traditional single-shot disease scanners that only identify a leaf condition and stop, FarmMind AI is architected around a continuous closed loop:
$$\text{Scan} \longrightarrow \text{Detect} \longrightarrow \text{Prescribe} \longrightarrow \text{Track Recovery} \longrightarrow \text{Update Crop Health State}$$

---

## 2. Progress Completed

### A. System Architecture, Research & Specifications
- **Comprehensive Blueprints & System Design**: Fully defined architecture documentation including modular workflows, ER schemas, and data flow pipelines:
  - System Blueprint: [`AgriScan_Complete_Blueprint.md`](file:///c:/Documents/EDI%20PROJECT/Reports%20and%20files/AgriScan_Complete_Blueprint.md)
  - Flow Diagrams & Architecture: [`CropPilot_Architecture.md`](file:///c:/Documents/EDI%20PROJECT/Reports%20and%20files/CropPilot_Architecture.md) and [`AgriScan_System_Walkthrough.md`](file:///c:/Documents/EDI%20PROJECT/Reports%20and%20files/AgriScan_System_Walkthrough.md)
- **Literature Review & Agronomic Validation**: Benchmarked against agricultural publications and standard ICAR protocols.
- **Scope & Class Definition**: Finalized 3 MVP crops covering 20 distinct disease and healthy states.

---

### B. Datasets Acquisition, Audit & Train/Val/Test Splits
- **Multi-Source Ingestion**: Acquired and verified open-licensed datasets (PlantVillage, Kaggle Cotton, Paddy Doctor) totaling 14,000+ raw samples.
- **Audit & Standardization Pipeline**:
  - Automated directory walking, image integrity checks, corrupted file pruning, and standard class naming via [`build_farmmind_dataset.py`](file:///c:/Documents/EDI%20PROJECT/DATASETS/dataset_audit/build_farmmind_dataset.py) and [`inspect_farmmind_dataset.py`](file:///c:/Documents/EDI%20PROJECT/DATASETS/dataset_audit/inspect_farmmind_dataset.py).
- **Master Dataset Split (70% Train / 15% Validation / 15% Test)**:
  - Structured master split generated under [`DATASETS/FarmMind_Split`](file:///c:/Documents/EDI%20PROJECT/DATASETS/FarmMind_Split).
  - Total Images: **14,496 images**
    - **Training:** 10,138 images
    - **Validation:** 2,176 images
    - **Test:** 2,182 images
  - Full per-image audit trail recorded in [`split_manifest.csv`](file:///c:/Documents/EDI%20PROJECT/DATASETS/FarmMind_Split/split_manifest.csv) and breakdown in [`split_summary.csv`](file:///c:/Documents/EDI%20PROJECT/DATASETS/FarmMind_Split/split_summary.csv).

#### Class Distribution Summary:
| Crop | Class Name | Total Images | Train | Val | Test |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Cotton** | Aphids | 39 | 27 | 6 | 6 |
| **Cotton** | Army worm | 40 | 28 | 6 | 6 |
| **Cotton** | Bacterial Blight | 40 | 28 | 6 | 6 |
| **Cotton** | Healthy | 39 | 27 | 6 | 6 |
| **Cotton** | Powdery Mildew | 38 | 27 | 6 | 5 |
| **Cotton** | Target spot | 41 | 29 | 6 | 6 |
| **Maize** | Common Rust | 1,192 | 834 | 179 | 179 |
| **Maize** | Gray Leaf Spot | 513 | 359 | 77 | 77 |
| **Maize** | Healthy | 1,162 | 813 | 174 | 175 |
| **Maize** | Northern Leaf Blight | 985 | 690 | 148 | 147 |
| **Rice** | Bacterial Leaf Blight | 479 | 335 | 72 | 72 |
| **Rice** | Bacterial Leaf Streak | 380 | 266 | 57 | 57 |
| **Rice** | Bacterial Panicle Blight | 337 | 236 | 51 | 50 |
| **Rice** | Blast | 1,738 | 1,217 | 261 | 260 |
| **Rice** | Brown Spot | 965 | 676 | 145 | 144 |
| **Rice** | Dead Heart | 1,442 | 1,009 | 216 | 217 |
| **Rice** | Downy Mildew | 620 | 434 | 93 | 93 |
| **Rice** | Hispa | 1,594 | 1,116 | 239 | 239 |
| **Rice** | Normal (Healthy) | 1,764 | 1,235 | 265 | 264 |
| **Rice** | Tungro | 1,088 | 762 | 163 | 163 |
| **TOTAL** | **20 Classes** | **14,496** | **10,138** | **2,176** | **2,182** |

---

### C. ML Data Pipeline & Augmentation
- Implemented [`preprocess_farmmind.py`](file:///c:/Documents/EDI%20PROJECT/DATASETS/FarmMind_Split/preprocess_farmmind.py) with:
  - Optimized streaming via `tf.data.Dataset` API with prefetching and multithreaded decoding.
  - Balanced class weighting calculation via Scikit-Learn to counteract dataset imbalances (e.g., smaller cotton sample size vs. larger rice dataset).
  - Domain-targeted training augmentations: random horizontal flip, rotation ($\pm 10\%$), zoom ($\pm 10\%$), translation, contrast, and brightness adjustments.
  - MobileNetV3 input tensor normalization ($224 \times 224$ RGB, $[-1, 1]$ scaled).

---

### D. Web Application (React + Vite)
- Fully implemented modern responsive web client located at [`FarmMind/farmmind`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind):
  - **Framework**: React 19, Vite, Tailwind CSS, Lucide React, Recharts.
  - **Active Dev Server**: Tested and operational at `http://localhost:5173/`.
  - **Key Modules Implemented**:
    1. **Landing & Onboarding**: Farmer setup, crop selection, language preference.
    2. **Dashboard**: Composite health score, task reminders, weather card.
    3. **Disease Detection Interface**: Drag & drop / camera image picker with real-time UI states.
    4. **Prescription Page**: Chemical vs. organic remedies, dosage calculators, precaution instructions.
    5. **My Crop & Growth Timeline**: Growth tracking from sowing to maturity.
    6. **Bio-Khaat Center**: Organic formulation guides (Jeevamrit, Neemastra, Dashparni ark).
    7. **Crop Varieties**: Recommended high-yield seed varieties by maturity and resistance.
    8. **Market Mandi Rates**: Commodity market trends and pricing indicators.
    9. **Weather Forecast**: 7-day outlook, rain probability, spray feasibility window.
    10. **Expert Advisory**: Agricultural extension officer directory and helpline info.

---

### E. Android Native Hybrid Wrapper
- Created Android Kotlin project in [`FarmMind/app`](file:///c:/Documents/EDI%20PROJECT/FarmMind/app):
  - Implemented [`MainActivity.kt`](file:///c:/Documents/EDI%20PROJECT/FarmMind/app/src/main/java/com/example/sih_01/MainActivity.kt) using AndroidX `WebViewAssetLoader`.
  - Configured offline asset streaming directly from packaged Android assets without needing external web hosting.

---

## 3. Progress Remaining

| Milestone | Component | Priority | Status / Blocker | Description |
| :--- | :--- | :---: | :---: | :--- |
| **1. Model Training** | MobileNetV3 Training Execution | **High** | Pending | The training script (`train_model.py`) has not yet been executed. Model weights (`.keras` / `.h5`) are not yet saved. |
| **2. Model Evaluation** | Evaluation Metrics & Confusion Matrix | **High** | Pending | Computing test set accuracy, per-class F1-scores, precision, recall, and field image reliability. |
| **3. Model Quantization** | TensorFlow Lite Conversion | **High** | Pending | Converting trained model into an 8-bit quantized `.tflite` model (< 15 MB) for mobile edge inference. |
| **4. Real AI Hookup** | Real Inference in UI | **High** | Mocked | Currently, [`DiseaseDetection.jsx`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/DiseaseDetection.jsx) uses simulated mock output (`setTimeout`). Needs connection to actual model via API or on-device runtime. |
| **5. Severity Estimation** | Leaf Area Affected Analysis | **Medium** | Mocked | Implement OpenCV or segmentation-based leaf damage quantification to compute true severity % instead of static numbers. |
| **6. Backend Server** | REST API Service (FastAPI) | **Medium** | Pending | A lightweight backend service for running inference, managing user sync, and serving dynamic recommendations. |
| **7. Offline Database** | SQLite / Room Database | **Medium** | Pending | Local database integration for persistent storage of scan history, crop registrations, and action logs on the client. |
| **8. Live External APIs** | Weather & Mandi Real Data | **Low** | Mocked | Integrate real live endpoints (e.g. OpenWeatherMap API and Agmarknet Mandi API) to replace hardcoded values. |
| **9. Voice Support** | Multilingual Audio Assistant | **Low** | Pending | Integrate Web Speech API / TTS for Hindi, Marathi, and English voice assistance. |
| **10. APK Generation** | Android Production Build | **Medium** | Pending | Build and validate standalone release APK from Gradle project on physical Android hardware. |

---

## 4. Priority Action Items (Next Steps)

```
[Phase 1: ML Model]
  1. Create and execute train_mobilenetv3.py on FarmMind_Split
  2. Save best weights and export class_indices.json
  3. Convert model to model_quantized.tflite

[Phase 2: Inference Integration]
  4. Build a lightweight FastAPI inference server (app.py) or browser TF.js runtime
  5. Connect DiseaseDetection.jsx to POST /predict
  6. Display real disease predictions, confidence score, and associated remedies

[Phase 3: Native Packaging]
  7. Copy Vite production build (dist/) into Android app assets
  8. Compile and test standalone offline Android APK
```
