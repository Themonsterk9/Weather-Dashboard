# AI Prompts Guidelines — Weather Dashboard

This file contains structured prompts and contextual instructions for AI coding assistants to extend, test, or modify this Weather Dashboard application.

---

## 1. Feature Additions

### Prompt: Adding a 24-Hour Hourly Forecast Chart
> "We want to display an hourly forecast chart for the next 24 hours under the main current weather section in `Home.jsx`.
> Modify `src/services/weatherService.js` if needed to extract hourly trends (OpenWeather 5-day API returns data in 3-hour increments which is suitable).
> Then create a new component `src/components/HourlyChart/HourlyChart.jsx` and `HourlyChart.css`.
> Use standard HTML Canvas or SVG bars for rendering simple temperature graphs (no external heavy libraries like Chart.js or Recharts unless specifically asked).
> Ensure the bars use a nice gradient that fits our light/dark CSS tokens, supporting smooth scaling on mobile."

### Prompt: Integrating Air Quality Index (AQI)
> "We want to query OpenWeather's air pollution API (`/air_pollution` endpoint) using coordinates from the queried city.
> Update `src/services/weatherService.js` to fetch current air pollution.
> In `src/context/WeatherContext.jsx`, pull the AQI rating (1-5) and specific pollutants (`pm2_5`, `no2`, `o3`).
> Create a new card under the 'Additional Conditions' section in `Home.jsx` showing the AQI level, accompanied by a descriptive label (Good, Fair, Moderate, Poor, Very Poor) and a color-coded dot indicator."

---

## 2. Refactoring & Upgrades

### Prompt: Migrating mock data to local JSON files
> "Currently, high-fidelity mock weather data is hardcoded inside `src/services/weatherService.js`.
> Refactor this by moving mock current and forecast payloads to separate JSON files inside `public/mock/`.
> Update `weatherService.js` to fetch these files locally via `axios` or standard `fetch` when the app is in Demo Mode.
> This makes the services layer cleaner and separates code from static test assets."

---

## 3. Styling & Animations

### Prompt: Implementing Animated Weather SVGs
> "We want to replace the standard PNG weather icons from `https://openweathermap.org/img/wn/` with custom animated SVGs that react dynamically to the weather state.
> Create a mapping utility `src/utils/weatherIconMapper.js` that maps OpenWeather icon codes (e.g. `01d`, `02n`, `09d`) to inline React SVG components.
> Add subtle CSS animations (clouds shifting, sun rays rotating, rain lines falling) inside `src/components/CurrentWeather/CurrentWeather.css` and reference the SVGs instead."
