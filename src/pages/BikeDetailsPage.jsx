import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, MapPin, MessageCircle, Share2, Calendar, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';

const BikeDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bike, setBike] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Simular carga de datos de la moto
    const mockBike = {
      id: parseInt(id),
      name: "Yamaha MT-07",
      price: 45,
      type: "rental",
      category: "Deportiva",
      rating: 4.8,
      reviews: 24,
      location: "Madrid Centro",
      description: "La Yamaha MT-07 es una moto naked deportiva perfecta para la ciudad y carretera. Con su motor bicilíndrico de 689cc, ofrece una experiencia de conducción emocionante y eficiente.",
      features: [
        "Motor 689cc bicilíndrico",
        "Potencia: 75 CV",
        "Peso: 184 kg",
        "Consumo: 4.2L/100km",
        "ABS de serie",
        "Pantalla LCD"
      ],
      images: [
        "Yamaha MT-07 deportiva azul vista frontal",
        "Yamaha MT-07 vista lateral derecha",
        "Yamaha MT-07 detalle del motor",
        "Yamaha MT-07 panel de instrumentos"
      ],
      owner: {
        name: "Carlos Ruiz",
        rating: 4.9,
        totalRentals: 156,
        avatar: "Hombre joven sonriente con chaqueta de cuero"
      },
      availability: {
        available: true,
        nextAvailable: "2024-01-20"
      }
    };
    setBike(mockBike);
  }, [id]);

  const handleAction = (action) => {
    toast({
      title: "🚧 Funcionalidad en desarrollo",
      description: `${action} estará disponible pronto! Puedes solicitarla en tu próximo mensaje 🚀`
    });
  };

  if (!bike) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Cargando detalles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-effect rounded-2xl overflow-hidden">
              <div className="aspect-video relative">
                <img  
                  className="w-full h-full object-cover"
                  alt={bike.images[selectedImage]}
                 src="https://images.unsplash.com/photo-1674755413926-b9b5dd7b2be3" />
                
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    bike.type === 'rental' 
                      ? 'bg-green-500/80 text-white' 
                      : 'bg-blue-500/80 text-white'
                  }`}>
                    {bike.type === 'rental' ? 'Alquiler' : 'Venta'}
                  </span>
                </div>
              </div>

              <div className="p-4 flex gap-2 overflow-x-auto">
                {bike.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-purple-500' : 'border-white/20'
                    }`}
                  >
                    <img  
                      className="w-full h-full object-cover"
                      alt={`${bike.name} thumbnail ${index + 1}`}
                     src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="glass-effect rounded-2xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{bike.name}</h1>
                  <p className="text-white/70">{bike.category}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10"
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    <Star className={`w-5 h-5 transition-colors ${isFavorite ? 'text-yellow-400 fill-current' : 'text-white'}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10"
                    onClick={() => handleAction('Compartir')}
                  >
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-white font-medium">{bike.rating}</span>
                  <span className="text-white/70">({bike.reviews} reseñas)</span>
                </div>
                <div className="flex items-center gap-1 text-white/70">
                  <MapPin className="w-4 h-4" />
                  <span>{bike.location}</span>
                </div>
              </div>

              <div className="text-right">
                <p className="text-4xl font-bold text-white">
                  €{bike.price}
                  {bike.type === 'rental' && <span className="text-lg font-normal">/día</span>}
                </p>
              </div>
            </div>

            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-3">Descripción</h3>
              <p className="text-white/80 leading-relaxed">{bike.description}</p>
            </div>

            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Características</h3>
              <div className="grid grid-cols-2 gap-3">
                {bike.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-purple-400" />
                    <span className="text-white/80 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Propietario</h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img  
                    className="w-full h-full object-cover"
                    alt="Avatar del propietario"
                   src="https://images.unsplash.com/photo-1563692309577-3161d9f813f5" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{bike.owner.name}</p>
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{bike.owner.rating}</span>
                    <span>•</span>
                    <span>{bike.owner.totalRentals} alquileres</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={() => handleAction('Contactar')}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contactar
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 text-lg"
                onClick={() => navigate('/rental')}
              >
                {bike.type === 'rental' ? (
                  <>
                    <Calendar className="w-5 h-5 mr-2" />
                    Alquilar Ahora
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5 mr-2" />
                    Comprar Ahora
                  </>
                )}
              </Button>
              
              {bike.type === 'rental' && (
                <div className="text-center text-white/70 text-sm">
                  {bike.availability.available ? (
                    <span className="text-green-400">✓ Disponible ahora</span>
                  ) : (
                    <span>Próxima disponibilidad: {bike.availability.nextAvailable}</span>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BikeDetailsPage;