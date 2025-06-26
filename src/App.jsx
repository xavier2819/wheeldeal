import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import HomePage from '@/pages/HomePage';
import SearchPage from '@/pages/SearchPage';
import ProfilePage from '@/pages/ProfilePage';
import BikeDetailsPage from '@/pages/BikeDetailsPage';
import ChatPage from '@/pages/ChatPage';
import RentalPage from '@/pages/RentalPage';
import SellPage from '@/pages/SellPage';
import { ThemeContext } from '@/contexts/ThemeContext';

function App() {
  const [theme, setTheme] = useState('light');

  const themeValue = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={themeValue}>
      <Helmet>
        <title>Wheel Deal - Tu Plataforma de Motos con IA</title>
        <meta name="description" content="Descubre, alquila y compra motos con la ayuda de inteligencia artificial. Wheel Deal conecta usuarios con proveedores confiables para una experiencia segura y personalizada." />
        <html className={theme} />
      </Helmet>
      <Router>
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/bike/:id" element={<BikeDetailsPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/rental" element={<RentalPage />} />
            <Route path="/sell" element={<SellPage />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;