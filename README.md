# 🌍 Earthquake Visualizer

A React + Tailwind CSS app that visualizes recent earthquake activity using the [USGS Earthquake API](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson).  
Built for the Take-Home UI Challenge.

---

## 🚀 Features
- Interactive map (Leaflet + React-Leaflet).
- Earthquake markers sized & colored by magnitude.
- Click list items → focus map on that earthquake.
- Filter by **minimum magnitude**.
- Filter by **continent**.
- Responsive layout (mobile & desktop).
- Graceful error handling and empty states.

---

## 🛠️ Tech Stack
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS (PostCSS integration)
- **Mapping**: React-Leaflet + Leaflet
- **State Management**: React hooks

---

## 📦 Installation
```bash
# clone repository
git clone https://github.com/chaitu-169/earthquake-visualizer.git
cd earthquake-visualizer

# install dependencies
npm install

# start dev server
npm run dev

---
📂 Project Structure

src/
 ├─ components/
 │   ├─ Header.jsx
 │   ├─ Mapview.jsx
 │   └─ EarthquakeList.jsx
 ├─ hooks/
 │   └─ useEarthquakes.js
 ├─ services/
 │   └─ earthquakeService.js
 ├─ App.jsx
 ├─ index.css
 └─ main.jsx
