import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, User, MessageCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const logoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/3745b4bf-d381-4a30-91b2-d9dd21fe5c4a/cb2d496d6d7eb2c7ca7218551ffb0dbd.png";

  const handleNavClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const navItems = [
    { path: '/', label: 'Inicio' },
    { path: '/search', label: 'Buscar' },
    { path: '/rental', label: 'Alquilar' },
    { path: '/sell', label: 'Vender' }
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 glass-effect-header"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <img src={logoUrl} alt="Wheel Deal Logo" className="h-8 object-contain" />
              <span className="text-xl font-bold text-primary hidden sm:inline">Wheel Deal</span>
            </motion.div>

            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.path}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-foreground/80 hover:text-primary transition-colors font-medium"
                  onClick={() => handleNavClick(item.path)}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>

            <div className="hidden md:flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground/80 hover:text-primary hover:bg-accent"
                onClick={() => navigate('/profile', { state: { activeTab: 'favorites' } })}
              >
                <Star className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground/80 hover:text-primary hover:bg-accent"
                onClick={() => navigate('/chat')}
              >
                <MessageCircle className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground/80 hover:text-primary hover:bg-accent"
                onClick={() => navigate('/profile')}
              >
                <User className="w-5 h-5" />
              </Button>
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => navigate('/sell')}
              >
                Vender Ahora
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>

          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border py-4"
            >
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.path}
                    className="text-foreground/80 hover:text-primary transition-colors font-medium text-left"
                    onClick={() => handleNavClick(item.path)}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="flex items-center space-x-4 pt-4 border-t border-border">
                   <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => navigate('/profile')}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Mi Perfil
                  </Button>
                  <Button
                    size="sm"
                    className="w-full bg-primary text-primary-foreground"
                    onClick={() => navigate('/sell')}
                  >
                    Vender Ahora
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </div>
      </motion.header>
    </>
  );
};

export default Header;