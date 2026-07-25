/**
 * Formats a Unix timestamp with timezone offset to city-local time string (e.g. "10:24 AM")
 */
export const formatTime = (unixTime, timezoneOffset = 0) => {
  if (unixTime === undefined || unixTime === null) return '';
  const date = new Date((unixTime + timezoneOffset) * 1000);
  
  let hours = date.getUTCHours();
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  
  return `${hours}:${minutes} ${ampm}`;
};

/**
 * Formats a Unix timestamp with timezone offset to city-local full date (e.g. "Sunday, Jul 26")
 */
export const formatDate = (unixTime, timezoneOffset = 0) => {
  if (unixTime === undefined || unixTime === null) return '';
  const date = new Date((unixTime + timezoneOffset) * 1000);
  
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const dayName = days[date.getUTCDay()];
  const monthName = months[date.getUTCMonth()];
  const dayOfMonth = date.getUTCDate();
  
  return `${dayName}, ${monthName} ${dayOfMonth}`;
};

/**
 * Formats a Unix timestamp with timezone offset to city-local day name (e.g. "Sunday" or "Monday")
 */
export const formatDayName = (unixTime, timezoneOffset = 0) => {
  if (unixTime === undefined || unixTime === null) return '';
  const date = new Date((unixTime + timezoneOffset) * 1000);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[date.getUTCDay()];
};

/**
 * Formats a Unix timestamp with timezone offset to city-local short day name (e.g. "Sun" or "Mon")
 */
export const formatDayNameShort = (unixTime, timezoneOffset = 0) => {
  if (unixTime === undefined || unixTime === null) return '';
  const date = new Date((unixTime + timezoneOffset) * 1000);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[date.getUTCDay()];
};
