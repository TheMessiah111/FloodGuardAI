# FloodGuard AI

An AI-based Early Warning System for Flood Prediction and Hazard Management in Nigerian Communities. Built as a Computer Science penultimate-year research project.

## Project Abstract
FloodGuard AI is a lightweight, responsive web application designed to demonstrate the application of software engineering principles and heuristic model simulation in flood management. The system aggregates hydrometeorological parameters (rainfall, river level, soil moisture, humidity, wind speed, temperature) to calculate regional flood risk indices in real time. If warning thresholds are breached, the system auto-triggers alerts for municipal planning agencies, safety services (NEMA), and local communities.

## Technical Architecture
This project implements a feature-based modular folder structure built upon Next.js 15, TypeScript, Tailwind CSS, Prisma ORM, and PostgreSQL.

### Core Stack
- **Frontend Framework**: Next.js 15 (App Router)
- **State & Forms**: React Hook Form, Zod schemas, Axios
- **Charts & Spatial Maps**: Leaflet.js (OpenStreetMap), Recharts
- **Database & Auth**: Prisma ORM, PostgreSQL database connection, JWT session tokens, Bcrypt password hashing
- **UI Design**: Authoritative navy-blue and public safety green theme, responsive cards, and clean typography

---

## Folder Structure
```
prisma/
  └── schema.prisma        # Database models & relationships
src/
  ├── app/                 # Page routes and API route handlers
  ├── components/          # Reusable UI component modules
  │   ├── layout/          # Desktop/Mobile Navigation and Footer layouts
  │   ├── common/          # Shared generic atoms (Buttons, Cards, Inputs, Modals)
  │   ├── auth/            # Registration and Login forms
  │   ├── dashboard/       # Aggregated stats, summaries, charts
  │   ├── prediction/      # Prediction forms, meters, results
  │   ├── weather/         # Telemetry cards and metric summaries
  │   ├── map/             # Client-side Leaflet GIS visual maps
  │   ├── alerts/          # Alert lists and acknowledgement cards
  │   ├── analytics/       # Chart trends and model performance reports
  │   └── emergency/       # Rescue directories and calling interfaces
  ├── hooks/               # useAuth, usePrediction, useWeather, etc.
  ├── services/            # Database Query and business logic layer
  ├── types/               # TypeScript interfaces
  └── lib/                 # Shared utils (auth helpers, client instances)
```

---

## Heuristic Risk Index Formula
The predictive logic in `PredictionService.ts` simulates a classifiers heuristic by applying weighted indices to key environmental factors:
- **Rainfall (35%)**: Evaluates millimeter precipitation (capped at 150mm).
- **River Runoff Level (35%)**: Gauges river elevation in meters (capped at 8m).
- **Soil Moisture (15%)**: Assesses soil water saturation percentage.
- **Atmospheric Humidity (5%)**: Measures environmental moisture.
- **Wind Speed (10%)**: Registers wind velocities in km/h.

$$\text{Risk \%} = \min\left(35, \frac{\text{Rainfall}}{150} \times 35\right) + \min\left(35, \frac{\text{River Level}}{8} \times 35\right) + \text{Moisture} \times 0.15 + \text{Humidity} \times 0.05 + \min\left(10, \frac{\text{Wind}}{60} \times 10\right)$$

### Risk Classifications
- **LOW (< 35%)**: System clear. Standard safety conditions.
- **MEDIUM (35% – 64%)**: Moderate risk. Clean drainages and prepare loose outdoor items.
- **HIGH (65% – 79%)**: Significant threat. Secure valuables to higher elevations.
- **CRITICAL (≥ 80%)**: Active hazard. Auto-creates alert warnings. Evacuate to high ground.

---

## Installation & Configuration

### Prerequisites
- Node.js (v18.x or later)
- PostgreSQL database instance

### 1. Environment Configuration
Create a `.env` file in the root directory (a default `.env` template has been generated):
```env
# PostgreSQL Database Connection
DATABASE_URL="postgresql://postgres:YOUR_POSTGRES_PASSWORD@localhost:5432/floodguard?schema=public"

# JWT Configuration
JWT_SECRET="floodguard_ai_secret_key_2026_nigeria"
```

### 2. Dependency Installation
Since the execution sandbox requires offline compatibility, run:
```bash
npm install --legacy-peer-deps
```
*Note: We use `--legacy-peer-deps` to guarantee clean package alignment with React 19.*

### 3. Database Migration
Synchronize your PostgreSQL database with the Prisma schema layout:
```bash
npx prisma db push
```

### 4. Application Seeding
You do not need to run manual seed commands. **FloodGuard AI features database self-seeding**. 
Upon logging into the dashboard for the first time, `DashboardService.ts` checks if records are empty and automatically populates the database with:
- An administrator/researcher account (`admin@floodguard.gov.ng` | password: `password123`)
- Initial geographic coordinates for flood-prone Nigerian communities (Lokoja, Makurdi, Yenagoa, Patani, Ibaji, Onitsha, Lagos Island, Baro)
- Mock weather station telemetry records
- Historical prediction run metrics and warning alerts to fill the analytics graphs

---

## Running the Application
To launch the Next.js local development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser to explore.
