import React, { useState, useEffect } from 'react';
import { Settings, Info, Save, Trash2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';
import './About.css';

const About = () => {
  const { refetch, isMock } = useWeather();
  const [apiKey, setApiKey] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('user-weather-api-key') || '';
    setApiKey(savedKey);
  }, []);

  const handleSaveKey = (e) => {
    e.preventDefault();
    const trimmed = apiKey.trim();
    if (trimmed) {
      localStorage.setItem('user-weather-api-key', trimmed);
    } else {
      localStorage.removeItem('user-weather-api-key');
    }
    
    setSaveSuccess(true);
    refetch(); // Refetch with the new key!
    
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  const handleClearKey = () => {
    localStorage.removeItem('user-weather-api-key');
    setApiKey('');
    setSaveSuccess(true);
    refetch();
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  return (
    <div className="about-page-container">
      {/* Title Header */}
      <div className="about-header">
        <Info className="about-title-icon" size={24} />
        <h1 className="about-title">About & Settings</h1>
      </div>

      <div className="about-layout">
        {/* Settings Column */}
        <section className="settings-section glass-panel">
          <div className="section-header">
            <Settings className="section-icon" size={18} />
            <h2>API Configuration</h2>
          </div>
          <p className="settings-text">
            To view live weather information, you can provide an OpenWeather API key. If left blank, SkyFlow automatically runs in <strong>Demo Mode</strong>, serving realistic mock weather forecasts.
          </p>

          <form onSubmit={handleSaveKey} className="api-form">
            <div className="input-group">
              <label htmlFor="apiKeyInput" className="key-label">OpenWeather API Key</label>
              <input
                id="apiKeyInput"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your api key (e.g. 5e12...)"
                className="key-input"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="save-key-btn">
                <Save size={16} />
                <span>Save Key</span>
              </button>
              
              {apiKey && (
                <button type="button" onClick={handleClearKey} className="clear-key-btn">
                  <Trash2 size={16} />
                  <span>Remove Key</span>
                </button>
              )}
            </div>

            {saveSuccess && (
              <div className="success-banner">
                <CheckCircle2 size={14} className="success-banner-icon" />
                <span>API configuration saved and reloaded!</span>
              </div>
            )}
          </form>
          
          <div className="mode-status">
            <ShieldCheck size={16} className={isMock ? 'status-icon demo' : 'status-icon live'} />
            <span>
              Current Status: <strong>{isMock ? 'Demo Mode (Mock Data)' : 'Live Mode (Connected to OpenWeather)'}</strong>
            </span>
          </div>
        </section>

        {/* About App details Column */}
        <section className="info-section glass-panel">
          <div className="section-header">
            <Info className="section-icon" size={18} />
            <h2>About SkyFlow</h2>
          </div>
          <p className="app-desc">
            SkyFlow is a modern, high-performance Weather Dashboard built with professional-grade software patterns. It features beautiful glassmorphism gradients that adjust in real-time to match the weather state.
          </p>
          
          <div className="features-list-wrapper">
            <h3>Key Capabilities</h3>
            <ul className="features-list">
              <li>Responsive glassmorphic UI matching local weather conditions</li>
              <li>Persistent light/dark themes synchronized in Local Storage</li>
              <li>Toggle between Metric (°C, m/s) and Imperial (°F, mph) systems</li>
              <li>Quick GPS Geolocation matching nearby weather conditions</li>
              <li>Favorites section and search history lookup persisted locally</li>
              <li>Fallback Demo Mode serving high-fidelity simulated weather</li>
            </ul>
          </div>

          <div className="tech-stack-wrapper">
            <h3>Technologies Utilized</h3>
            <div className="tech-tags">
              <span className="tech-tag">React 19</span>
              <span className="tech-tag">Vite</span>
              <span className="tech-tag">React Router DOM</span>
              <span className="tech-tag">Axios</span>
              <span className="tech-tag">Lucide Icons</span>
              <span className="tech-tag">Modular CSS</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
