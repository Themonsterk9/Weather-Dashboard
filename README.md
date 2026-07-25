# SkyFlow — Premium Responsive Weather Dashboard

SkyFlow is a modern, feature-rich Weather Dashboard built using **React 19**, **Vite**, **JavaScript**, **React Router DOM**, and **Axios**. It relies entirely on **Vanilla CSS** for its custom layout, providing clean glassmorphism visuals, weather-dependent gradients, and smooth micro-animations.

The dashboard runs in two modes:
1. **Live Mode**: Fetches live data from the OpenWeather API (current conditions and 5-day forecast) using an API key loaded from environment variables or supplied dynamically in the UI.
2. **Demo Mode (Fallback)**: Runs seamlessly using high-fidelity mock data if no API key is present, preventing crashes and allowing instant evaluation of all UI components.

---

## 🌟 Key Features

* **Dynamic Gradients**: The background theme adjusts in real-time to match the queried city's local conditions (Clear, Clouds, Rain, Snow, Thunderstorm).
* **Hour-adjusted Local Times**: Properly calculates and formats dates and times to reflect the local clock of the city being viewed rather than the client's timezone.
* **Dual Units System**: Simple toggle between Metric (°C, m/s) and Imperial (°F, mph) settings.
* **GPS Geolocation**: Click-to-detect coordinates and pull weather for your current physical location.
* **Favorites Directory**: Save cities to local storage with automated, live-updating preview badges.
* **Recent Queries**: Persistent search history for quick recall.
* **Full Accessibility**: Built using semantic HTML, structured headings, explicit ARIA labels, alt text, and outline focus rings.
* **Fully Responsive**: Fluid reflow design optimized for Desktop, Tablet, Mobile, and Landscape viewports.

---

## 🛠️ Technology Stack

* **Core**: React 19, JavaScript (ES6+), Vite (Build Tool)
* **Routing**: React Router DOM (v7)
* **HTTP Client**: Axios (with centralized request layer)
* **Icons**: Lucide React
* **Styling**: Vanilla CSS (CSS variables, flexbox, grid, glassmorphism)

---

## 📂 Project Structure

```text
weather-dashboard/
├── dist/                     # Compiled production build
├── public/                   # Static assets (favicons)
├── src/
│   ├── assets/               # Images and icon assets
│   ├── components/
│   │   ├── CurrentWeather/   # Main conditions details panel
│   │   ├── Error/            # Offline & api-error boundary
│   │   ├── FavoriteCard/     # Saved city live preview card
│   │   ├── Footer/           # Footer layout
│   │   ├── Forecast/         # 5-day daily forecast grid
│   │   ├── Loading/          # Pulse shimmering skeleton loaders
│   │   ├── Navbar/           # Sticky glass navigation & settings
│   │   ├── SearchBar/        # Validation & geolocation input
│   │   ├── ThemeToggle/      # Dark/light persistence switch
│   │   └── WeatherCard/      # Generic metric detail displayer
│   ├── context/
│   │   ├── ThemeContext.jsx  # Global theme provider
│   │   └── WeatherContext.jsx# Search history, favorites, units & fetches
│   ├── pages/
│   │   ├── About/            # Settings, tech stack, API key storage
│   │   ├── Favorites/        # Saved cities list grid
│   │   └── Home/             # Primary weather dashboard container
│   ├── services/
│   │   └── weatherService.js # Axios instance & high fidelity mock data
│   ├── utils/
│   │   └── dateUtils.js      # Timezone-aware date calculators
│   ├── App.jsx               # Routing & providers configuration
│   ├── index.css             # CSS tokens, globals & scrollbars
│   └── main.jsx              # React mounting entrypoint
├── .env                      # API Configuration
├── .env.example              # Env template file
├── AI_ASSISTANCE.md          # Development support logs
├── AI_PROMPTS.md             # Re-generative prompting guidelines
├── MANUAL_IMPROVEMENTS.md    # Recommended code extensions
└── README.md                 # Project instruction manual
```

---

## 🚀 Installation & Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/weather-dashboard.git
   cd weather-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory (or copy `.env.example`):
   ```bash
   VITE_OPENWEATHER_API_KEY=your_openweathermap_api_key
   ```
   *Note: If you leave this key blank, the application will launch in **Demo Mode** using high-fidelity simulations.*

4. **Launch the development server**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

5. **Build for production**
   ```bash
   npm run build
   ```

---

## 🌎 Deployment

### Deploying to Vercel

The project is fully prepped for zero-config Vercel deployment:
1. Push your code to a GitHub repository.
2. Link the repository to your Vercel Dashboard.
3. Add your OpenWeather API key to the environment variables as `VITE_OPENWEATHER_API_KEY` (optional).
4. Deploy!

---

## 🔮 Future Enhancements & Roadmap

* **Animated SVGs**: Replace static API images with weather-reactive vector animations (e.g. clouds drifting, raindrops falling).
* **Air Quality Index (AQI)**: Integrate the OpenWeather Pollution API to show local air pollutant levels.
* **Hourly Weather Charts**: Render a responsive Canvas-based temperature and precipitation chart for the next 24 hours.
