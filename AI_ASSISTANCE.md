# AI Assistance Log — Weather Dashboard

This document details the development decisions, architecture selection, and implementation steps handled by the AI developer during the construction of SkyFlow Weather Dashboard.

---

## 📅 Chronology of Development

### 1. Scaffolding & Dependency Setup
* **Action**: Scaffolding Vite React project inside `d:/Weather Dashboard` using `create-vite`.
* **Action**: Cleaned up default template files (e.g. `App.css`, `react.svg`) to establish a clean modular footprint.
* **Action**: Installed routing (`react-router-dom`), request handlers (`axios`), and icon graphics (`lucide-react`).

### 2. State, Theme, & Styling Architecture
* **Action**: Implemented `ThemeContext` tracking `'light' | 'dark'` and syncing values with Local Storage. The CSS hooks read the `[data-theme]` attribute on the `<html>`/`<body>` nodes.
* **Action**: Developed global styling tokens (`index.css`) utilizing Outfit typography, subtle animation frames, and glassmorphic card presets.
* **Action**: Designed `WeatherContext` coordinating fetching, caching history logs, favorites items, and Metric/Imperial state switches.

### 3. API & Fail-safe Mock Engineering
* **Decision**: OpenWeather API queries fail if a key is missing or calls are throttled. To make the project robust, we engineered a high-fidelity **Mock Mode** inside `src/services/weatherService.js`.
* **Mock Details**: When no API key is set in `.env` or local storage:
  * Emulates a loading delay to test spinners and skeletons.
  * Supplies realistic timezone offsets, coordinates, temperatures, wind conditions, and barometric indices for popular cities like London, Tokyo, Sydney, Cairo, and Reykjavik.
  * Dynamically computes the full 5-day, 40-interval 3-hour forecasts with cyclical day/night thermal curves.

### 4. Component Construction
* **SearchBar**: Sanitizes inputs (regex validation checking for character validity) and provides quick geolocating with GPS coordinates.
* **CurrentWeather**: Displays detailed indicators and utilizes responsive flex columns. Binds the Heart-Favorite button.
* **Forecast**: Filters 3-hour chunks by grouping calendar slots, calculating daily min/max, and displaying noon weather cards.
* **FavoriteCard**: Triggers sub-fetches for individual saved cities, presenting their conditions live in a grid.
* **About & Settings**: Exposes an API key configuration form saving keys to local storage, shifting the app instantly from Demo Mode to Live Mode.

---

## 🛠️ Issues Encountered & Solutions

### 1. Geolocation Error Handling
* **Issue**: If the user blocks geolocation permission, the app could hang or display a blank error.
* **Fix**: Added a timeout constraint (`8000ms`) to `navigator.geolocation` and handled permission errors explicitly, displaying a helpful toast-like warning instructing the user to search manually.

### 2. Timezone Display Shifts
* **Issue**: Using standard JavaScript Date methods formats dates to the client's local browser timezone, displaying incorrect clock values for international queries.
* **Fix**: Built a UTC shift method in `src/utils/dateUtils.js`. By shifting standard timestamps by the city-specific offset (`unixTime + timezoneOffset`) and reading UTC methods (`getUTCHours`, `getUTCDate`), the app displays the accurate local time of the queried city.
