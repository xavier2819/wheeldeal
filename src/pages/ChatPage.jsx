import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Video, MoreVertical, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';

const ChatPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);

  const mockChats = [
    {
      id: 1,
      name: "Carlos Ruiz",
      avatar: "Hombre joven sonriente con chaqueta de cuero",
      lastMessage: "¿Está disponible la Yamaha MT-07 para el fin de semana?",
      time: "10:30",
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: "Ana Martín",
      avatar: "Mujer joven con casco de moto rosa",
      lastMessage: "Perfecto, nos vemos mañana a las 15:00",
      time: "09:45",
      unread: 0,
      online: false
    },
    {
      id: 3,
      name: "Moto Center Madrid",
      avatar: "Logo de concesionario de motos moderno",
      lastMessage: "Tenemos nuevos modelos disponibles",
      time: "Ayer",
      unread: 1,
      online: true
    }
  ];

  const mockMessages = [
    {
      id: 1,
      sender: "Carlos Ruiz",
      message: "Hola! ¿Está disponible la Yamaha MT-07 para el fin de semana?",
      time: "10:25",
      isOwn: false
    },
    {
      id: 2,
      sender: "Tú",
      message: "¡Hola Carlos! Sí, está disponible. ¿Para qué fechas exactamente?",
      time: "10:27",
      isOwn: true
    },
    {
      id: 3,
      sender: "Carlos Ruiz",
      message: "Desde el viernes por la tarde hasta el domingo por la noche",
      time: "10:28",
      isOwn: false
    },
    {
      id: 4,
      sender: "Tú",
      message: "Perfecto, son 3 días. El precio sería €135 en total. ¿Te parece bien?",
      time: "10:30",
      isOwn: true
    }
  ];

  useEffect(() => {
    if (selectedChat) {
      setMessages(mockMessages);
    }
  }, [selectedChat]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    toast({
      title: "🚧 Funcionalidad en desarrollo",
      description: "El envío de mensajes estará disponible pronto! Puedes solicitarlo en tu próximo mensaje 🚀"
    });
    setNewMessage('');
  };

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  const handleAction = (action) => {
    toast({
      title: "🚧 Funcionalidad en desarrollo",
      description: `${action} estará disponible pronto! Puedes solicitarlo en tu próximo mensaje 🚀`
    });
  };

  return (
    <div className="min-h-screen pt-16 bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-effect rounded-2xl h-full flex flex-col"
            >
              <div className="p-6 border-b border-border">
                <h2 className="text-2xl font-bold text-foreground">Mensajes</h2>
              </div>

              <div className="flex-1 overflow-y-auto">
                {mockChats.map((chat) => (
                  <motion.div
                    key={chat.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 border-b border-border cursor-pointer transition-colors ${
                      selectedChat?.id === chat.id ? 'bg-primary/10' : 'hover:bg-accent'
                    }`}
                    onClick={() => handleChatSelect(chat)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <img  
                            className="w-full h-full object-cover"
                            alt={`Avatar de ${chat.name}`}
                           src="https://images.unsplash.com/photo-1684835609054-dd3d681cf012" />
                        </div>
                        {chat.online && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <h3 className="text-foreground font-medium truncate">{chat.name}</h3>
                          <span className="text-muted-foreground text-xs">{chat.time}</span>
                        </div>
                        <p className="text-muted-foreground text-sm truncate">{chat.lastMessage}</p>
                      </div>
                      
                      {chat.unread > 0 && (
                        <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-primary-foreground text-xs font-bold">{chat.unread}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-effect rounded-2xl h-full flex flex-col"
            >
              {selectedChat ? (
                <>
                  <div className="p-6 border-b border-border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden text-foreground hover:bg-accent"
                        onClick={() => setSelectedChat(null)}
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </Button>
                      
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img  
                          className="w-full h-full object-cover"
                          alt={`Avatar de ${selectedChat.name}`}
                         src="https://images.unsplash.com/photo-1684835609054-dd3d681cf012" />
                      </div>
                      
                      <div>
                        <h3 className="text-foreground font-medium">{selectedChat.name}</h3>
                        <p className="text-muted-foreground text-sm">
                          {selectedChat.online ? 'En línea' : 'Desconectado'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-foreground hover:bg-accent"
                        onClick={() => handleAction('Llamada de voz')}
                      >
                        <Phone className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-foreground hover:bg-accent"
                        onClick={() => handleAction('Videollamada')}
                      >
                        <Video className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-foreground hover:bg-accent"
                        onClick={() => handleAction('Más opciones')}
                      >
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                          message.isOwn 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-secondary text-secondary-foreground'
                        }`}>
                          <p className="text-sm">{message.message}</p>
                          <p className={`text-xs mt-1 ${
                            message.isOwn ? 'text-primary-foreground/70' : 'text-secondary-foreground/70'
                          }`}>
                            {message.time}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <form onSubmit={handleSendMessage} className="p-6 border-t border-border">
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Escribe un mensaje..."
                        className="flex-1 px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-colors"
                      />
                      <Button
                        type="submit"
                        className="px-6"
                      >
                        <Send className="w-5 h-5" />
                      </Button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">💬</div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      Selecciona una conversación
                    </h3>
                    <p className="text-muted-foreground">
                      Elige un chat para comenzar a conversar
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;