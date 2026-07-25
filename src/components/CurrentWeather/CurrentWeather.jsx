import React from 'react';
import { Star, Heart, Thermometer, Wind, Droplets, Compass, Eye, Sunrise, Sunset, Calendar, Clock } from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';
import { formatTime, formatDate } from '../../utils/dateUtils';
import './CurrentWeather.css';

const CurrentWeather = () => {
  const { weatherData, favorites, addFavorite, removeFavorite, units } = useWeather();

  if (!weatherData) return null;

  const {
    name,
    sys: { country, sunrise, sunset },
    main: { temp, feels_like, temp_min, temp_max, humidity, pressure },
    wind: { speed, deg },
    visibility,
    weather,
    dt,
    timezone
  } = weatherData;

  const weatherDetails = weather[0];
  const isFavorite = favorites.some((fav) => fav.toLowerCase() === name.toLowerCase());

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFavorite(name);
    } else {
      addFavorite(name);
    }
  };

  // Determine weather theme gradient class based on OpenWeather weather ID
  const getWeatherThemeClass = (id) => {
    if (id >= 200 && id < 300) return 'grad-storm'; // Thunderstorm
    if (id >= 300 && id < 600) return 'grad-rain';  // Drizzle/Rain
    if (id >= 600 && id < 700) return 'grad-snow';  // Snow
    if (id === 800) return 'grad-clear';            // Clear
    return 'grad-clouds';                           // Clouds/Atmosphere (mist, fog, etc.)
  };

  const speedUnit = units === 'metric' ? 'm/s' : 'mph';
  const tempUnit = units === 'metric' ? '°C' : '°F';
  const themeClass = getWeatherThemeClass(weatherDetails.id);

  // Capitalize description
  const description = weatherDetails.description.charAt(0).toUpperCase() + weatherDetails.description.slice(1);

  // Parse visibility to km or miles
  const formattedVisibility = units === 'metric' 
    ? `${(visibility / 1000).toFixed(1)} km` 
    : `${(visibility * 0.000621371).toFixed(1)} mi`;

  // Get wind direction cardinal name
  const getWindDirection = (degree) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(((degree % 360) / 22.5)) % 16;
    return directions[index];
  };

  return (
    <div className={`current-weather-card glass-panel ${themeClass}`}>
      {/* Card Header: City, Country, Date, Favorite Btn */}
      <div className="card-header">
        <div className="location-info">
          <h1 className="city-title">{name}, <span className="country-code">{country}</span></h1>
          <div className="date-time-info">
            <span className="info-item"><Calendar size={14} className="small-icon" /> {formatDate(dt, timezone)}</span>
            <span className="info-separator">•</span>
            <span className="info-item"><Clock size={14} className="small-icon" /> Local Time: {formatTime(dt, timezone)}</span>
          </div>
        </div>
        
        <button
          onClick={handleFavoriteToggle}
          className={`favorite-toggle-btn ${isFavorite ? 'is-fav' : ''}`}
          aria-label={isFavorite ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className="heart-icon" size={22} fill={isFavorite ? 'currentColor' : 'transparent'} />
        </button>
      </div>

      {/* Main Temperature & Weather Icon Display */}
      <div className="main-display">
        <div className="temp-section">
          <span className="current-temp">{Math.round(temp)}{tempUnit}</span>
          <div className="temp-range">
            <span className="temp-high">H: {Math.round(temp_max)}°</span>
            <span className="temp-low">L: {Math.round(temp_min)}°</span>
          </div>
        </div>

        <div className="weather-visual">
          <img
            src={`https://openweathermap.org/img/wn/${weatherDetails.icon}@4x.png`}
            alt={description}
            className="weather-img"
            loading="eager"
          />
          <span className="weather-desc">{description}</span>
        </div>
      </div>

      {/* Grid containing secondary weather parameters */}
      <div className="secondary-grid">
        <div className="sec-item">
          <Thermometer className="sec-icon" size={18} />
          <div className="sec-details">
            <span className="sec-label">Feels Like</span>
            <span className="sec-value">{Math.round(feels_like)}{tempUnit}</span>
          </div>
        </div>

        <div className="sec-item">
          <Wind className="sec-icon" size={18} />
          <div className="sec-details">
            <span className="sec-label">Wind</span>
            <span className="sec-value">
              {speed} {speedUnit} {getWindDirection(deg)}
            </span>
          </div>
        </div>

        <div className="sec-item">
          <Droplets className="sec-icon" size={18} />
          <div className="sec-details">
            <span className="sec-label">Humidity</span>
            <span className="sec-value">{humidity}%</span>
          </div>
        </div>

        <div className="sec-item">
          <Compass className="sec-icon" size={18} />
          <div className="sec-details">
            <span className="sec-label">Pressure</span>
            <span className="sec-value">{pressure} hPa</span>
          </div>
        </div>

        <div className="sec-item">
          <Eye className="sec-icon" size={18} />
          <div className="sec-details">
            <span className="sec-label">Visibility</span>
            <span className="sec-value">{formattedVisibility}</span>
          </div>
        </div>

        <div className="sec-item">
          <div className="sun-hours">
            <div className="sun-timing">
              <Sunrise className="sun-icon sunrise" size={16} />
              <span>{formatTime(sunrise, timezone)}</span>
            </div>
            <div className="sun-timing">
              <Sunset className="sun-icon sunset" size={16} />
              <span>{formatTime(sunset, timezone)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
