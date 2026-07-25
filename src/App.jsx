import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { WeatherProvider } from './context/WeatherContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Favorites from './pages/Favorites/Favorites';
import About from './pages/About/About';

function App() {
  return (
    <ThemeProvider>
      <WeatherProvider>
        <Router>
          <div className="app-wrapper">
            <Navbar />
            <main className="main-content-layout">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </WeatherProvider>
    </ThemeProvider>
  );
}

export default App;
