# FarmMind AI — Model Benchmarking & Comparison Suite

This isolated module implements comparative model evaluation for **FarmMind AI** across **Online (Cloud / FP32)** and **Offline (Edge / TFLite INT8)** modes.

> **Note:** This benchmarking module is completely separated from the primary farmer web application.

---

## 1. Directory Structure

```
FarmMind/model_benchmarks/
├── data_loader.py            # 20-class data pipeline with class weighting (Cotton, Maize, Rice)
├── models.py                 # Model factory: MobileNetV3 (Large/Small), ResNet-50, EfficientNet-B0, Custom CNN
├── benchmark_runner.py       # Full training, quantization & latency profiling engine
├── benchmark_results.json    # Exported comparative metrics
├── README.md                 # Execution guide & CLI instructions
├── saved_models/             # Generated .keras and .tflite model weights
│
└── dashboard/                # SEPARATE STANDALONE EVALUATION DASHBOARD
    ├── index.html            # Standalone visual dashboard with interactive charts & metrics
    └── serve_dashboard.py    # One-click launcher to open dashboard in browser
```

---

## 2. Models Benchmarked

1. **MobileNetV3 (Large & Small)** — *FarmMind Core Edge Architecture*
2. **ResNet-50** — *High-capacity deep residual comparative baseline*
3. **EfficientNet-B0** — *Compound-scaled benchmark*
4. **Custom CNN** — *Non-pretrained convolutional baseline*

---

## 3. How to Open the Separate Benchmark Dashboard

You have two simple ways to view the separate dashboard:

### Option A: Via Python Launcher
Run this command from your terminal:
```powershell
python "c:\Documents\EDI PROJECT\FarmMind\model_benchmarks\dashboard\serve_dashboard.py"
```
It will automatically launch a local server and open `http://localhost:8080/` in your browser.

### Option B: Direct File Open
Simply double-click or open in your browser:
```
c:\Documents\EDI PROJECT\FarmMind\model_benchmarks\dashboard\index.html
```

---

## 4. How to Run the Training / Benchmarking Pipeline

To run the benchmarking execution script across all 5 models:
```powershell
python "c:\Documents\EDI PROJECT\FarmMind\model_benchmarks\benchmark_runner.py"
```

The script will:
1. Load dataset samples from `DATASETS/FarmMind_Split` across all 20 classes.
2. Train and evaluate models in **Online FP32 mode** (calculating test accuracy, macro F1, and server latency).
3. Convert models to **Offline TFLite INT8 / FP16** (calculating quantized edge size, mobile latency, and accuracy delta).
4. Save the results to `benchmark_results.json`.
