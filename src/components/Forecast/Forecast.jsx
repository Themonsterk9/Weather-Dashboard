import React from 'react';
import { CloudRain, Sun, Calendar } from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';
import { formatDayNameShort, formatDate } from '../../utils/dateUtils';
import './Forecast.css';

const Forecast = () => {
  const { forecastData, units } = useWeather();

  if (!forecastData || !forecastData.list) return null;

  const timezoneOffset = forecastData.city.timezone;
  const tempUnit = units === 'metric' ? '°' : '°';

  // Group 3-hour forecasts by day and extract min/max and mid-day weather
  const getDailyForecasts = (list, offset) => {
    const dailyData = {};

    list.forEach((item) => {
      const date = new Date((item.dt + offset) * 1000);
      const dateKey = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`;

      if (!dailyData[dateKey]) {
        dailyData[dateKey] = {
          dt: item.dt,
          temps: [],
          weathers: [],
          pop: []
        };
      }

      dailyData[dateKey].temps.push(item.main.temp);
      dailyData[dateKey].weathers.push({
        hour: date.getUTCHours(),
        weather: item.weather[0]
      });
      if (item.pop !== undefined) dailyData[dateKey].pop.push(item.pop);
    });

    const dailyArray = Object.values(dailyData).sort((a, b) => a.dt - b.dt);

    // If the first day is almost over (e.g. only 1 or 2 data points left),
    // we can still display it or shift to make sure we show a proper 5-day forecast.
    // Let's filter to show exactly 5 days.
    const result = dailyArray.map((day) => {
      const minTemp = Math.min(...day.temps);
      const maxTemp = Math.max(...day.temps);
      
      // Select weather closest to 12:00 (mid-day)
      let selectedWeather = day.weathers[0].weather;
      let minHourDiff = 24;
      day.weathers.forEach((w) => {
        const diff = Math.abs(w.hour - 12);
        if (diff < minHourDiff) {
          minHourDiff = diff;
          selectedWeather = w.weather;
        }
      });

      const maxPop = Math.max(...day.pop, 0);

      return {
        dt: day.dt,
        minTemp,
        maxTemp,
        weather: selectedWeather,
        pop: Math.round(maxPop * 100)
      };
    });

    // Return the next 5 days (excluding today if today's records are minimal, or just return first 5)
    // To ensure consistency, we slice to 5 items.
    return result.slice(0, 5);
  };

  const dailyForecasts = getDailyForecasts(forecastData.list, timezoneOffset);

  return (
    <section className="forecast-section glass-panel">
      <div className="forecast-header">
        <Calendar size={18} className="header-icon" />
        <h2 className="forecast-title">5-Day Forecast</h2>
      </div>

      <div className="forecast-grid">
        {dailyForecasts.map((day, index) => {
          const dayName = index === 0 ? 'Today' : formatDayNameShort(day.dt, timezoneOffset);
          const desc = day.weather.description.charAt(0).toUpperCase() + day.weather.description.slice(1);
          
          return (
            <div key={day.dt} className="forecast-card glass-panel-hover" tabIndex={0}>
              <span className="forecast-day">{dayName}</span>
              <span className="forecast-date">{formatDate(day.dt, timezoneOffset).split(',')[1].trim()}</span>
              
              <div className="forecast-icon-wrapper">
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`}
                  alt={desc}
                  className="forecast-icon"
                  loading="lazy"
                />
              </div>

              <span className="forecast-desc">{day.weather.main}</span>

              {day.pop > 15 && (
                <div className="forecast-precip" title="Chance of precipitation">
                  <CloudRain size={12} className="precip-icon" />
                  <span>{day.pop}%</span>
                </div>
              )}

              <div className="forecast-temps">
                <span className="temp-max">{Math.round(day.maxTemp)}{tempUnit}</span>
                <span className="temp-min">{Math.round(day.minTemp)}{tempUnit}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Forecast;
