# AgriScan
### Your AI Farming Companion from Sowing to Harvest

**Complete Product, Research & Engineering Blueprint**
Startup Concept · IEEE-style Research Paper Basis · Patent-Ready Design · Final Year Engineering Project

> Diagram images referenced below live alongside this file in `agriscan_diagrams/`.

---

## Table of Contents

1. [Executive Overview](#1-executive-overview)
2. [Feature Set](#2-feature-set)
3. [Complete Software Architecture](#3-complete-software-architecture)
4. [System Architecture Diagram](#4-system-architecture-diagram)
5. [Professional Block Diagram](#5-professional-block-diagram)
6. [Data Flow Diagrams](#6-data-flow-diagrams)
7. [UML Use Case Diagram](#7-uml-use-case-diagram)
8. [Component Diagram](#8-component-diagram)
9. [Sequence Diagram — Disease Detection Flow](#9-sequence-diagram--disease-detection-flow)
10. [Database Schema](#10-database-schema)
11. [ER Diagram](#11-er-diagram)
12. [AI Pipeline Diagram](#12-ai-pipeline-diagram)
13. [Cloud Architecture](#13-cloud-architecture)
14. [Offline vs Online Architecture](#14-offline-vs-online-architecture)
15. [Mobile App Screen Flow](#15-mobile-app-screen-flow)
16. [User Journey Diagram](#16-user-journey-diagram)
17. [Feature Hierarchy](#17-feature-hierarchy)
18. [Folder Structure](#18-folder-structure)
19. [API Architecture](#19-api-architecture)
20. [Recommendation Engine Workflow](#20-recommendation-engine-workflow)
21. [Growth Tracker Workflow](#21-growth-tracker-workflow)
22. [Crop Timeline Workflow](#22-crop-timeline-workflow)
23. [Technology Stack](#23-technology-stack)
24. [Deployment Architecture](#24-deployment-architecture)
25. [Research Novelty](#25-research-novelty)
26. [Patent Opportunities](#26-patent-opportunities)
27. [Future Scope](#27-future-scope)
28. [MVP Scope & Project Timeline](#28-mvp-scope--project-timeline)

---

## 1. Executive Overview

AgriScan is designed as a full crop-lifecycle AI companion rather than a single-purpose disease scanner. The differentiator is continuity: the platform stays with a crop from sowing to harvest, turning a one-time diagnosis into an ongoing health record, and turning a treatment suggestion into a measurable recovery outcome.

### 1.1 Target Users

- **Primary:** small and medium farmers who need low-cost, low-connectivity, local-language guidance.
- **Secondary:** agriculture officers, Krishi Vigyan Kendras, researchers, and government agriculture departments who need aggregated, regional visibility into crop health and disease trends.
- **Future:** insurance companies (crop-health-based risk assessment), agri startups (data/API partnerships), and agri retailers (demand-side pesticide/fertilizer signals).

### 1.2 Core Objective

A farmer photographs a crop leaf. The system detects disease completely offline using an on-device TensorFlow Lite model, then returns disease name, confidence score, severity, likely cause, organic and chemical treatment options, exact dosage, safety instructions, and prevention guidance. When internet is available, the system also recommends the cheapest and best-rated nearby pesticide product, with shop name, price, distance, and rating.

### 1.3 Primary USP

Most competing apps stop at: **Photo → Disease Detection → Treatment**.

AgriScan continues the loop:

**Photo → Disease Detection → Treatment → Weekly Re-scan → Growth & Recovery Tracking → Crop Timeline → Harvest Readiness → Yield/Outcome Record**

This continuous loop is what converts a utility app into a defensible dataset and a research asset (see Section 25).

---

## 2. Feature Set

| # | Feature | Core Function |
|---|---|---|
| 1 | Smart Crop Profile | Digital identity of each crop: variety, sowing date, area, soil, irrigation, location |
| 2 | AI Disease Detection | Fully offline image-based detection via TFLite, optimized for low-end Android devices |
| 3 | Smart Recommendation Engine | Personalized organic/chemical treatment, dosage, spray timing, safety, recovery estimate |
| 4 | Crop Health & Growth Tracker | Weekly image comparison to measure recovery %, leaf area change, growth stage |
| 5 | AI Farming Assistant | Context-aware reminders for irrigation, spraying, fertilizing, next scan, harvest |
| 6 | Weather Intelligence | Humidity/temperature/rain/wind based outbreak prediction and proactive alerts |
| 7 | Voice Assistant | English, Hindi, Marathi voice interaction for low-literacy accessibility |
| 8 | Offline Knowledge Base | Local SQLite store of disease, treatment, dosage, and voice data |
| 9 | Online Sync & Marketplace | Cloud backup, model updates, nearby shop pricing, community forum |
| 10 | Crop Health Score | Single composite score (e.g., 92/100) from disease, growth, recovery, weather |
| 11 | AI Crop Timeline | Auto-generated visual history: Day 1 → Detection → Treatment → Recovery → Harvest |

---

## 3. Complete Software Architecture

AgriScan follows an **offline-first, layered architecture**: a fully autonomous on-device layer handles the core detection loop without connectivity, while a thin cloud layer adds intelligence, sync, and marketplace features opportunistically whenever a connection is available.

### 3.1 Architectural Layers

- **Client Layer (Flutter):** UI, voice assistant, camera/image capture, on-device TFLite inference, SQLite offline store.
- **API / Backend Layer (FastAPI):** authentication, recommendation engine, growth tracking service, weather intelligence, shop/marketplace lookup, sync/backup orchestration.
- **Data & Cloud Layer (AWS):** PostgreSQL for structured cloud records, Firebase/S3 for image and file storage, a versioned AI model registry for OTA model updates.
- **External Integrations:** Google Maps API (shop distance/location), OpenWeatherMap API (weather intelligence), government scheme / market price APIs.

![System Architecture](agriscan_diagrams/01_system_architecture.png)
*Figure 3.1 — System Architecture*

---

## 4. System Architecture Diagram

See Figure 3.1 above — this is the canonical system architecture diagram referenced throughout this document.

---

## 5. Professional Block Diagram

A simplified four-block view for pitch decks and report abstracts, showing the continuous feedback loop that is the platform's core innovation.

![Block Diagram](agriscan_diagrams/11_block_diagram.png)
*Figure 5.1 — High-Level Block Diagram with Feedback Loop*

---

## 6. Data Flow Diagrams

### 6.1 Level 0 (Context Diagram)

![DFD Level 0](agriscan_diagrams/02_dfd_level0.png)
*Figure 6.1 — DFD Level 0 / Context Diagram*

### 6.2 Level 1 (Process Decomposition)

![DFD Level 1](agriscan_diagrams/03_dfd_level1.png)
*Figure 6.2 — DFD Level 1*

---

## 7. UML Use Case Diagram

![Use Case Diagram](agriscan_diagrams/05_use_case.png)
*Figure 7.1 — Use Case Diagram*

---

## 8. Component Diagram

![Component Diagram](agriscan_diagrams/06_component_diagram.png)
*Figure 8.1 — Component Diagram*

---

## 9. Sequence Diagram — Disease Detection Flow

Simplified interaction sequence for a single scan, from image capture to storage.

![Sequence Diagram](agriscan_diagrams/07_sequence_flow.png)
*Figure 9.1 — Disease Detection Sequence*

---

## 10. Database Schema

Core tables, mirrored between the offline SQLite store and the cloud PostgreSQL instance; sync reconciles by primary key + `updated_at` timestamp.

| Table | Key Fields |
|---|---|
| `farmer` | farmer_id (PK), name, phone, language, location |
| `crop_profile` | crop_id (PK), farmer_id (FK), crop_name, variety, sowing_date, farm_area, irrigation_type, soil_type, farming_type |
| `disease_scan` | scan_id (PK), crop_id (FK), image_path, disease_name, confidence, severity, scan_date |
| `treatment` | treatment_id (PK), scan_id (FK), type (organic/chemical), dosage, spray_time, safety_notes |
| `growth_record` | growth_id (PK), crop_id (FK), week_no, leaf_area, recovery_pct, health_score, status |
| `weather_log` | log_id (PK), location, humidity, temperature, rain_prob, date |
| `pesticide_shop` | shop_id (PK), name, product, price, rating, distance |

---

## 11. ER Diagram

![ER Diagram](agriscan_diagrams/04_er_diagram.png)
*Figure 11.1 — Entity Relationship Diagram*

---

## 12. AI Pipeline Diagram

The on-device inference pipeline is designed to run fully offline on low-end Android hardware, using a quantized TFLite model.

![AI Pipeline](agriscan_diagrams/08_ai_pipeline.png)
*Figure 12.1 — AI Inference Pipeline*

---

## 13. Cloud Architecture

Cloud services are intentionally thin and stateless-where-possible so the app remains fully usable offline. AWS hosts a containerized FastAPI service behind a load balancer, backed by PostgreSQL (Amazon RDS) for relational data and S3 for images/backups. A background worker handles asynchronous jobs: sync reconciliation, model retraining triggers, and scheduled weather-alert generation.

- **Compute:** containerized FastAPI service (ECS/EKS-style), horizontally scalable
- **Storage:** S3 for crop images, growth-timeline photos, and cloud backups
- **Database:** PostgreSQL (Amazon RDS) mirroring the offline schema
- **Model registry:** versioned `.tflite` artifacts pushed to devices via CDN
- **Auth:** Firebase Authentication, tokens validated at the API gateway

---

## 14. Offline vs Online Architecture

| Capability | Offline (always available) | Online (when connected) |
|---|---|---|
| Disease detection | Yes — on-device TFLite | N/A (already offline) |
| Severity & confidence scoring | Yes | N/A |
| Treatment lookup | Yes — local SQLite KB | Refreshed with latest KB version |
| Growth tracker & timeline | Yes — stored locally | Synced to cloud for backup |
| Voice guidance | Yes — bundled voice assets | N/A |
| Weather-based outbreak alerts | No | Yes — requires live weather API |
| Nearby pesticide shop pricing | No | Yes — requires Maps + shop data |
| Community forum / govt schemes | No | Yes |
| Model updates | Uses last downloaded model | Pulls latest model version |

---

## 15. Mobile App Screen Flow

![Screen Flow](agriscan_diagrams/12_screen_flow.png)
*Figure 15.1 — Screen Navigation Flow*

---

## 16. User Journey Diagram

Narrative journey for a first-time farmer user, sowing to harvest:

| Stage | Farmer Action | System Response |
|---|---|---|
| Onboarding | Installs app, selects language, logs in | Creates farmer profile, offline data bundle downloads |
| Sowing | Creates a crop profile | Establishes digital crop identity, sets reminder schedule |
| Early growth | Uploads weekly baseline photo | Records Day 1 healthy baseline |
| Disease onset | Notices spots, scans leaf | Detects disease offline, shows severity + treatment plan |
| Treatment | Applies organic/chemical treatment per dosage | Logs treatment event, schedules re-scan reminder |
| Recovery | Uploads follow-up photos weekly | Tracks recovery %, updates crop health score |
| Pre-harvest | Receives harvest-readiness alert | Projects harvest window from growth stage + weather |
| Harvest | Marks crop harvested | Finalizes crop timeline, archives record for future reference |

---

## 17. Feature Hierarchy

![Feature Hierarchy](agriscan_diagrams/09_feature_hierarchy.png)
*Figure 17.1 — Feature Hierarchy Tree*

---

## 18. Folder Structure

### 18.1 Flutter App (Client)

```
agriscan_app/
  lib/
    core/            # constants, themes, utils, error handling
    data/
      local/          # sqlite datasource, DAOs
      remote/         # REST API clients
      repositories/    # repository implementations
    domain/
      entities/
      usecases/
    presentation/
      screens/
        onboarding/
        crop_profile/
        scan/
        result/
        timeline/
        alerts/
        community/
      widgets/
      providers/       # state management
    services/
      tflite_service.dart
      voice_service.dart
      sync_service.dart
  assets/
    models/            # .tflite model files
    voice/             # audio prompts (en/hi/mr)
    knowledge_base.db  # bundled offline SQLite seed
```

### 18.2 FastAPI Backend

```
agriscan_backend/
  app/
    api/
      v1/
        auth.py
        crops.py
        scans.py
        recommendations.py
        growth.py
        weather.py
        shops.py
        sync.py
    core/               # config, security, dependencies
    models/             # SQLAlchemy models
    schemas/            # Pydantic schemas
    services/
      recommendation_engine.py
      growth_analysis.py
      weather_intelligence.py
    workers/            # background jobs (sync, retraining triggers)
    db/                 # session, migrations (alembic)
  tests/
  Dockerfile
  requirements.txt
```

---

## 19. API Architecture

REST API, versioned under `/api/v1`, JWT-authenticated via Firebase tokens validated at the gateway.

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/v1/auth/login` | POST | Authenticate farmer, issue session token |
| `/api/v1/crops` | POST / GET | Create or list crop profiles |
| `/api/v1/crops/{id}` | GET / PUT | Fetch or update a crop profile |
| `/api/v1/scans` | POST | Submit a scan result for cloud sync (offline-first, queued) |
| `/api/v1/recommendations` | POST | Get treatment plan given disease + crop context |
| `/api/v1/growth/{crop_id}` | GET / POST | Fetch or append growth-tracker records |
| `/api/v1/weather/alerts` | GET | Get outbreak-risk alerts for a location |
| `/api/v1/shops/nearby` | GET | Get nearby pesticide shops with price/rating/distance |
| `/api/v1/sync` | POST | Bulk sync offline queue to cloud |
| `/api/v1/models/latest` | GET | Check and download latest `.tflite` model version |

---

## 20. Recommendation Engine Workflow

Inputs: disease, crop type, severity, growth stage, location, weather, and prior treatment history.

1. **Rule-based filter** — eliminate treatments unsuitable for the crop's growth stage or farming type (organic-only farms exclude chemical options).
2. **Severity-weighted ranking** — mild cases favor organic remedies first; severe cases surface chemical treatment with faster action time.
3. **Context adjustment** — weather (e.g., upcoming rain) shifts spray-timing recommendation; prior treatment history avoids repeating an ineffective treatment.
4. **Output assembly** — organic option, chemical option, exact dosage, spray time, safety instructions, expected recovery time, and prevention steps.
5. **Online enrichment** (if connected) — attach cheapest/best-rated nearby product listing for the recommended chemical treatment.

---

## 21. Growth Tracker Workflow

- Farmer uploads one image per week against an existing crop profile.
- System aligns the new image with the most recent prior image (same `crop_id`).
- Computer-vision comparison extracts: leaf area change, color/discoloration shift, lesion area trend.
- Recovery percentage is computed as reduction in affected leaf area relative to the worst recorded scan.
- Growth stage is inferred from elapsed days since sowing plus visual cues, cross-checked against expected crop growth curves.
- A trend label (Improving / Stable / Getting Worse) is generated and surfaced on the crop dashboard.

---

## 22. Crop Timeline Workflow

Every scan, treatment event, and growth record is appended to a single per-crop timeline, auto-rendered as a visual history:

- **Day 1** — Healthy baseline recorded
- **Day 8** — Disease detected (e.g., Early Blight), severity logged
- **Day 8** — Treatment applied and logged
- **Day 15** — Recovery +22% recorded from weekly scan
- **Day 30** — Crop marked healthy again; timeline closed or continues to harvest

This timeline view is positioned as the signature, most shareable feature of the app — useful for the farmer's own record-keeping, for agriculture officers reviewing regional trends, and as structured longitudinal data for the research contribution described in Section 25.

---

## 23. Technology Stack

![Tech Stack](agriscan_diagrams/10_tech_stack.png)
*Figure 23.1 — Layered Technology Stack*

---

## 24. Deployment Architecture

![Deployment Architecture](agriscan_diagrams/13_deployment.png)
*Figure 24.1 — Deployment Architecture*

---

## 25. Research Novelty

Framed for an IEEE-style paper, the contribution is not the disease classifier itself (well-studied) but the longitudinal tracking and closed-loop recommendation system built around it:

- A fully offline, on-device pipeline that unifies detection, severity estimation, and treatment recommendation for low-connectivity rural deployment.
- A weekly-interval computer-vision growth/recovery tracker that converts repeated scans of the same crop into a quantified recovery curve — most published work stops at single-image classification.
- A context-aware recommendation engine that fuses disease output with growth stage, weather, and treatment history rather than returning a static disease-to-treatment lookup.
- A composite Crop Health Score as a single interpretable metric derived from multiple underlying signals (disease, severity, growth, recovery, weather).
- A structured longitudinal dataset (per-crop timelines across many farmers) that does not commonly exist in public plant-disease research, useful for future outbreak-prediction and yield-correlation studies.

---

## 26. Patent Opportunities

Potential patentable or protectable elements (subject to formal patentability/prior-art search before filing):

- Method for offline, on-device plant disease severity estimation combined with growth-stage-aware treatment recommendation on resource-constrained mobile devices.
- System and method for automated crop recovery quantification using periodic image comparison to generate a recovery percentage and health trend classification.
- Composite crop health scoring method combining disease state, treatment history, growth metrics, and weather-derived risk into a single index.
- Method for weather-triggered predictive disease-outbreak alerting personalized to an individual crop profile and its treatment history.

> A patent professional should be engaged to run a formal novelty and prior-art search before drafting claims; this list identifies candidate inventive concepts only.

---

## 27. Future Scope

- Yield prediction: correlate crop timeline + weather + treatment data with final yield outcomes.
- Insurance integration: use crop health history as a data source for parametric crop insurance products.
- Satellite/drone imagery fusion for farm-level (not just leaf-level) health mapping.
- Marketplace expansion: direct produce-selling channel once harvest data is captured.
- Federated learning across devices to improve the on-device model without centralizing raw farmer images.
- Expansion to additional regional languages and additional crop/disease coverage beyond the MVP set.

---

## 28. MVP Scope & Project Timeline

Team of 4, 2.5-month build, MVP-first — deliberately excluding community forum, insurance integrations, and satellite imagery from the initial release.

| Phase | Duration | Deliverables |
|---|---|---|
| Phase 1 — Foundation | Weeks 1-3 | Crop profile module, SQLite schema, base Flutter UI, model selection/training start |
| Phase 2 — Core AI Loop | Weeks 4-7 | TFLite integration, disease detection + severity, offline treatment KB |
| Phase 3 — Intelligence Layer | Weeks 8-9 | Recommendation engine, growth tracker v1, crop health score |
| Phase 4 — Online Features | Week 10 | FastAPI backend, sync, weather alerts, nearby shop lookup |
| Phase 5 — Polish & Test | Weeks 11-10.5 (overlap) | Voice assistant, timeline UI, field testing, bug fixing |
