import React from 'react';
import './WeatherCard.css';

const WeatherCard = ({ title, value, icon: Icon, description }) => {
  return (
    <div className="weather-metric-card glass-panel glass-panel-hover" tabIndex={0}>
      <div className="metric-header">
        <span className="metric-title">{title}</span>
        {Icon && <Icon className="metric-icon" size={18} />}
      </div>
      <div className="metric-content">
        <span className="metric-value">{value}</span>
        {description && <p className="metric-desc">{description}</p>}
      </div>
    </div>
  );
};

export default WeatherCard;
