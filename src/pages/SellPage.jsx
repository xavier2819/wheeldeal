import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Plus, X, Tag, Calendar, BarChart, Settings, DollarSign, Bike } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';

const SellPage = () => {
  const { toast } = useToast();
  const [images, setImages] = useState([]);
  const [bikeDetails, setBikeDetails] = useState({
    title: '',
    description: '',
    category: 'deportiva',
    brand: '',
    model: '',
    year: '',
    mileage: '',
    price: '',
    features: [],
  });
  const [newFeature, setNewFeature] = useState('');

  const handleImageUpload = (e) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
      setImages((prevImages) => [...prevImages, ...fileArray]);
    }
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBikeDetails(prev => ({...prev, [name]: value}));
  };
  
  const handleAddFeature = () => {
    if(newFeature.trim() !== '') {
      setBikeDetails(prev => ({...prev, features: [...prev.features, newFeature]}));
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index) => {
    setBikeDetails(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "🚧 Anuncio enviado a revisión",
      description: "Gracias por publicar. Tu anuncio será visible pronto. 🚀"
    });
  };

  return (
    <div className="min-h-screen pt-16 bg-background">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Vende tu moto en Wheel Deal</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Llega a miles de compradores potenciales de forma rápida y segura.</p>
        </motion.div>
        
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
          <div className="glass-effect rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Fotos de tu moto</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img src={image} alt={`upload-preview ${index}`} className="w-full h-32 object-cover rounded-lg"/>
                  <button onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-red-500/80 rounded-full p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <X size={16}/>
                  </button>
                </div>
              ))}
              <label htmlFor="image-upload" className="w-full h-32 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-accent transition-colors">
                <Upload size={32} className="text-muted-foreground mb-2"/>
                <span className="text-sm text-muted-foreground">Añadir foto</span>
              </label>
            </div>
            <input id="image-upload" type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload}/>
          </div>
          
          <div className="glass-effect rounded-2xl p-6">
             <h2 className="text-2xl font-bold text-foreground mb-6">Detalles del anuncio</h2>
             <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                   <Bike className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                   <input type="text" name="title" placeholder="Título del anuncio (ej. Yamaha MT-07 Casi Nueva)" value={bikeDetails.title} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 bg-muted border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary" required/>
                </div>

                <div className="relative">
                   <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                   <select name="category" value={bikeDetails.category} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 bg-muted border border-border rounded-xl text-foreground focus:outline-none focus:border-primary appearance-none cursor-pointer">
                      <option value="deportiva" className="bg-popover text-popover-foreground">Deportiva</option>
                      <option value="naked" className="bg-popover text-popover-foreground">Naked</option>
                      <option value="touring" className="bg-popover text-popover-foreground">Touring</option>
                      <option value="scooter" className="bg-popover text-popover-foreground">Scooter</option>
                      <option value="cruiser" className="bg-popover text-popover-foreground">Cruiser</option>
                   </select>
                </div>
                
                <input type="text" name="brand" placeholder="Marca" value={bikeDetails.brand} onChange={handleInputChange} className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary" required/>
                <input type="text" name="model" placeholder="Modelo" value={bikeDetails.model} onChange={handleInputChange} className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary" required/>
                
                <div className="relative">
                   <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                   <input type="number" name="year" placeholder="Año" value={bikeDetails.year} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 bg-muted border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary" required/>
                </div>
                
                <div className="relative">
                   <BarChart className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                   <input type="number" name="mileage" placeholder="Kilometraje" value={bikeDetails.mileage} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 bg-muted border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary" required/>
                </div>
                
                <div className="md:col-span-2">
                   <textarea name="description" placeholder="Describe tu moto..." value={bikeDetails.description} onChange={handleInputChange} rows="4" className="w-full p-4 bg-muted border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary" required></textarea>
                </div>
             </div>
          </div>
          
          <div className="glass-effect rounded-2xl p-6">
             <h2 className="text-2xl font-bold text-foreground mb-4">Características Adicionales</h2>
             <div className="flex gap-2 mb-4">
                <input type="text" value={newFeature} onChange={(e) => setNewFeature(e.target.value)} placeholder="Ej. Escape Akrapovic, puños calefactables..." className="flex-1 px-4 py-3 bg-muted border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"/>
                <Button type="button" onClick={handleAddFeature} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                   <Plus size={20}/>
                </Button>
             </div>
             <div className="flex flex-wrap gap-2">
                {bikeDetails.features.map((feature, index) => (
                   <div key={index} className="flex items-center gap-2 bg-accent text-accent-foreground px-3 py-1 rounded-full">
                      <span>{feature}</span>
                      <button type="button" onClick={() => handleRemoveFeature(index)}>
                         <X size={14}/>
                      </button>
                   </div>
                ))}
             </div>
          </div>
          
          <div className="glass-effect rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Precio</h2>
            <div className="relative mb-6">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input type="number" name="price" placeholder="Precio de venta" value={bikeDetails.price} onChange={handleInputChange} className="w-full md:w-1/2 pl-10 pr-4 py-3 bg-muted border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary" required/>
            </div>
            <Button size="lg" type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 text-lg">
                Publicar Anuncio
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellPage;