import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, CreditCard, Shield, FileText, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import ActionModal from '@/components/ActionModal';

const PaymentContent = ({ onPay }) => (
  <div className="space-y-4">
    <input type="text" placeholder="Número de Tarjeta" className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary" />
    <div className="grid grid-cols-2 gap-4">
      <input type="text" placeholder="MM/AA" className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary" />
      <input type="text" placeholder="CVC" className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary" />
    </div>
    <Button onClick={onPay} className="w-full bg-primary text-primary-foreground py-3">Pagar Ahora</Button>
  </div>
);

const ContractContent = () => (
  <div className="space-y-4 max-h-96 overflow-y-auto text-muted-foreground text-sm pr-2">
    <p>Este Contrato de Alquiler de Motocicleta se celebra entre el Arrendador (Wheel Deal en nombre del propietario) y el Arrendatario (usted).</p>
    <p><strong>1. Vehículo:</strong> El Arrendador alquila la motocicleta descrita en la página de detalles, en buen estado de funcionamiento.</p>
    <p><strong>2. Periodo de Alquiler:</strong> El alquiler comienza en la fecha y hora de recogida y finaliza en la fecha y hora de devolución especificadas.</p>
    <p><strong>3. Depósito de Seguridad:</strong> Se requiere un depósito de seguridad de €200, reembolsable al devolver la motocicleta en las mismas condiciones.</p>
    <p><strong>4. Uso de la Motocicleta:</strong> El Arrendatario se compromete a utilizar la motocicleta de manera segura y de acuerdo con todas las leyes de tráfico. No está permitido el subarriendo, uso en competiciones o transporte de mercancías peligrosas.</p>
    <p><strong>5. Cancelación:</strong> Se puede cancelar con 48 horas de antelación para un reembolso completo. Cancelaciones posteriores no son reembolsables.</p>
    <p>Al hacer clic en "Aceptar", usted confirma que ha leído, entendido y aceptado los términos de este contrato.</p>
  </div>
);

const LocationContent = () => (
    <div className="text-center py-8">
        <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">Buscando tu ubicación...</p>
    </div>
);

