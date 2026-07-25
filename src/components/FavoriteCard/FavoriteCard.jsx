import React, { useState, useEffect } from 'react';
import { Trash2, Loader2, ArrowRight } from 'lucide-react';
import weatherService from '../../services/weatherService';
import { useWeather } from '../../context/WeatherContext';
import './FavoriteCard.css';

const FavoriteCard = ({ cityName, onClick }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { removeFavorite, units } = useWeather();

  useEffect(() => {
    let isMounted = true;
    
    const fetchFavoriteWeather = async () => {
      try {
        setLoading(true);
        setError(false);
        const result = await weatherService.getCurrentWeather(cityName, units);
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        console.error('Error loading favorite weather for', cityName, err);
        if (isMounted) {
          setError(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchFavoriteWeather();
    
    return () => {
      isMounted = false;
    };
  }, [cityName, units]);

  const handleDelete = (e) => {
    e.stopPropagation(); // Avoid triggering card click
    removeFavorite(cityName);
  };

  const getThemeClass = (id) => {
    if (!id) return '';
    if (id >= 200 && id < 300) return 'fav-storm';
    if (id >= 300 && id < 600) return 'fav-rain';
    if (id >= 600 && id < 700) return 'fav-snow';
    if (id === 800) return 'fav-clear';
    return 'fav-clouds';
  };

  if (loading) {
    return (
      <div className="favorite-card loading glass-panel">
        <Loader2 className="spinner" size={20} />
        <span>Loading {cityName}...</span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="favorite-card error glass-panel">
        <div className="error-info">
          <span className="error-city">{cityName}</span>
          <span className="error-text">Failed to load</span>
        </div>
        <button className="delete-btn" onClick={handleDelete} aria-label="Remove from favorites">
          <Trash2 size={16} />
        </button>
      </div>
    );
  }

  const { name, sys: { country }, main: { temp }, weather } = data;
  const weatherDetails = weather[0];
  const themeClass = getThemeClass(weatherDetails.id);
  const tempUnit = units === 'metric' ? '°C' : '°F';

  return (
    <div 
      className={`favorite-card glass-panel glass-panel-hover ${themeClass}`}
      onClick={() => onClick(name)}
      role="button"
      tabIndex={0}
      aria-label={`View weather for ${name}, ${country}. Temperature is ${Math.round(temp)} degrees.`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(name);
        }
      }}
    >
      <div className="fav-header">
        <div>
          <h3 className="fav-city">{name}</h3>
          <span className="fav-country">{country}</span>
        </div>
        <button 
          className="delete-btn" 
          onClick={handleDelete} 
          aria-label={`Remove ${name} from favorites`}
          title="Remove from favorites"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="fav-body">
        <div className="fav-temp-section">
          <span className="fav-temp">{Math.round(temp)}{tempUnit}</span>
          <span className="fav-desc">{weatherDetails.main}</span>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${weatherDetails.icon}@2x.png`}
          alt={weatherDetails.description}
          className="fav-icon"
          loading="lazy"
        />
      </div>

      <div className="fav-footer">
        <span>View Details</span>
        <ArrowRight size={14} className="arrow-icon" />
      </div>
    </div>
  );
};

export default FavoriteCard;
