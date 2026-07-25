# Recommended Manual Improvements — Weather Dashboard

This file contains suggested manual enhancements to further extend and customize the SkyFlow Weather Dashboard.

---

## 🔑 1. Setup Live OpenWeather API Key

To transition the dashboard from **Demo Mode** to **Live Mode**:
1. Sign up for a free account at [OpenWeatherMap](https://openweathermap.org/).
2. Navigate to your API keys section and copy your key.
3. Paste the key inside your `.env` file:
   ```bash
   VITE_OPENWEATHER_API_KEY=your_key_here
   ```
4. Alternatively, open the **About & Settings** page in the running web application, paste the key into the input field, and click **Save Key** to store it in your browser storage.

---

## 📴 2. Progressive Web App (PWA) Offline Support

To allow SkyFlow to run fully offline without an internet connection:
* Add a Service Worker (`sw.js`) that caches static assets (JS, CSS, index.html, and the weather icons).
* Install `vite-plugin-pwa` to automate register/service-worker setup:
  ```bash
  npm install vite-plugin-pwa -D
  ```
* Configure the plugin inside `vite.config.js` to enable web manifests, icons, and offline caching.

---

## 🎨 3. Enhanced Graphical Icons

While the default OpenWeather icons are functional, you can manually replace them with premium animated packs:
* Map each weather condition code to the [Meteocons Animated SVG Pack](https://bas.dev/work/meteocons).
* Import the SVGs as inline React components to make the dashboard feel incredibly responsive and dynamic.

---

## 🧪 4. End-to-End Testing

To test interactions (search queries, toggle metrics, adding favorites) automatically:
* Install **Cypress** or **Playwright**:
  ```bash
  npm install @playwright/test -D
  ```
* Create a test file `tests/weather.spec.js` checking that the dashboard accurately responds to queries and preserves favorites in local storage across mock and live requests.
