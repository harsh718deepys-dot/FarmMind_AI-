# FarmMind AI — Offline-First Crop Health Intelligence & Edge Disease Detection System

[![React](https://img.shields.io/badge/Frontend-React%2019%20%7C%20Vite-61DAFB?logo=react&logoColor=black)](https://github.com/harsh718deepys-dot/FarmMind_AI-)
[![Android](https://img.shields.io/badge/Mobile-Android%20Kotlin-3DDC84?logo=android&logoColor=white)](https://github.com/harsh718deepys-dot/FarmMind_AI-)
[![TensorFlow](https://img.shields.io/badge/ML-TensorFlow%20%7C%20TFLite-FF6F00?logo=tensorflow&logoColor=white)](https://github.com/harsh718deepys-dot/FarmMind_AI-)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**FarmMind AI** is an offline-first, continuous crop-health intelligence and disease detection system engineered to bridge the critical technological divide faced by smallholder farmers in rural India.

Unlike traditional single-shot disease scanners that require persistent 4G/5G cloud connectivity, FarmMind AI is built on a **dual-mode architecture (Cloud FP32 / Edge INT8 TFLite)** that executes sub-30 millisecond inference directly on low-cost Android smartphones without internet access.

```
Scan Leaf  ──>  Detect Pathogen  ──>  Dual Prescription (Chemical + Bio-Khaat)  ──>  Track Recovery  ──>  Update Lifecycle Stage
```

---

## 🌾 Target Crops & Disease Coverage (20 Classes)

FarmMind AI specializes intensely in India's top 3 staple and cash crops:

* **Cotton (6 Classes):** Aphids, Army worm, Bacterial Blight, Healthy, Powdery Mildew, Target spot
* **Maize (4 Classes):** Common Rust, Gray Leaf Spot, Healthy, Northern Leaf Blight
* **Rice / Paddy (10 Classes):** Bacterial Leaf Blight, Bacterial Leaf Streak, Bacterial Panicle Blight, Blast, Brown Spot, Dead Heart, Downy Mildew, Hispa, Normal (Healthy), Tungro

---

## ⚡ Key Architectural Features

1. **Edge-Native Offline Inference:** 4.3 MB quantized INT8 MobileNetV3 model with 25.1 ms latency on mobile CPUs and only 38 MB RAM footprint.
2. **Dual-Stream Remediation:** Every diagnosis provides both scientific agrochemical treatments and traditional **Bio-Khaat** organic preparation recipes (*Neemastra*, *Agniastra*, *Jeevamrit*, *Dashparni Ark*).
3. **Continuous 10-Day Recovery Tracker:** Multi-day healing checklists and follow-up scan comparisons.
4. **Smart Spray Feasibility Index:** Meteorological advisory to alert farmers against spraying when rain or high wind is forecast.
5. **MyCrop Lifecycle Tracker:** Tracks crop stages from Sowing $\rightarrow$ Vegetative $\rightarrow$ Flowering $\rightarrow$ Harvest.
6. **APMC Mandi Price Intelligence:** Daily market commodity prices across state market yards.

---

## 📊 Model Benchmark Evaluation (Empirical Results)

Our benchmarking engine evaluated 5 deep learning architectures across Cloud (FP32) and Edge (INT8) modes:

| Model Architecture | Parameters | Online FP32 Acc | Online Latency | Offline INT8 Acc | Offline Mobile Latency | Offline Edge Size |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **MobileNetV3 Large (Core)** | **4.22 M** | **94.8%** | **18.4 ms** | **94.2%** | **25.1 ms** | **4.3 MB (Best Balance)** |
| **MobileNetV3 Small** | 1.53 M | 91.9% | 9.8 ms | 91.3% | 13.5 ms | 1.7 MB (<2MB footprint) |
| **ResNet-50** | 23.58 M | 96.1% | 42.6 ms | 95.2% | 138.4 ms | 24.2 MB (5.5x slower) |
| **EfficientNet-B0** | 4.05 M | 95.3% | 26.2 ms | 94.6% | 44.8 ms | 5.4 MB |
| **Custom CNN (Scratch)** | 0.89 M | 77.2% | 7.5 ms | 75.8% | 10.2 ms | 0.9 MB (Poor generalization) |

---

## 📁 Repository Structure

```
FarmMind/
├── farmmind/                  # React 19 / Vite Web Frontend (14 fully styled screens)
│   ├── src/pages/             # UI screens (DiseaseDetection, Prescription, BioKhaat, etc.)
│   ├── src/components/        # Layout, Navbar, BottomNav, ChatbotFAB, SOSButton
│   └── package.json           # Dependencies: Tailwind CSS, Lucide React, Recharts
│
├── app/                       # Native Android Application (Kotlin)
│   ├── src/main/java/         # MainActivity with offline WebViewAssetLoader
│   ├── src/main/assets/       # Bundled offline web distribution
│   └── build.gradle.kts       # Android build configuration
│
├── model_benchmarks/          # Model Benchmarking & Comparison Suite
│   ├── models.py              # Model factory (MobileNetV3, ResNet, EfficientNet, Custom CNN)
│   ├── data_loader.py         # 20-class streaming pipeline with class weighting
│   ├── benchmark_runner.py    # Training, INT8 quantization & latency profiling
│   ├── benchmark_results.json # Empirical metrics database
│   └── dashboard/             # Standalone interactive evaluation dashboard (HTML/JS)
│
├── dataset_tools/             # Data preprocessing, audit & splitting utilities
│   ├── split_dataset.py       # Perceptual hash deduplication & 70/15/15 splitting
│   ├── preprocess_farmmind.py # TensorFlow streaming pipeline with class weighting
│   └── split_manifest.csv     # 14,496-image dataset catalog
│
└── docs/                      # Formal Project Documentation & Reports
    ├── FarmMind_Comprehensive_Project_Report.md   # Complete project documentation
    ├── FarmMind_Comprehensive_Project_Report.docx # Formatted Word report
    └── AgriScan_Complete_Blueprint.md             # System architecture blueprint
```

---

## 🚀 Quick Start Guide

### 1. Web Frontend (React + Vite)
```bash
cd farmmind
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Standalone Model Benchmark Dashboard
```bash
python model_benchmarks/dashboard/serve_dashboard.py
```
Open [http://localhost:8080](http://localhost:8080) to view interactive comparison charts.

### 3. Android Application
1. Open the `FarmMind/` directory in **Android Studio**.
2. Sync Gradle dependencies.
3. Run on an Android device or emulator (Android 8.0+ / API 26+).

---

## 👥 Authors & Academic Context
* **Project Track:** Engineering Design & Innovation (EDI) / Capstone Project
* **Repository:** [https://github.com/harsh718deepys-dot/FarmMind_AI-](https://github.com/harsh718deepys-dot/FarmMind_AI-)
