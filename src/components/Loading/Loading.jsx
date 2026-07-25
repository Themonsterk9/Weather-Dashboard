import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <div className="skeleton-container" aria-hidden="true">
      <div className="skeleton-grid">
        {/* Current Weather Card Skeleton */}
        <div className="skeleton-card skeleton-main-card glass-panel">
          <div className="skeleton-shimmer"></div>
          <div className="skeleton-line skeleton-header"></div>
          <div className="skeleton-row">
            <div className="skeleton-circle"></div>
            <div className="skeleton-line skeleton-temp"></div>
          </div>
          <div className="skeleton-line skeleton-medium"></div>
          <div className="skeleton-line skeleton-short"></div>
        </div>

        {/* Weather Details Grid Skeleton */}
        <div className="skeleton-details-grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="skeleton-card skeleton-detail-card glass-panel">
              <div className="skeleton-shimmer"></div>
              <div className="skeleton-line skeleton-short"></div>
              <div className="skeleton-line skeleton-medium"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Forecast Section Skeleton */}
      <div className="skeleton-forecast-section glass-panel">
        <div className="skeleton-shimmer"></div>
        <div className="skeleton-line skeleton-medium" style={{ margin: '10px 0 20px 0' }}></div>
        <div className="skeleton-forecast-grid">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="skeleton-card skeleton-forecast-card">
              <div className="skeleton-line skeleton-short"></div>
              <div className="skeleton-circle" style={{ width: '40px', height: '40px', margin: '8px auto' }}></div>
              <div className="skeleton-line skeleton-short"></div>
              <div className="skeleton-line skeleton-short"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
