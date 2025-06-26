import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('all');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      searchTerm,
      location,
      category
    });
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="glass-effect rounded-2xl p-6 search-glow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="¿Qué moto buscas?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Ubicación"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
            >
              <option value="all" className="bg-popover text-popover-foreground">Todas</option>
              <option value="deportiva" className="bg-popover text-popover-foreground">Deportiva</option>
              <option value="naked" className="bg-popover text-popover-foreground">Naked</option>
              <option value="touring" className="bg-popover text-popover-foreground">Touring</option>
              <option value="scooter" className="bg-popover text-popover-foreground">Scooter</option>
              <option value="cruiser" className="bg-popover text-popover-foreground">Cruiser</option>
            </select>
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Button
            type="submit"
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg font-semibold"
          >
            <Search className="w-5 h-5 mr-2" />
            Buscar Motos
          </Button>
          
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="px-6"
            >
              Alquilar
            </Button>
            <Button
              type="button"
              variant="outline"
              className="px-6"
            >
              Comprar
            </Button>
          </div>
        </div>
      </div>
    </motion.form>
  );
};

export default SearchBar;