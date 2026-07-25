import React from 'react';
import { Cloud, Eye, Wind, Compass, Droplets, History, Trash2, CloudLightning } from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';
import SearchBar from '../../components/SearchBar/SearchBar';
import CurrentWeather from '../../components/CurrentWeather/CurrentWeather';
import Forecast from '../../components/Forecast/Forecast';
import WeatherCard from '../../components/WeatherCard/WeatherCard';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import './Home.css';

const Home = () => {
  const {
    weatherData,
    loading,
    error,
    recentSearches,
    searchCity,
    clearHistory,
    refetch,
    units
  } = useWeather();

  const handleRecentSearchClick = (city) => {
    searchCity(city);
  };

  const getWindDirectionName = (degree) => {
    const directions = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest'];
    const index = Math.round(((degree % 360) / 45)) % 8;
    return directions[index];
  };

  return (
    <div className="home-page-container">
      {/* Search Header Section */}
      <section className="search-section-header">
        <SearchBar placeholder="Search city (e.g. New York, Paris)..." />
      </section>

      {/* Main Dashboard Layout */}
      {loading ? (
        <Loading />
      ) : error ? (
        <Error message={error} onRetry={refetch} />
      ) : weatherData ? (
        <div className="dashboard-layout">
          {/* Main Weather Content */}
          <main className="main-weather-content">
            <CurrentWeather />

            {/* Additional Metrics Grid */}
            <div className="additional-metrics-section">
              <h2 className="metrics-title">Additional Conditions</h2>
              <div className="metrics-grid">
                <WeatherCard
                  title="Cloudiness"
                  value={`${weatherData.clouds.all}%`}
                  icon={Cloud}
                  description={
                    weatherData.clouds.all > 80 ? 'Overcast skies' : 
                    weatherData.clouds.all > 50 ? 'Partly cloudy' : 
                    weatherData.clouds.all > 20 ? 'Scattered clouds' : 'Mostly clear'
                  }
                />
                <WeatherCard
                  title="Visibility"
                  value={
                    units === 'metric' 
                      ? `${(weatherData.visibility / 1000).toFixed(1)} km` 
                      : `${(weatherData.visibility * 0.000621371).toFixed(1)} mi`
                  }
                  icon={Eye}
                  description={
                    weatherData.visibility > 8000 ? 'Excellent visibility' : 
                    weatherData.visibility > 4000 ? 'Moderate haze' : 'Poor visibility'
                  }
                />
                <WeatherCard
                  title="Wind Direction"
                  value={`${weatherData.wind.deg}°`}
                  icon={Wind}
                  description={`Blowing ${getWindDirectionName(weatherData.wind.deg)}`}
                />
                <WeatherCard
                  title="Atmospheric Pressure"
                  value={`${weatherData.main.pressure} hPa`}
                  icon={Compass}
                  description={
                    weatherData.main.pressure > 1013 ? 'High pressure area' : 
                    weatherData.main.pressure < 1009 ? 'Low pressure system' : 'Normal pressure'
                  }
                />
                <WeatherCard
                  title="Relative Humidity"
                  value={`${weatherData.main.humidity}%`}
                  icon={Droplets}
                  description={
                    weatherData.main.humidity > 70 ? 'High humidity (sticky)' : 
                    weatherData.main.humidity < 30 ? 'Dry air environment' : 'Comfortable air quality'
                  }
                />
                <WeatherCard
                  title="Wind Gusts"
                  value={
                    weatherData.wind.gust 
                      ? `${weatherData.wind.gust} ${units === 'metric' ? 'm/s' : 'mph'}`
                      : '0.0'
                  }
                  icon={CloudLightning}
                  description={weatherData.wind.gust ? 'Gusty winds detected' : 'Calm, steady air'}
                />
              </div>
            </div>

            <Forecast />
          </main>

          {/* Sidebar Section: Search History */}
          <aside className="sidebar-history-content">
            <div className="sidebar-card glass-panel">
              <div className="sidebar-header">
                <History size={16} className="sidebar-icon" />
                <h3>Recent Searches</h3>
              </div>
              
              {recentSearches.length > 0 ? (
                <>
                  <ul className="history-list">
                    {recentSearches.map((city, idx) => (
                      <li key={idx} className="history-item">
                        <button
                          onClick={() => handleRecentSearchClick(city)}
                          className="history-city-btn"
                          aria-label={`Search for ${city} again`}
                        >
                          {city}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={clearHistory}
                    className="clear-history-btn"
                    aria-label="Clear all recent searches"
                  >
                    <Trash2 size={12} />
                    <span>Clear History</span>
                  </button>
                </>
              ) : (
                <p className="no-history-text">No recent searches found.</p>
              )}
            </div>
          </aside>
        </div>
      ) : (
        <div className="empty-dashboard glass-panel">
          <p>Please enter a city to view weather details.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