const RentalPage = () => {
  const [modalState, setModalState] = useState({ isOpen: false, content: null, title: '' });
  const [rentalData, setRentalData] = useState({ startDate: '', endDate: '', startTime: '09:00', endTime: '18:00', pickupLocation: '', insurance: false, helmet: false });

  const mockBike = { id: 1, name: "Yamaha MT-07", price: 45, image: "Yamaha MT-07 deportiva azul", category: "Deportiva", location: "Madrid Centro" };

  const handleInputChange = (field, value) => setRentalData(prev => ({...prev, [field]: value}));

  const calculateTotal = () => {
    if (!rentalData.startDate || !rentalData.endDate) return 0;
    const start = new Date(rentalData.startDate);
    const end = new Date(rentalData.endDate);
    if(start > end) return 0;
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    let total = days * mockBike.price;
    if (rentalData.insurance) total += days * 10;
    if (rentalData.helmet) total += 5;
    return total > 0 ? total : 0;
  };

  const openModal = (type) => {
    if (type === 'payment') {
      setModalState({ isOpen: true, title: 'Proceso de Pago', content: <PaymentContent onPay={handlePaymentSuccess} /> });
    } else if (type === 'contract') {
      setModalState({ isOpen: true, title: 'Contrato de Alquiler', content: <ContractContent /> });
    } else if (type === 'location') {
      setModalState({ isOpen: true, title: 'Ubicación Actual', content: <LocationContent /> });
    }
  };
  
  const handlePaymentSuccess = () => {
      setModalState({isOpen: true, title: '¡Pago Exitoso!', content: <div className="text-center py-8"><CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" /><p className="text-foreground text-lg">Tu reserva ha sido confirmada.</p></div> });
  }

  return (
    <>
      <ActionModal isOpen={modalState.isOpen} setIsOpen={(val) => setModalState({...modalState, isOpen: val})} title={modalState.title}>
        {modalState.content}
      </ActionModal>
      <div className="min-h-screen pt-16 bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-8 text-center">Proceso de Alquiler</h1>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="glass-effect rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-foreground mb-4">Moto Seleccionada</h2>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0"><img className="w-full h-full object-cover" alt={mockBike.name} src="https://images.unsplash.com/photo-1674755413926-b9b5dd7b2be3" /></div>
                    <div className="flex-1">
                      <h3 className="text-foreground font-medium">{mockBike.name}</h3>
                      <p className="text-muted-foreground text-sm">{mockBike.category}</p>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm"><MapPin className="w-4 h-4" />{mockBike.location}</div>
                    </div>
                    <div className="text-right"><p className="text-xl font-bold text-foreground">€{mockBike.price}</p><p className="text-muted-foreground text-sm">por día</p></div>
                  </div>
                </div>
                <div className="glass-effect rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2"><Calendar className="w-5 h-5" />Fechas y Horarios</h2>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div><label className="block text-muted-foreground text-sm mb-2">Fecha de inicio</label><input type="date" value={rentalData.startDate} onChange={(e) => handleInputChange('startDate', e.target.value)} className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-foreground focus:outline-none focus:border-primary"/></div>
                    <div><label className="block text-muted-foreground text-sm mb-2">Fecha de fin</label><input type="date" value={rentalData.endDate} onChange={(e) => handleInputChange('endDate', e.target.value)} className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-foreground focus:outline-none focus:border-primary"/></div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div><label className="block text-muted-foreground text-sm mb-2">Hora de recogida</label><input type="time" value={rentalData.startTime} onChange={(e) => handleInputChange('startTime', e.target.value)} className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-foreground focus:outline-none focus:border-primary"/></div>
                    <div><label className="block text-muted-foreground text-sm mb-2">Hora de devolución</label><input type="time" value={rentalData.endTime} onChange={(e) => handleInputChange('endTime', e.target.value)} className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-foreground focus:outline-none focus:border-primary"/></div>
                  </div>
                </div>
                <div className="glass-effect rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2"><MapPin className="w-5 h-5" />Ubicación de Recogida</h2>
                  <input type="text" placeholder="Dirección de recogida" value={rentalData.pickupLocation} onChange={(e) => handleInputChange('pickupLocation', e.target.value)} className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"/>
                  <Button variant="outline" className="mt-3" onClick={() => openModal('location')}>Usar mi ubicación actual</Button>
                </div>
                <div className="glass-effect rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-foreground mb-4">Extras</h2>
                  <div className="space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={rentalData.insurance} onChange={(e) => handleInputChange('insurance', e.target.checked)} className="w-5 h-5 rounded border-border bg-muted text-primary focus:ring-primary"/><div className="flex-1"><div className="flex items-center gap-2"><Shield className="w-5 h-5 text-primary" /><span className="text-foreground font-medium">Seguro Premium</span></div><p className="text-muted-foreground text-sm">Cobertura completa contra daños y robo (+€10/día)</p></div></label>
                    <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={rentalData.helmet} onChange={(e) => handleInputChange('helmet', e.target.checked)} className="w-5 h-5 rounded border-border bg-muted text-primary focus:ring-primary"/><div className="flex-1"><span className="text-foreground font-medium">Casco incluido</span><p className="text-muted-foreground text-sm">Casco de seguridad homologado (+€5)</p></div></label>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="glass-effect rounded-2xl p-6 sticky top-24">
                  <h2 className="text-xl font-bold text-foreground mb-4">Resumen del Alquiler</h2>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-muted-foreground"><span>Días de alquiler:</span><span className="text-foreground font-medium">{rentalData.startDate && rentalData.endDate ? (Math.ceil((new Date(rentalData.endDate) - new Date(rentalData.startDate)) / (1000 * 60 * 60 * 24)) + 1 > 0 ? Math.ceil((new Date(rentalData.endDate) - new Date(rentalData.startDate)) / (1000 * 60 * 60 * 24)) + 1 : 0) : 0}</span></div>
                    <div className="flex justify-between text-muted-foreground"><span>Precio por día:</span><span className="text-foreground font-medium">€{mockBike.price}</span></div>
                    {rentalData.insurance && (<div className="flex justify-between text-muted-foreground"><span>Seguro Premium:</span><span className="text-foreground font-medium">€{(rentalData.startDate && rentalData.endDate ? (Math.ceil((new Date(rentalData.endDate) - new Date(rentalData.startDate)) / (1000 * 60 * 60 * 24)) + 1 > 0 ? Math.ceil((new Date(rentalData.endDate) - new Date(rentalData.startDate)) / (1000 * 60 * 60 * 24)) + 1 : 0) * 10 : 0)}</span></div>)}
                    {rentalData.helmet && (<div className="flex justify-between text-muted-foreground"><span>Casco:</span><span className="text-foreground font-medium">€5</span></div>)}
                    <div className="border-t border-border pt-3"><div className="flex justify-between text-foreground font-bold text-lg"><span>Total:</span><span>€{calculateTotal()}</span></div></div>
                  </div>
                  <div className="space-y-4">
                    <Button onClick={() => openModal('payment')} className="w-full bg-primary text-primary-foreground py-3"><CreditCard className="w-5 h-5 mr-2" />Proceder al Pago</Button>
                    <Button onClick={() => openModal('contract')} variant="outline" className="w-full"><FileText className="w-5 h-5 mr-2" />Ver Contrato</Button>
                  </div>
                  <div className="mt-6 text-center"><p className="text-muted-foreground text-xs">Al continuar, aceptas nuestros términos y condiciones</p></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default RentalPage;