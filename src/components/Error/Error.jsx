import React from 'react';
import { AlertCircle, WifiOff, RefreshCw } from 'lucide-react';
import './Error.css';

const Error = ({ message, onRetry }) => {
  const isOffline = !navigator.onLine || (message && message.toLowerCase().includes('offline'));

  return (
    <div className="error-panel glass-panel" role="alert">
      <div className="error-icon-container">
        {isOffline ? (
          <WifiOff className="error-icon offline-icon" size={48} />
        ) : (
          <AlertCircle className="error-icon generic-error-icon" size={48} />
        )}
      </div>
      <h2 className="error-title">
        {isOffline ? 'Connection Interrupted' : 'Oops! Something went wrong'}
      </h2>
      <p className="error-message">{message || 'An error occurred while loading weather data.'}</p>
      
      {onRetry && (
        <button className="retry-btn" onClick={onRetry}>
          <RefreshCw className="retry-icon" size={16} />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};

export default Error;
