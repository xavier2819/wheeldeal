import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const BikeCard = ({ bike }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleActionClick = (e) => {
    e.stopPropagation();
    toast({
      title: "🚧 Funcionalidad en desarrollo",
      description: "¡Esta función aún no está implementada, pero puedes solicitarla en tu próximo mensaje! 🚀",
    });
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };
  
  const handleCardClick = () => {
    navigate(`/bike/${bike.id}`);
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.03, y: -5 }}
        whileTap={{ scale: 0.98 }}
        className="bike-card rounded-2xl overflow-hidden cursor-pointer shadow-sm"
        onClick={handleCardClick}
      >
        <div className="relative h-48 overflow-hidden">
          <img  
            className="w-full h-full object-cover"
            alt={`${bike.name} - ${bike.category}`}
           src="https://images.unsplash.com/photo-1674755413926-b9b5dd7b2be3" />
          
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="bg-background/30 hover:bg-background/50 text-foreground backdrop-blur-sm rounded-full"
              onClick={handleFavoriteClick}
            >
              <Star className={`w-4 h-4 transition-colors ${isFavorite ? 'text-yellow-400 fill-current' : 'text-foreground'}`} />
            </Button>
          </div>

          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              bike.type === 'rental' 
                ? 'bg-green-500/90 text-white' 
                : 'bg-blue-500/90 text-white'
            }`}>
              {bike.type === 'rental' ? 'Alquiler' : 'Venta'}
            </span>
          </div>
        </div>

        <div className="p-4 bg-card">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-bold text-card-foreground mb-1">{bike.name}</h3>
              <p className="text-muted-foreground text-sm">{bike.category}</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-card-foreground">
                €{bike.price}
                {bike.type === 'rental' && <span className="text-sm font-normal text-muted-foreground">/día</span>}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-card-foreground font-semibold">{bike.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{bike.location}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              className="flex-1 bg-primary text-primary-foreground"
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
              }}
            >
              {bike.type === 'rental' ? 'Alquilar' : 'Comprar'}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleActionClick}
            >
              <MessageCircle className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default BikeCard;