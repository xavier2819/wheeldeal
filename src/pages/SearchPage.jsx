import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, SlidersHorizontal, MapPin, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import BikeCard from '@/components/BikeCard';
import SearchBar from '@/components/SearchBar';

const SearchPage = () => {
  const { toast } = useToast();
  const location = useLocation();
  const [bikes, setBikes] = useState([]);
  const [filteredBikes, setFilteredBikes] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    priceRange: [0, 10000],
    category: 'all',
    type: 'all',
    rating: 0
  });

  useEffect(() => {
    const mockBikes = [
      { id: 1, name: "Yamaha MT-07", price: 45, type: "rental", image: "Yamaha MT-07 deportiva azul en carretera", rating: 4.8, location: "Madrid Centro", category: "Deportiva" },
      { id: 2, name: "Honda CB650R", price: 8500, type: "sale", image: "Honda CB650R negra moderna en concesionario", rating: 4.9, location: "Barcelona", category: "Naked" },
      { id: 3, name: "Kawasaki Ninja 400", price: 35, type: "rental", image: "Kawasaki Ninja 400 verde deportiva", rating: 4.7, location: "Valencia", category: "Deportiva" },
      { id: 4, name: "BMW R1250GS", price: 15000, type: "sale", image: "BMW R1250GS adventure blanca", rating: 4.9, location: "Sevilla", category: "Touring" },
      { id: 5, name: "Vespa Primavera 150", price: 25, type: "rental", image: "Vespa Primavera 150 azul claro vintage", rating: 4.6, location: "Madrid", category: "Scooter" },
      { id: 6, name: "Harley Davidson Street 750", price: 12000, type: "sale", image: "Harley Davidson Street 750 negra cruiser", rating: 4.8, location: "Bilbao", category: "Cruiser" }
    ];
    setBikes(mockBikes);
    setFilteredBikes(mockBikes);
  }, []);

  const handleSearch = (searchData) => {
    let filtered = bikes;

    if (searchData.searchTerm) {
      filtered = filtered.filter(bike => 
        bike.name.toLowerCase().includes(searchData.searchTerm.toLowerCase()) ||
        bike.category.toLowerCase().includes(searchData.searchTerm.toLowerCase())
      );
    }

    if (searchData.location) {
      filtered = filtered.filter(bike => 
        bike.location.toLowerCase().includes(searchData.location.toLowerCase())
      );
    }

    if (searchData.category && searchData.category !== 'all') {
      filtered = filtered.filter(bike => 
        bike.category.toLowerCase() === searchData.category.toLowerCase()
      );
    }

    setFilteredBikes(filtered);
  };

  const handleFilterClick = () => {
    toast({
      title: "🚧 Funcionalidad en desarrollo",
      description: "Los filtros avanzados estarán disponibles pronto! Puedes solicitarlos en tu próximo mensaje 🚀"
    });
  };

  return (
    <div className="min-h-screen pt-16 bg-background">
      <Header />
      
      <section className="py-8 bg-secondary">
        <div className="container mx-auto px-4">
          <SearchBar onSearch={handleSearch} />
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Resultados de Búsqueda
              </h1>
              <p className="text-muted-foreground">
                {filteredBikes.length} motos encontradas
              </p>
            </div>

            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <div className="flex bg-muted rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              <Button
                variant="outline"
                onClick={handleFilterClick}
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>

          {filteredBikes.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}
            >
              {filteredBikes.map((bike, index) => (
                <motion.div
                  key={bike.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <BikeCard bike={bike} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                No se encontraron resultados
              </h3>
              <p className="text-muted-foreground mb-6">
                Intenta ajustar tus criterios de búsqueda
              </p>
              <Button
                className="bg-primary text-primary-foreground"
                onClick={() => window.location.reload()}
              >
                Limpiar Filtros
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SearchPage;