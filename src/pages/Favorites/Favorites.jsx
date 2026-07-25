import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Plus } from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';
import FavoriteCard from '../../components/FavoriteCard/FavoriteCard';
import './Favorites.css';

const Favorites = () => {
  const { favorites, searchCity } = useWeather();
  const navigate = useNavigate();

  const handleFavoriteClick = (city) => {
    searchCity(city);
    navigate('/'); // Go back to Dashboard home
  };

  return (
    <div className="favorites-page-container">
      <div className="favorites-header">
        <Star className="fav-title-icon" size={24} fill="currentColor" />
        <h1 className="fav-title">My Saved Locations</h1>
      </div>

      {favorites.length > 0 ? (
        <div className="favorites-grid">
          {favorites.map((cityName) => (
            <FavoriteCard
              key={cityName}
              cityName={cityName}
              onClick={handleFavoriteClick}
            />
          ))}
        </div>
      ) : (
        <div className="favorites-empty-state glass-panel">
          <div className="empty-icon-wrapper">
            <Star className="empty-star" size={40} />
          </div>
          <h2>No Saved Locations</h2>
          <p>
            Keep track of weather in your favorite cities by clicking the heart button on the weather dashboard.
          </p>
          <button onClick={() => navigate('/')} className="add-city-cta">
            <Plus size={16} />
            <span>Search Cities</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Favorites;
