import axios from 'axios';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Helper to get API key from Env or LocalStorage
export const getApiKey = () => {
  return import.meta.env.VITE_OPENWEATHER_API_KEY || localStorage.getItem('user-weather-api-key') || '';
};

// Check if we are running in Mock Mode
export const isMockMode = () => {
  return !getApiKey();
};

// Create Axios Instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

/**
 * Generate high fidelity mock current weather data
 */
const getMockCurrentWeather = (city = 'London') => {
  const cityName = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
  
  // Custom mock values depending on city name for variety
  let temp = 20;
  let humidity = 65;
  let windSpeed = 3.5;
  let pressure = 1012;
  let weatherId = 801;
  let mainWeather = 'Clouds';
  let desc = 'few clouds';
  let icon = '02d';
  let country = 'US';
  let lat = 40.7128;
  let lon = -74.0060;
  
  if (cityName.includes('London') || cityName.includes('Gb')) {
    temp = 15;
    humidity = 82;
    windSpeed = 5.2;
    pressure = 1008;
    weatherId = 500;
    mainWeather = 'Rain';
    desc = 'light rain';
    icon = '10d';
    country = 'GB';
    lat = 51.5074;
    lon = -0.1278;
  } else if (cityName.includes('Tokyo') || cityName.includes('Japan')) {
    temp = 26;
    humidity = 70;
    windSpeed = 2.1;
    pressure = 1015;
    weatherId = 800;
    mainWeather = 'Clear';
    desc = 'clear sky';
    icon = '01d';
    country = 'JP';
    lat = 35.6762;
    lon = 139.6503;
  } else if (cityName.includes('Sydney')) {
    temp = 18;
    humidity = 58;
    windSpeed = 6.4;
    pressure = 1018;
    weatherId = 803;
    mainWeather = 'Clouds';
    desc = 'broken clouds';
    icon = '04d';
    country = 'AU';
    lat = -33.8688;
    lon = 151.2093;
  } else if (cityName.includes('Cairo') || cityName.includes('Egypt') || cityName.includes('Sahara')) {
    temp = 38;
    humidity = 20;
    windSpeed = 4.0;
    pressure = 1010;
    weatherId = 800;
    mainWeather = 'Clear';
    desc = 'sunny and clear';
    icon = '01d';
    country = 'EG';
    lat = 30.0444;
    lon = 31.2357;
  } else if (cityName.includes('Reykjavik') || cityName.includes('Iceland') || cityName.includes('Snow')) {
    temp = -2;
    humidity = 90;
    windSpeed = 8.5;
    pressure = 998;
    weatherId = 601;
    mainWeather = 'Snow';
    desc = 'snow showers';
    icon = '13d';
    country = 'IS';
    lat = 64.1466;
    lon = -21.9426;
  }
  
  const now = Math.floor(Date.now() / 1000);
  
  return {
    coord: { lon, lat },
    weather: [{ id: weatherId, main: mainWeather, description: desc, icon }],
    main: {
      temp,
      feels_like: temp - 1.5,
      temp_min: temp - 4,
      temp_max: temp + 3,
      pressure,
      humidity,
      sea_level: pressure,
      grnd_level: pressure - 12
    },
    visibility: 10000,
    wind: { speed: windSpeed, deg: 210 },
    clouds: { all: 40 },
    dt: now,
    sys: {
      type: 1,
      id: 5621,
      country,
      sunrise: now - 14400, // 4 hours ago
      sunset: now + 28800 // 8 hours from now
    },
    timezone: 3600,
    id: 9999,
    name: cityName,
    cod: 200,
    isMock: true
  };
};

/**
 * Generate high fidelity 5-day forecast mock data
 */
const getMockForecast = (city = 'London') => {
  const current = getMockCurrentWeather(city);
  const list = [];
  const startDt = current.dt;
  const timezone = current.timezone;
  
  // Generate 40 items (5 days, 8 intervals of 3 hours per day)
  for (let i = 0; i < 40; i++) {
    const itemDt = startDt + (i * 3 * 3600); // add 3 hours each iteration
    const dateObj = new Date(itemDt * 1000);
    const dateStr = dateObj.toISOString().slice(0, 10);
    const timeStr = String(dateObj.getUTCHours()).padStart(2, '0') + ':00:00';
    
    // Add some temperature fluctuation throughout the day
    const hour = dateObj.getUTCHours();
    const tempOffset = -Math.cos((hour - 4) * Math.PI / 12) * 5; // coldest at 4am, warmest at 4pm
    const baseTemp = current.main.temp + (Math.sin(i / 8) * 2); // small multi-day variation
    const temp = Math.round((baseTemp + tempOffset) * 10) / 10;
    
    // Maintain some consistency with the general weather condition
    let weather = current.weather[0];
    if (i % 8 === 0 && Math.random() > 0.5) {
      // Occasional changes in weather
      const options = [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
        { id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' },
        { id: 803, main: 'Clouds', description: 'broken clouds', icon: '04d' },
        { id: 500, main: 'Rain', description: 'light rain', icon: '10d' }
      ];
      weather = options[Math.floor(Math.random() * options.length)];
    }
    
    list.push({
      dt: itemDt,
      main: {
        temp,
        feels_like: temp - 1,
        temp_min: temp - 2,
        temp_max: temp + 2,
        pressure: current.main.pressure,
        humidity: current.main.humidity,
        temp_kf: 0
      },
      weather: [{ ...weather, icon: hour >= 18 || hour < 6 ? weather.icon.replace('d', 'n') : weather.icon.replace('n', 'd') }],
      clouds: { all: current.clouds.all },
      wind: { speed: current.wind.speed, deg: current.wind.deg },
      visibility: current.visibility,
      pop: weather.main === 'Rain' ? 0.6 : 0,
      dt_txt: `${dateStr} ${timeStr}`
    });
  }
  
  return {
    cod: '200',
    message: 0,
    cnt: 40,
    list,
    city: {
      id: current.id,
      name: current.name,
      coord: current.coord,
      country: current.sys.country,
      population: 1000000,
      timezone,
      sunrise: current.sys.sunrise,
      sunset: current.sys.sunset
    },
    isMock: true
  };
};

/**
 * Weather Service Methods
 */
export const weatherService = {
  getCurrentWeather: async (query, units = 'metric') => {
    const apiKey = getApiKey();
    
    if (!apiKey) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return getMockCurrentWeather(typeof query === 'string' ? query : 'London');
    }

    try {
      const params = {
        appid: apiKey,
        units,
      };

      if (typeof query === 'string') {
        params.q = query;
      } else if (query && query.latitude && query.longitude) {
        params.lat = query.latitude;
        params.lon = query.longitude;
      } else {
        throw new Error('Invalid query format. Must be city name string or coordinate object.');
      }

      const response = await api.get('/weather', { params });
      return response.data;
    } catch (error) {
      console.error('API Error in getCurrentWeather:', error);
      throw error;
    }
  },

  getForecast: async (query, units = 'metric') => {
    const apiKey = getApiKey();

    if (!apiKey) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return getMockForecast(typeof query === 'string' ? query : 'London');
    }

    try {
      const params = {
        appid: apiKey,
        units,
      };

      if (typeof query === 'string') {
        params.q = query;
      } else if (query && query.latitude && query.longitude) {
        params.lat = query.latitude;
        params.lon = query.longitude;
      } else {
        throw new Error('Invalid query format. Must be city name string or coordinate object.');
      }

      const response = await api.get('/forecast', { params });
      return response.data;
    } catch (error) {
      console.error('API Error in getForecast:', error);
      throw error;
    }
  }
};
export default weatherService;
