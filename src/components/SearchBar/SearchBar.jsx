import React, { useState } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';
import './SearchBar.css';

const SearchBar = ({ placeholder = 'Search city...' }) => {
  const [query, setQuery] = useState('');
  const { searchCity, searchByCoords, loading } = useWeather();
  const [geoLoading, setGeoLoading] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      setValidationError('Please enter a city name.');
      return;
    }

    if (/[^a-zA-Z\s,.-]/.test(trimmedQuery)) {
      setValidationError('Please enter letters and spaces only.');
      return;
    }

    searchCity(trimmedQuery);
    setQuery('');
  };

  const handleGeolocate = () => {
    setValidationError('');
    if (!navigator.geolocation) {
      setValidationError('Geolocation is not supported by your browser.');
      return;
    }

    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        searchByCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setGeoLoading(false);
      },
      (error) => {
        console.error(error);
        setValidationError('Unable to retrieve location. Please search manually.');
        setGeoLoading(false);
      },
      { timeout: 8000 }
    );
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="input-wrapper">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (validationError) setValidationError('');
            }}
            placeholder={placeholder}
            className={`search-input ${validationError ? 'input-error' : ''}`}
            aria-label="Search city weather"
          />
          {validationError && <span className="error-tip" role="alert">{validationError}</span>}
        </div>
        <button
          type="submit"
          className="search-btn"
          disabled={loading || geoLoading}
          aria-label="Search"
        >
          {loading ? <Loader2 className="spinner" size={18} /> : 'Search'}
        </button>
        <button
          type="button"
          onClick={handleGeolocate}
          className="location-btn"
          disabled={loading || geoLoading}
          title="Detect Current Location"
          aria-label="Detect Current Location"
        >
          {geoLoading ? (
            <Loader2 className="spinner" size={18} />
          ) : (
            <MapPin size={18} />
          )}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
