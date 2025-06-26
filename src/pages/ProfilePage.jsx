import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { User, Settings, Star, MessageCircle, MapPin, Calendar, Edit, Palette, LogOut, Trash2, Camera, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BikeCard from '@/components/BikeCard';
import { ThemeContext } from '@/contexts/ThemeContext';

const ToggleSwitch = ({ label, enabled, setEnabled, icon: Icon }) => (
  <label className="flex items-center justify-between cursor-pointer p-4 rounded-lg hover:bg-accent transition-colors">
    <div className="flex items-center gap-3">
        {Icon && <Icon className="w-5 h-5 text-primary" />}
        <span className="text-foreground/80">{label}</span>
    </div>
    <div className="relative">
      <input type="checkbox" className="sr-only" checked={enabled} onChange={() => setEnabled(!enabled)} />
      <div className="block bg-muted w-14 h-8 rounded-full"></div>
      <div className={`dot absolute left-1 top-1 bg-background w-6 h-6 rounded-full transition-transform ${enabled ? 'translate-x-full bg-primary' : ''}`}></div>
    </div>
  </label>
);

const ProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme, setTheme } = useContext(ThemeContext);

  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'profile');
  const [userProfile, setUserProfile] = useState({ name: 'María González', email: 'maria.gonzalez@email.com', phone: '+34 666 777 888', location: 'Madrid, España', memberSince: '2023', rating: 4.8, totalRentals: 15, totalPurchases: 2, bio: 'Apasionada de las motos y los viajes por carretera.', avatar: 'Mujer joven sonriente con casco de moto' });
  const [favoritesBikes, setFavoritesBikes] = useState([]);
  const [rentalHistory, setRentalHistory] = useState([]);
  const [settings, setSettings] = useState({ emailNotifications: true, pushNotifications: false });
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(userProfile);

  useEffect(() => {
    const mockFavorites = [ { id: 1, name: "Yamaha MT-07", price: 45, type: "rental", image: "Yamaha MT-07 deportiva azul", rating: 4.8, location: "Madrid Centro", category: "Deportiva" }, { id: 4, name: "BMW R1250GS", price: 15000, type: "sale", image: "BMW R1250GS adventure blanca", rating: 4.9, location: "Sevilla", category: "Touring" } ];
    const mockHistory = [ { id: 1, bikeName: "Honda CB650R", date: "2024-01-15", duration: "3 días", total: 135, status: "Completado" }, { id: 2, bikeName: "Kawasaki Ninja 400", date: "2024-01-08", duration: "1 día", total: 35, status: "Completado" } ];
    setFavoritesBikes(mockFavorites);
    setRentalHistory(mockHistory);
    setEditedProfile(userProfile);
  }, [userProfile]);

  const handleTabClick = (tabId) => {
    if (tabId === 'messages') navigate('/chat');
    else setActiveTab(tabId);
  };
  
  const handleSaveProfile = () => {
    setUserProfile(editedProfile);
    setIsEditing(false);
    toast({ title: '✅ ¡Perfil actualizado!', description: 'Tus cambios se han guardado correctamente.'});
  };

  const handleSaveSettings = () => {
    toast({ title: '✅ ¡Configuración guardada!', description: 'Tus preferencias han sido actualizadas.' });
  };
  
  const handleThemeChange = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const tabs = [ { id: 'profile', label: 'Mi Perfil', icon: User }, { id: 'favorites', label: 'Favoritos', icon: Star }, { id: 'history', label: 'Mi Historial', icon: Calendar }, { id: 'messages', label: 'Mensajes', icon: MessageCircle }, { id: 'settings', label: 'Ajustes', icon: Settings } ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="glass-effect rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-foreground">Información Personal</h3>
                {!isEditing ? (
                  <Button variant="outline" onClick={() => setIsEditing(true)}><Edit className="w-4 h-4 mr-2" />Editar</Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="ghost" onClick={() => { setIsEditing(false); setEditedProfile(userProfile); }}>Cancelar</Button>
                    <Button onClick={handleSaveProfile} className="bg-primary text-primary-foreground">Guardar</Button>
                  </div>
                )}
              </div>
              {isEditing ? (
                 <div className="space-y-4">
                    <input type="text" value={editedProfile.name} onChange={e => setEditedProfile({...editedProfile, name: e.target.value})} placeholder="Nombre" className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:border-primary"/>
                    <textarea value={editedProfile.bio} onChange={e => setEditedProfile({...editedProfile, bio: e.target.value})} placeholder="Tu biografía" rows="3" className="w-full p-4 bg-muted border border-border rounded-xl focus:outline-none focus:border-primary"></textarea>
                    <input type="text" value={editedProfile.location} onChange={e => setEditedProfile({...editedProfile, location: e.target.value})} placeholder="Ubicación" className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:border-primary"/>
                 </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  <div><label className="text-muted-foreground text-sm">Nombre</label><p className="text-foreground font-medium">{userProfile.name}</p></div>
                  <div><label className="text-muted-foreground text-sm">Email</label><p className="text-foreground font-medium">{userProfile.email}</p></div>
                  <div><label className="text-muted-foreground text-sm">Ubicación</label><p className="text-foreground font-medium flex items-center gap-1"><MapPin className="w-4 h-4" />{userProfile.location}</p></div>
                  <div className="md:col-span-2"><label className="text-muted-foreground text-sm">Biografía</label><p className="text-foreground font-medium">{userProfile.bio}</p></div>
                </div>
              )}
            </div>
             <div className="grid md:grid-cols-3 gap-6">
                <div className="glass-effect rounded-2xl p-6 text-center"><div className="text-3xl font-bold text-primary mb-2">{userProfile.totalRentals}</div><p className="text-muted-foreground">Alquileres</p></div>
                <div className="glass-effect rounded-2xl p-6 text-center"><div className="text-3xl font-bold text-blue-500 mb-2">{userProfile.totalPurchases}</div><p className="text-muted-foreground">Compras</p></div>
                <div className="glass-effect rounded-2xl p-6 text-center"><div className="text-3xl font-bold text-yellow-500 mb-2">{userProfile.rating}</div><p className="text-muted-foreground">Calificación</p></div>
            </div>
          </div>
        );
      case 'favorites':
        return (
          <div className="glass-effect rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-foreground mb-6">Mis Motos Favoritas</h3>
            {favoritesBikes.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {favoritesBikes.map(bike => <BikeCard key={bike.id} bike={bike} />)}
              </div>
            ) : <p className="text-muted-foreground text-center py-8">Aún no tienes motos favoritas. ¡Empieza a explorar!</p>}
          </div>
        );
      case 'history':
        return (
          <div className="glass-effect rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-foreground mb-6">Mi Historial de Alquileres</h3>
            <div className="space-y-4">
              {rentalHistory.map((rental) => (
                <div key={rental.id} className="flex justify-between items-center p-3 rounded-lg hover:bg-accent transition-colors">
                  <div><p className="text-foreground font-medium">{rental.bikeName}</p><p className="text-muted-foreground text-sm">{rental.date} • {rental.duration}</p></div>
                  <div className="text-right"><p className="text-foreground font-medium">€{rental.total}</p><p className="text-green-500 text-sm font-semibold">{rental.status}</p></div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="glass-effect rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-foreground mb-6">Ajustes y Preferencias</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2"><Palette className="w-5 h-5 text-primary"/>Apariencia</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-4 rounded-lg hover:bg-accent transition-colors">
                      <div className="flex items-center gap-3">
                          <Sun className="w-5 h-5 text-yellow-500" />
                          <span className="text-foreground/80">Modo Claro / Oscuro</span>
                          <Moon className="w-5 h-5 text-blue-300" />
                      </div>
                      <button onClick={handleThemeChange} className="relative inline-flex items-center h-6 rounded-full w-11 transition-colors bg-muted">
                        <span className={`inline-block w-4 h-4 transform bg-background rounded-full transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`}/>
                      </button>
                  </div>
                </div>
              </div>
              <div className="border-t border-border"></div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2"><User className="w-5 h-5 text-primary" />Cuenta</h4>
                <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start text-foreground/80 hover:text-primary"><Edit className="w-4 h-4 mr-2"/>Cambiar Contraseña</Button>
                    <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive/80"><Trash2 className="w-4 h-4 mr-2"/>Eliminar Cuenta</Button>
                    <Button variant="ghost" className="w-full justify-start text-foreground/80 hover:text-primary"><LogOut className="w-4 h-4 mr-2"/>Cerrar Sesión</Button>
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <Button className="bg-primary text-primary-foreground" onClick={handleSaveSettings}>Guardar Cambios</Button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="min-h-screen pt-16">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="glass-effect rounded-2xl p-6 sticky top-24">
                <div className="text-center mb-6 relative">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden ring-2 ring-primary ring-offset-4 ring-offset-background">
                    <img className="w-full h-full object-cover" alt="Avatar de usuario" src="https://images.unsplash.com/photo-1703248074742-9209575611a3" />
                  </div>
                   <Button size="icon" variant="outline" className="absolute bottom-4 right-[calc(50%-48px)] w-8 h-8 rounded-full bg-background"><Camera className="w-4 h-4" /></Button>
                  <h2 className="text-xl font-bold text-foreground mt-4 mb-1">{userProfile.name}</h2>
                  <div className="flex items-center justify-center gap-1 text-yellow-500 mb-2"><Star className="w-4 h-4 fill-current" /><span className="text-muted-foreground">{userProfile.rating}</span></div>
                  <p className="text-muted-foreground text-sm">Miembro desde {userProfile.memberSince}</p>
                </div>
                <nav className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button key={tab.id} onClick={() => handleTabClick(tab.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === tab.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-accent'}`}>
                        <Icon className="w-5 h-5" />{tab.label}
                      </button>
                    );
                  })}
                </nav>
              </motion.div>
            </div>
            <div className="lg:col-span-3">
              <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                {renderContent()}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;