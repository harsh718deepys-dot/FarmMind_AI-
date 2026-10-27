# FarmMind AI — Feature Audit, Evidence & Confidence Report

**Document Type:** Formal Technical Audit & Ground Truth Verification  
**Audit Date:** October 2026  
**Audit Scope:** Full codebase audit covering React frontend (`FarmMind/farmmind`), Android/Kotlin wrapper (`FarmMind/app`), data & preprocessing pipelines (`DATASETS`), reports & architectural blueprints (`Reports and files`).

---

## 1. Feature Audit Summary Table

| # | Feature | Status | Real / Mock / Planned | Evidence Confidence | Evidence |
|---|---|---|---|---|---|
| 1 | Crop Disease Detection | MOCKED / UI ONLY | MOCK | HIGH | [`DiseaseDetection.jsx:L11-25`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/DiseaseDetection.jsx#L11-L25): `handleUpload` triggers hardcoded 2.5s `setTimeout` returning static Tomato Early Blight mock object. No model weights exist. |
| 2 | Remedy Recommendation | MOCKED / UI ONLY | MOCK | HIGH | [`DiseaseDetection.jsx:L125-166`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/DiseaseDetection.jsx#L125-L166), [`Prescription.jsx:L40-100`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/Prescription.jsx#L40-L100): Pure static JSX text for Tomato Early Blight. No rule engine, database, or API lookup. |
| 3 | Pesticide Recommendation | MOCKED / UI ONLY | MOCK | HIGH | [`Prescription.jsx:L44-66`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/Prescription.jsx#L44-L66): Hardcoded text card for "Chlorothalonil 75% WP" (2 gm/L). Disconnected from dynamic detection. |
| 4 | Organic Alternative | MOCKED / UI ONLY | MOCK | HIGH | [`Prescription.jsx:L69-84`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/Prescription.jsx#L69-L84), [`BioKhaat.jsx:L48-100`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/BioKhaat.jsx#L48-L100): Static text for "Trichoderma viride" and unhandled select menus for Vermicompost. |
| 5 | Crop Growth Tracking | MOCKED / UI ONLY | MOCK | HIGH | [`MyCrop.jsx:L5-15`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/MyCrop.jsx#L5-L15), [`Tasks.jsx:L5-28`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/Tasks.jsx#L5-L28), [`History.jsx:L6-19`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/History.jsx#L6-L19): Static hardcoded lifecycle array, unhandled observation buttons, static task lists, and no persistence. |
| 6 | Marketplace | NOT IMPLEMENTED | NONE | HIGH | [`Market.jsx:L1-111`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/Market.jsx#L1-L111): Only displays mock mandi prices (Pune APMC). Zero e-commerce, catalog, cart, ordering, or checkout code exists. |
| 7 | Expert Consultation | MOCKED / UI ONLY | MOCK | HIGH | [`Experts.jsx:L8-53,L150`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/Experts.jsx#L8-L53): 4 hardcoded dummy experts; booking modal `onSubmit` executes `e.preventDefault(); setShowModal(false)`. No call, chat, or WebRTC. |
| 8 | Flash SMS / Weather Alerts | MOCKED / UI ONLY | MOCK | HIGH | [`Weather.jsx:L6-13,L109-133`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/Weather.jsx#L6-L13): Hardcoded weather stats (28°C Pune) and static warning text. Zero weather APIs, SMS providers, or push notification logic. |
| 9 | Farmer Community | PLANNED / DOCUMENTED ONLY | PLANNED | HIGH | Documented in [`AgriScan_Complete_Blueprint.md`](file:///c:/Documents/EDI%20PROJECT/Reports%20and%20files/AgriScan_Complete_Blueprint.md). Zero community components, routes, feeds, or chat exist anywhere in code. |
| 10 | Offline AI | PLANNED / DOCUMENTED ONLY | PLANNED | HIGH | Blueprint documents TFLite edge AI. In reality, no `.tflite` model exists, no TFLite libraries in Gradle or npm, and Android wrapper is a basic WebView. |

---

## 2. Detailed Feature Audit & Verification

### Feature 1: Crop Disease Detection

**Status:** MOCKED / UI ONLY  
**Real / Mock / Planned:** MOCK  
**Evidence Confidence:** HIGH  

**What currently exists:**
- UI upload screen and scanning animation: [`DiseaseDetection.jsx`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/DiseaseDetection.jsx)
- Input dataset preparation and data augmentation pipeline: [`preprocess_farmmind.py`](file:///c:/Documents/EDI%20PROJECT/DATASETS/FarmMind_Split/preprocess_farmmind.py)
- Curated image train/val/test splits for Cotton, Maize, and Rice (14,496 images): [`FarmMind_Split`](file:///c:/Documents/EDI%20PROJECT/DATASETS/FarmMind_Split)

**What is missing:**
- Model training script execution; no trained model weights exist anywhere in the repository.
- Model inference engine (TensorFlow, TFLite, ONNX, or TF.js).
- File handler in the UI; clicking "Upload from Gallery" or "Take Photo" does not read an image file from the device.
- Connection between the UI and any prediction code; the UI executes an in-memory `setTimeout` timer.
- Target crop coverage in the UI: while Cotton, Maize, and Rice datasets exist, the mock UI hardcodes "Tomato Early Blight".

**Evidence:**
- [`DiseaseDetection.jsx:L11-25`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/DiseaseDetection.jsx#L11-L25):
  ```javascript
  const handleUpload = () => {
    setScanning(true);
    // Simulate AI scanning delay
    setTimeout(() => {
      setScanning(false);
      setResult({
        crop: 'Tomato',
        disease: 'Early Blight',
        confidence: '94%',
        severity: 'Moderate',
        affected: '18%',
        cause: 'Fungal infection caused by Alternaria solani.',
      });
    }, 2500);
  };
  ```
- File search across the entire project returns zero model weight files (`.tflite`, `.keras`, `.h5`, `.onnx`, `.pt`, `.pth`).

**Confidence justification:**
HIGH — The code was directly inspected. The upload handler explicitly runs a mock `setTimeout` returning hardcoded data without calling any model or backend.

**AI/Model Metrics:**
- **Model present:** NO
- **Model format:** UNKNOWN / None
- **Model path:** UNKNOWN / None
- **Inference code present:** NO
- **Inference actually connected to UI:** NO
- **Offline capable:** NO
- **Mock inference present:** YES
- **Evidence Confidence:** HIGH

---

### Feature 2: Disease Remedy Recommendation

**Status:** MOCKED / UI ONLY  
**Real / Mock / Planned:** MOCK  
**Evidence Confidence:** HIGH  

**What currently exists:**
- Disease detection result tabs ("Immediate Treatment", "Recovery Plan", "Prevention"): [`DiseaseDetection.jsx:L113-166`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/DiseaseDetection.jsx#L113-L166)
- AI Crop Prescription page layout: [`Prescription.jsx:L1-123`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/Prescription.jsx#L1-L123)

**What is missing:**
- Rule-based or database-backed recommendation engine.
- Connection between the detected disease and the generated prescription (navigating from DiseaseDetection to Prescription does not pass state or parameters).
- Dynamic agronomic knowledge base (SQLite/PostgreSQL/JSON lookup table).
- Dynamic recovery schedule computation based on severity or crop stage.

**Evidence:**
- [`Prescription.jsx:L30-37`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/Prescription.jsx#L30-L37):
  ```jsx
  <h2 className="text-xl font-bold">Tomato • Early Blight</h2>
  <span className="text-krishi-green-light text-sm font-medium">Severity: Moderate</span>
  ...
  <div className="font-bold">04 Sept 2026</div>
  ```
- All recommendations are hardcoded text directly inside the JSX template.

**Confidence justification:**
HIGH — Directly verified in [`Prescription.jsx`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/Prescription.jsx). There are no props, context consumers, database queries, or API calls providing remedy data.

---

### Feature 3: Pesticide Recommendation

**Status:** MOCKED / UI ONLY  
**Real / Mock / Planned:** MOCK  
**Evidence Confidence:** HIGH  

**What currently exists:**
- A dedicated presentation card on the prescription page displaying pesticide details: [`Prescription.jsx:L44-66`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/Prescription.jsx#L44-L66)

**What is missing:**
- Dynamic pesticide selection logic tied to specific disease diagnoses.
- Pesticide product catalog or database with active chemical ingredients, trade brands, and application schedules.
- Calculation of dosage based on farm acreage, water volume, or dilution rates.
- Backend API or local database supplying registered chemical treatments.

**Evidence:**
- [`Prescription.jsx:L47-63`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/Prescription.jsx#L47-L63):
  ```jsx
  <p className="font-bold text-gray-800 text-lg">Chlorothalonil 75% WP</p>
  <p className="text-xs text-gray-400 mt-1">(Common brands: Kavach, Bravo)</p>
  ...
  <p className="font-bold text-gray-800">2 gm / Litre</p>
  <p className="font-bold text-gray-800">Every 7 Days</p>
  ```
- All text strings are hardcoded literals in the markup.

**Confidence justification:**
HIGH — The source code contains hardcoded strings for "Chlorothalonil 75% WP" and "2 gm / Litre" with no dynamic logic or data source.

---

### Feature 4: Organic Alternative

**Status:** MOCKED / UI ONLY  
**Real / Mock / Planned:** MOCK  
**Evidence Confidence:** HIGH  

**What currently exists:**
- "Biological Alternative (Bio-Control)" card on the prescription page: [`Prescription.jsx:L69-84`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/Prescription.jsx#L69-L84)
- Dedicated "Bio-Khaat Advisor" page: [`BioKhaat.jsx:L1-104`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/BioKhaat.jsx#L1-L104)

**What is missing:**
- Automated linking between detected diseases and corresponding organic remedies.
- Dynamic bio-fertilizer / bio-pesticide selection logic (e.g., Neemastra, Dashparni ark, Beauveria bassiana, Trichoderma).
- Form submission logic in [`BioKhaat.jsx`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/BioKhaat.jsx); the "Get Recommendations" button has no `onClick` event listener or handler.

**Evidence:**
- [`Prescription.jsx:L76-81`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/Prescription.jsx#L76-L81):
  ```jsx
  <p className="font-bold text-gray-800 text-lg">Trichoderma viride 1.5% WP</p>
  <p className="font-bold text-gray-800">Foliar spray @ 5 gm / Litre water.</p>
  ```
- [`BioKhaat.jsx:L41-43`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/BioKhaat.jsx#L41-L43):
  ```jsx
  <button className="w-full md:w-auto bg-krishi-green text-white font-bold py-2.5 px-8 rounded-xl hover:bg-krishi-green-dark transition-colors">
    Get Recommendations
  </button>
  ```
  *(No `onClick`, state binding, or API call attached).*

**Confidence justification:**
HIGH — Verified that neither the prescription biological card nor the BioKhaat page has functional logic.

---

### Feature 5: Crop Growth Tracking

**Status:** MOCKED / UI ONLY  
**Real / Mock / Planned:** MOCK  
**Evidence Confidence:** HIGH  

**What currently exists:**
- Crop lifecycle progress UI: [`MyCrop.jsx:L5-15`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/MyCrop.jsx#L5-L15)
- Daily agricultural to-do list: [`Tasks.jsx:L5-28`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/Tasks.jsx#L5-L28)
- Crop health history & recovery chart: [`History.jsx:L6-19`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/History.jsx#L6-L19)

**What is missing:**
- Multi-field management (creating separate profiles for Field A, Field B, Cotton, Maize, Rice).
- Input forms for recording daily crop observations, irrigation logs, or photo scans; the "Log Daily Observation" button has no `onClick` handler.
- Dynamic crop growth stage engine (calculating Germination → Vegetative → Flowering → Fruiting → Maturity based on sowing date and GDD/weather).
- Dynamic action plan generator that derives daily to-dos from current field state.
- Data persistence layer (IndexedDB, SQLite, Room, or backend API); all tasks and lifecycle stages reset to static initial arrays.

**Evidence:**
- [`MyCrop.jsx:L5-15,L41-46,L96-98`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/MyCrop.jsx#L5-L15):
  ```jsx
  const lifecycleStages = [
    { id: 1, title: 'Variety Selection', status: 'completed' },
    ...
  ];
  <span className="font-semibold text-gray-800 text-sm">15 July 2026</span>
  <span className="font-bold text-krishi-green text-sm ...">38 Days</span>
  <button className="text-xs font-bold text-white bg-krishi-green px-4 py-2 ...">
    Log Daily Observation
  </button>
  ```
- [`Tasks.jsx:L5-28`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/Tasks.jsx#L5-L28) defines an immutable in-memory array `sections = [...]` without local or remote persistence.

**Confidence justification:**
HIGH — The components render static mock profiles and lack input handlers, state stores, and database models.

---

### Feature 6: Marketplace

**Status:** NOT IMPLEMENTED  
**Real / Mock / Planned:** NONE  
**Evidence Confidence:** HIGH  

**What currently exists:**
- A page titled "Market Intelligence": [`Market.jsx:L1-111`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/Market.jsx#L1-L111). Note: This page displays mock wholesale mandi commodity selling rates (Tomato ₹28/kg, Onion ₹24/kg, Rice ₹42/kg), not an e-commerce purchasing portal.

**What is missing:**
- Product catalog for inputs (seeds, fertilizers, pesticides, agricultural tools).
- Product search, filtering, and detail views.
- Shopping cart (`Cart`), order placement, checkout workflow, and payment gateway integration.
- Order history tracking.
- Integration connecting disease detection/prescriptions to a product purchase flow ("Buy Now" for recommended fungicides/fertilizers).

**Evidence:**
- Entire code search of `FarmMind/farmmind/src` confirms zero occurrences of `cart`, `checkout`, `order`, `product`, or `payment`.
- [`Market.jsx`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/Market.jsx) only contains simulated price charts from APMC markets.

**Confidence justification:**
HIGH — There is no e-commerce or purchasing infrastructure anywhere in the code.

---

### Feature 7: Expert Consultation

**Status:** MOCKED / UI ONLY  
**Real / Mock / Planned:** MOCK  
**Evidence Confidence:** HIGH  

**What currently exists:**
- Expert directory page with filters and mock doctor cards: [`Experts.jsx:L8-53`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/Experts.jsx#L8-L53)
- Booking modal dialog with consultation form: [`Experts.jsx:L133-185`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/Experts.jsx#L133-L185)

**What is missing:**
- Real expert profiles, live availability statuses, or authentication for agronomists.
- Real booking/appointment backend service; submitting the modal form simply calls `e.preventDefault(); setShowModal(false);` and discards all form values.
- Real-time communication system (WebRTC, Twilio, Agora, WebSocket, or SIP) for audio and video calls.
- Messaging or chat service between farmer and expert.
- Consultation records or history tracking.

**Evidence:**
- [`Experts.jsx:L150`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/Experts.jsx#L150):
  ```jsx
  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowModal(false); }}>
  ```
- Video call and phone call buttons ([`Experts.jsx:L120-125`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/Experts.jsx#L120-L125)) have no `onClick` event listeners.

**Confidence justification:**
HIGH — Directly verified from `Experts.jsx`. The form submission is a dummy event that closes the modal dialog with zero network or persistence logic.

---

### Feature 8: Flash SMS / Weather Alerts

**Status:** MOCKED / UI ONLY  
**Real / Mock / Planned:** MOCK  
**Evidence Confidence:** HIGH  

**What currently exists:**
- Weather dashboard displaying temperature, humidity, rain probability, and a mock early warning card: [`Weather.jsx:L1-200`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/Weather.jsx#L1-L200)

**What is missing:**
- Weather API integration (e.g., OpenWeatherMap, WeatherAPI, IMD API); all weather statistics are static constants.
- Dynamic risk prediction algorithm linking weather metrics to crop susceptibility.
- Flash SMS gateway integration (e.g., Twilio, AWS SNS, Fast2SMS).
- Mobile push notification engine or background Android service.
- Scheduled alert dispatchers or cron jobs.

**Evidence:**
- [`Weather.jsx:L6-13,L33-51`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/Weather.jsx#L6-L13):
  ```jsx
  const dummyChartData = [
    { time: '6 AM', temp: 24, rain: 0 }, ...
  ];
  ...
  <h2 className="text-5xl font-extrabold mb-2">28°C</h2>
  <span className="font-bold">65%</span> // Humidity
  <span className="font-bold">80%</span> // Rain Prob
  ```
- No network requests (`fetch` or `axios`) exist in [`Weather.jsx`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/Weather.jsx).
- Android wrapper [`MainActivity.kt`](file:///c:/Documents/EDI%20PROJECT/FarmMind/app/src/main/java/com/example/sih_01/MainActivity.kt) contains zero notification services or background receivers.

**Confidence justification:**
HIGH — Verified in both the React code and the Android wrapper. No communication or external API integrations exist.

---

### Feature 9: Farmer Community

**Status:** PLANNED / DOCUMENTED ONLY  
**Real / Mock / Planned:** PLANNED  
**Evidence Confidence:** HIGH  

**What currently exists:**
- Blueprint documentation: [`AgriScan_Complete_Blueprint.md:L82`](file:///c:/Documents/EDI%20PROJECT/Reports%20and%20files/AgriScan_Complete_Blueprint.md#L82) lists "community forum" under proposed online modules.

**What is missing:**
- Community feed page.
- Farmer posting, image sharing, commenting, or upvoting mechanisms.
- Farmer-to-farmer direct or group chat.
- Community routes in [`App.jsx`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/App.jsx).

**Evidence:**
- Grep search for `community` across the entire `FarmMind/farmmind/src` directory returns 0 results.
- [`App.jsx:L21-44`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/App.jsx#L21-L44) defines 14 routes; none correspond to a community or social feature.

**Confidence justification:**
HIGH — Verified via project-wide text search and route auditing. No community code exists.

---

### Feature 10: Offline AI

**Status:** PLANNED / DOCUMENTED ONLY  
**Real / Mock / Planned:** PLANNED  
**Evidence Confidence:** HIGH  

**What currently exists:**
- System architecture documentation specifying offline on-device TFLite inference: [`AgriScan_Complete_Blueprint.md:L56,L75`](file:///c:/Documents/EDI%20PROJECT/Reports%20and%20files/AgriScan_Complete_Blueprint.md#L56), [`CropPilot_Architecture.md:L59-68`](file:///c:/Documents/EDI%20PROJECT/Reports%20and%20files/CropPilot_Architecture.md#L59-L68)
- Offline Android asset streaming mechanism via `WebViewAssetLoader`: [`MainActivity.kt:L40-42`](file:///c:/Documents/EDI%20PROJECT/FarmMind/app/src/main/java/com/example/sih_01/MainActivity.kt#L40-L42)

**What is missing:**
- Model file: No `.tflite` model file exists in `FarmMind/app/src/main/assets` or anywhere in the workspace.
- AI runtime dependencies:
  - [`package.json`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/package.json) contains no `@tensorflow/tfjs` or `onnxruntime-web`.
  - Android [`build.gradle.kts`](file:///c:/Documents/EDI%20PROJECT/FarmMind/app/build.gradle.kts#L34-L42) contains no `org.tensorflow:tensorflow-lite` dependencies.
- Native Android AI bridge: [`MainActivity.kt`](file:///c:/Documents/EDI%20PROJECT/FarmMind/app/src/main/java/com/example/sih_01/MainActivity.kt) does not register any `@JavascriptInterface` to run on-device inference from the WebView.
- Local disease/remedy database: No SQLite, Room, or IndexedDB store exists for offline prescription resolution.

**Evidence:**
- Android [`build.gradle.kts:L34-42`](file:///c:/Documents/EDI%20PROJECT/FarmMind/app/build.gradle.kts#L34-L42):
  ```kotlin
  dependencies {
      implementation(libs.androidx.appcompat)
      implementation(libs.androidx.core.ktx)
      implementation(libs.androidx.webkit)
      implementation(libs.material)
  }
  ```
- Android [`MainActivity.kt`](file:///c:/Documents/EDI%20PROJECT/FarmMind/app/src/main/java/com/example/sih_01/MainActivity.kt) is 82 lines of pure WebView configuration without any AI or model loading logic.
- No `.tflite` file exists in the project filesystem.

**Confidence justification:**
HIGH — The build configurations and source files for both the web app and the Android app confirm that no ML runtime or model weights are present.

**AI/Model Metrics:**
- **Model present:** NO
- **Model format:** UNKNOWN / None
- **Model path:** UNKNOWN / None
- **Inference code present:** NO
- **Inference actually connected to UI:** NO
- **Offline capable:** NO
- **Mock inference present:** NO *(Mock detection runs purely in browser JS memory via `setTimeout`, not via an offline AI runtime)*
- **Evidence Confidence:** HIGH

---

## 3. Final Confidence Summary

| Evidence Confidence | Number of Features |
|---|---:|
| HIGH | 10 |
| MEDIUM | 0 |
| LOW | 0 |
| NONE | 0 |

---

## 4. Highest-Confidence Findings

All 10 features were verified with **HIGH** confidence directly from source code inspection:

1. **Crop Disease Detection:** Directly verified in [`DiseaseDetection.jsx`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/DiseaseDetection.jsx); uses a hardcoded 2.5-second `setTimeout` mock returning "Tomato Early Blight".
2. **Remedy Recommendation:** Directly verified in [`Prescription.jsx`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/Prescription.jsx); static JSX text without rule logic or dynamic state.
3. **Pesticide Recommendation:** Directly verified in [`Prescription.jsx`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/Prescription.jsx); hardcoded "Chlorothalonil 75% WP".
4. **Organic Alternative:** Directly verified in [`Prescription.jsx`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/Prescription.jsx) and [`BioKhaat.jsx`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/BioKhaat.jsx); static text and buttons without event handlers.
5. **Crop Growth Tracking:** Directly verified in [`MyCrop.jsx`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/MyCrop.jsx) and [`Tasks.jsx`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/Tasks.jsx); static arrays, unhandled buttons, and zero persistence.
6. **Marketplace:** Directly verified in [`Market.jsx`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/Market.jsx) and the codebase; no e-commerce or ordering system exists.
7. **Expert Consultation:** Directly verified in [`Experts.jsx`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/Experts.jsx); dummy profiles and empty form dismissal without communication backends.
8. **Flash SMS / Weather Alerts:** Directly verified in [`Weather.jsx`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/src/pages/Weather.jsx) and [`MainActivity.kt`](file:///c:/Documents/EDI%20PROJECT/FarmMind/app/src/main/java/com/example/sih_01/MainActivity.kt); static weather displays with zero external APIs, SMS, or notification services.
9. **Farmer Community:** Directly verified via project-wide search; zero code or components exist.
10. **Offline AI:** Directly verified in [`build.gradle.kts`](file:///c:/Documents/EDI%20PROJECT/FarmMind/app/build.gradle.kts), [`package.json`](file:///c:/Documents/EDI%20PROJECT/FarmMind/farmmind/package.json), and [`MainActivity.kt`](file:///c:/Documents/EDI%20PROJECT/FarmMind/app/src/main/java/com/example/sih_01/MainActivity.kt); no TFLite runtime, no model weights, and no native AI bridge exist.

---

## 5. Uncertain Findings

*None.* All 10 features were conclusively verified against the actual repository files.

---

## 6. Overall Feature Coverage

- **Fully implemented:** 0 / 10
- **Partially implemented:** 0 / 10
- **Mock / UI only:** 7 / 10 *(Crop Disease Detection, Remedy Recommendation, Pesticide Recommendation, Organic Alternative, Crop Growth Tracking, Expert Consultation, Flash SMS / Weather Alerts)*
- **Planned only:** 2 / 10 *(Farmer Community, Offline AI)*
- **Not implemented:** 1 / 10 *(Marketplace)*

---

## 7. Current FarmMind Architecture Reality

Based strictly on the code present in the workspace, FarmMind AI is currently a **standalone interactive frontend prototype** paired with an offline dataset preparation pipeline.

On the client side, the project features a responsive React 19 application running with Vite. The user interface provides screens for disease detection, prescriptions, growth tracking, tasks, expert directories, and weather intelligence. However, **every screen operates exclusively on hardcoded mock constants or client-side timer simulations**. The disease detection flow does not inspect image pixels; clicking upload triggers an in-memory 2.5-second timer that displays static mock data for Tomato Early Blight. The buttons for booking experts, downloading prescriptions, logging crop observations, and getting organic recommendations do not persist data or communicate with external services. The Android application is an 82-line Kotlin shell that loads these packaged web assets inside an Android WebView using `WebViewAssetLoader`.

On the data and machine learning side, the workspace contains a dataset of 14,496 images for Cotton, Maize, and Rice structured into a 70/15/15 train/val/test split, along with a data loading and augmentation script (`preprocess_farmmind.py`). However, **no machine learning model has been trained, exported, or quantized**. There are no `.tflite`, `.keras`, or `.h5` files, no backend server (FastAPI, Flask, or Node.js), no external API integrations (weather or SMS), and no database (SQLite, Room, or IndexedDB). The offline AI and end-to-end continuous crop tracking loops described in the project blueprints remain purely conceptual and documented designs.
