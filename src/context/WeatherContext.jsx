import React, { createContext, useContext, useState, useEffect } from 'react';
import weatherService, { isMockMode } from '../services/weatherService';

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [units, setUnits] = useState(() => {
    return localStorage.getItem('weather-units') || 'metric';
  });

  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('weather-history');
    return saved ? JSON.parse(saved) : ['London', 'Tokyo', 'Sydney'];
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('weather-favorites');
    return saved ? JSON.parse(saved) : ['London', 'Tokyo'];
  });

  const [currentQuery, setCurrentQuery] = useState('London');

  // Trigger search on mount and whenever currentQuery or units change
  useEffect(() => {
    fetchWeather(currentQuery);
  }, [currentQuery, units]);

  // Persist history
  useEffect(() => {
    localStorage.setItem('weather-history', JSON.stringify(recentSearches));
  }, [recentSearches]);

  // Persist favorites
  useEffect(() => {
    localStorage.setItem('weather-favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Persist units
  useEffect(() => {
    localStorage.setItem('weather-units', units);
  }, [units]);

  const fetchWeather = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const curData = await weatherService.getCurrentWeather(query, units);
      const foreData = await weatherService.getForecast(query, units);
      
      setWeatherData(curData);
      setForecastData(foreData);
      
      // Add to recent searches if successfully fetched and is string
      if (typeof query === 'string' && query.trim() !== '') {
        const formattedCity = curData.name;
        addToHistory(formattedCity);
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 404) {
        setError('City not found. Please check the spelling and try again.');
      } else if (!navigator.onLine) {
        setError('You are offline. Please check your internet connection.');
      } else {
        setError('Failed to fetch weather data. Please check your API key or try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const addToHistory = (cityName) => {
    setRecentSearches((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== cityName.toLowerCase());
      return [cityName, ...filtered].slice(0, 8); // Keep last 8 searches
    });
  };

  const clearHistory = () => {
    setRecentSearches([]);
  };

  const addFavorite = (cityName) => {
    if (!favorites.some(fav => fav.toLowerCase() === cityName.toLowerCase())) {
      setFavorites(prev => [...prev, cityName]);
    }
  };

  const removeFavorite = (cityName) => {
    setFavorites(prev => prev.filter(fav => fav.toLowerCase() !== cityName.toLowerCase()));
  };

  const toggleUnits = () => {
    setUnits(prev => prev === 'metric' ? 'imperial' : 'metric');
  };

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        forecastData,
        loading,
        error,
        units,
        toggleUnits,
        recentSearches,
        favorites,
        addFavorite,
        removeFavorite,
        clearHistory,
        searchCity: setCurrentQuery,
        searchByCoords: (coords) => setCurrentQuery(coords),
        isMock: isMockMode(),
        refetch: () => fetchWeather(currentQuery)
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};
