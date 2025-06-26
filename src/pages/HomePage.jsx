import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Bike, Compass, Wind, Zap, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BikeCard from '@/components/BikeCard';
import SearchBar from '@/components/SearchBar';
import { useToast } from "@/components/ui/use-toast";

const HomePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [featuredBikes, setFeaturedBikes] = useState([]);

  const handleFeatureClick = () => {
    toast({
      title: "🚧 Funcionalidad en desarrollo",
      description: "¡Esta función aún no está implementada, pero puedes solicitarla en tu próximo mensaje! 🚀"
    });
  };

  useEffect(() => {
    const mockBikes = [
      { id: 1, name: "Yamaha MT-07", price: 45, type: "rental", image: "Yamaha MT-07 deportiva azul", rating: 4.8, location: "Madrid Centro", category: "Deportiva" },
      { id: 2, name: "Honda CB650R", price: 8500, type: "sale", image: "Honda CB650R negra moderna", rating: 4.9, location: "Barcelona", category: "Naked" },
      { id: 3, name: "Kawasaki Ninja 400", price: 35, type: "rental", image: "Kawasaki Ninja 400 verde deportiva", rating: 4.7, location: "Valencia", category: "Deportiva" }
    ];
    setFeaturedBikes(mockBikes);
  }, []);

  const features = [
    { icon: <Shield className="w-8 h-8" />, title: "Transacciones Seguras", description: "Sistema de verificación y protección para todos." },
    { icon: <MapPin className="w-8 h-8" />, title: "Geolocalización", description: "Encuentra motos disponibles cerca de tu ubicación." },
    { icon: <Users className="w-8 h-8" />, title: "Comunidad Verificada", description: "Usuarios con calificaciones para tu tranquilidad." }
  ];

  const bikeCategories = [
    { name: 'Deportiva', icon: <Bike className="w-8 h-8" />, image: "Moto deportiva roja en una pista" },
    { name: 'Naked', icon: <Wind className="w-8 h-8" />, image: "Moto naked negra en una calle de la ciudad" },
    { name: 'Touring', icon: <Compass className="w-8 h-8" />, image: "Moto touring en una carretera de montaña" },
    { name: 'Scooter', icon: <Zap className="w-8 h-8" />, image: "Scooter moderno en una calle europea" }
  ];

  const handleSearch = (searchData) => {
    navigate('/search', { state: searchData });
  };

  const handleCategoryClick = (categoryName) => {
    navigate('/search', { state: { category: categoryName.toLowerCase() } });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-pattern">
        <div className="container mx-auto px-4 z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }} 
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 gradient-text"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Wheel Deal
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              La plataforma que conecta motociclistas con las mejores ofertas de alquiler y compra
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-12"
            >
              <SearchBar onSearch={handleSearch} />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg pulse-glow" onClick={() => navigate('/search')}>
                Explorar Motos <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg" onClick={() => navigate('/sell')}>
                Vender mi Moto
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }} 
            viewport={{ once: true }} 
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Explora por Categoría</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Encuentra la moto perfecta para tu estilo de vida</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {bikeCategories.map((category, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 50 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: index * 0.1 }} 
                viewport={{ once: true }} 
                className="relative rounded-2xl overflow-hidden cursor-pointer group border border-border" 
                onClick={() => handleCategoryClick(category.name)}
              >
                <img alt={category.image} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300 flex flex-col items-center justify-center p-4">
                  <div className="text-primary mb-3 transition-transform duration-300 group-hover:scale-110">{category.icon}</div>
                  <h3 className="text-xl font-bold text-white">{category.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }} 
            viewport={{ once: true }} 
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">¿Por qué elegir Wheel Deal?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Tecnología de vanguardia para una experiencia superior</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 50 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: index * 0.1 }} 
                viewport={{ once: true }} 
                className="glass-effect rounded-2xl p-6 text-center hover:bg-accent transition-all duration-300 cursor-pointer" 
                onClick={handleFeatureClick}
              >
                <div className="text-primary mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }} 
            viewport={{ once: true }} 
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Motos Destacadas</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Descubre las mejores ofertas</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBikes.map((bike, index) => (
              <motion.div 
                key={bike.id} 
                initial={{ opacity: 0, y: 50 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: index * 0.1 }} 
                viewport={{ once: true }}
              >
                <BikeCard bike={bike} />
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            transition={{ duration: 0.8, delay: 0.4 }} 
            viewport={{ once: true }} 
            className="text-center mt-12"
          >
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4" onClick={() => navigate('/search')}>
              Ver Todas las Motos <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-primary/80 to-green-500/80">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }} 
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">¿Listo para tu próxima aventura?</h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">Únete a miles de motociclistas que ya confían en Wheel Deal</p>
            <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-4 text-lg font-semibold" onClick={() => navigate('/search')}>
              Comenzar Ahora
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;