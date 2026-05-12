import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  MapPin, 
  Heart, 
  Clock, 
  Music,
  Share2,
  MessageCircle,
  Gift,
  Shirt,
  ChevronDown
} from 'lucide-react';

const DEFAULT_DETAILS = {
  brideName: "Claudia Galindo Estrada",
  groomName: "Esau Calixtro Vargas",
  date: "Sábado, 01 de Agosto de 2026",
  time: "3:00 PM",
  churchName: "Parroquia Nuestra Señora del Rosario",
  churchAddress: "Av. Hidalgo 9, Centro, 42130 Mineral del Monte, Hgo.",
  churchTime: "3:00 PM",
  location: "Hacienda Real de Velasco",
  address: "DE VELASCO #S/N, Centro, 43560 Omitlán de Juárez, Hgo.",
  message: "Con la bendición de Dios y de nuestros padres, tenemos el honor de invitarte a celebrar nuestro amor.",
  rsvpDeadline: "24 de Septiembre",
  parents: {
    bride: ["Sr. Armando Galindo Cervantes", "Sra. Lucero Estrada Sandoval"],
    groom: ["Sr. Celedonio Calixtro Cortés", "Sra. Simplicia Vargas Rosales"]
  },
  dressCode: "Formal - Etiqueta",
  giftRegistry: [
    { type: 'Amazon', details: 'Mesa de Regalos: Claudia & Esau' },
    { type: 'Liverpool', details: 'Código: 50492831' }
  ],
  whatsappRSVP: "+521234567890",
  musicUrl: "https://sagaonmedia.s3.us-east-2.amazonaws.com/website/machines_projects/CYE/M_1.mp3", // REEMPLAZA ESTE LINK CON TU CANCIÓN
  images: [
    "https://sagaonmedia.s3.us-east-2.amazonaws.com/website/machines_projects/CYE/C%26E_-26.jpg", // Hero
    "https://sagaonmedia.s3.us-east-2.amazonaws.com/website/machines_projects/CYE/C%26E_-6.jpg", // Story
    "https://sagaonmedia.s3.us-east-2.amazonaws.com/website/machines_projects/CYE/CyE_27.jpg", // Details
    "https://sagaonmedia.s3.us-east-2.amazonaws.com/website/machines_projects/CYE/C%26E_-22.jpg"  // Final
  ]
};

const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.section 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1, ease: "easeOut" }}
    className={`py-20 px-6 max-w-5xl mx-auto w-full ${className}`}
  >
    {children}
  </motion.section>
);

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => console.log("Playback error:", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const startInvitation = () => {
    setHasStarted(true);
    setIsPlaying(true);
  };

  const addToCalendar = () => {
    const title = `Boda de ${DEFAULT_DETAILS.brideName} & ${DEFAULT_DETAILS.groomName}`;
    const description = `¡Estamos muy emocionados de compartir este día tan especial con ustedes!\n\nCeremonia: ${DEFAULT_DETAILS.churchName}\nRecepción: ${DEFAULT_DETAILS.location}`;
    const location = `${DEFAULT_DETAILS.location}, ${DEFAULT_DETAILS.address}`;
    
    // Formato de fecha para ICS: YYYYMMDDTHHMMSS
    // Inicio: 1 de Agosto 2026 a las 15:00
    // Fin: 1 de Agosto 2026 a las 23:59
    const startDate = "20260801T150000";
    const endDate = "20260801T235900";

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Claudia y Esau//Invitacion de Boda//ES",
      "BEGIN:VEVENT",
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
      `LOCATION:${location}`,
      "BEGIN:VALARM",
      "TRIGGER:-PT1440M", // Recordatorio 1 día antes
      "ACTION:DISPLAY",
      "DESCRIPTION:Reminder",
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\n");

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'boda-claudia-y-esau.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-[#fcfaf7] min-h-screen font-sans text-[#3a3a3a] selection:bg-[#cfa461]/20">
      <audio ref={audioRef} src={DEFAULT_DETAILS.musicUrl} loop />
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Montserrat:wght@100..900&display=swap');
          .font-serif { font-family: 'Playfair Display', serif; }
          .font-sans { font-family: 'Montserrat', sans-serif; }
          .text-shadow-sm { text-shadow: 0 2px 4px rgba(0,0,0,0.3); }
        `}
      </style>

      {/* Screen Overlay - Entry */}
      <AnimatePresence>
        {!hasStarted && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              scale: 1.1,
              backgroundColor: "#ffffff",
              transition: { duration: 1.2, delay: 0.8, ease: "easeInOut" }
            }}
            className="fixed inset-0 z-[200] bg-[#fcfaf7] flex flex-col items-center justify-center text-center px-6"
          >
            {/* Envelope Container */}
            <div className="relative w-full max-w-sm aspect-[4/3] bg-white shadow-2xl flex flex-col items-center justify-end pb-12 border border-neutral-100 mt-[-50px]">
              
              {/* Top Flap (Animated) */}
              <motion.div 
                className="absolute top-0 left-0 right-0 h-1/2 bg-[#fcfaf7] border-b border-[#cfa461]/20 origin-top z-10"
                style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)', transformStyle: 'preserve-3d' }}
                animate={hasStarted ? { rotateX: -160, zIndex: 0 } : { rotateX: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />

              {/* Envelope Body (Shadow effect) */}
              <div className="absolute inset-0 bg-[#fff] z-0" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 50% 50%)' }} />

              {/* Content Inside Envelope */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-4 relative z-[5]"
              >
                <button 
                  onClick={startInvitation}
                  className="group relative px-8 py-3 overflow-hidden shadow-lg"
                >
                  <div className="absolute inset-0 bg-[#cfa461] transition-transform duration-500 group-hover:scale-105" />
                  <span className="relative text-white text-[9px] uppercase tracking-[0.4em] font-bold">Abrir Invitación</span>
                </button>
                <p className="text-[8px] uppercase tracking-widest opacity-30 italic">Cargando música...</p>
              </motion.div>

              {/* Bottom/Side Flaps (Static appearance) */}
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-white/50 border-t border-[#cfa461]/10 pointer-events-none" style={{ clipPath: 'polygon(0 100%, 100% 100%, 50% 0)' }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#cfa461] origin-left z-[100]" 
        style={{ scaleX }} 
      />

      {/* Music Toggle */}
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        className="fixed bottom-6 right-6 z-50 bg-white/80 backdrop-blur-md p-4 rounded-full shadow-lg border border-[#cfa461]/20 group"
      >
        <Music className={`w-5 h-5 transition-colors ${isPlaying ? 'text-[#cfa461] animate-pulse' : 'text-gray-400'}`} />
      </button>

      {/* 1. HERO - IMAGEN 1 */}
      <header className="relative h-screen min-h-[700px] w-full overflow-hidden flex items-center justify-center">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3 }}
          className="absolute inset-0"
        >
          <img 
            src={DEFAULT_DETAILS.images[0]} 
            className="w-full h-full object-cover grayscale-[5%] opacity-90"
            alt="Wedding Hero"
            referrerPolicy="no-referrer"
          />
          {/* Overlay negro más denso para legibilidad */}
          <div className="absolute inset-0 bg-black/50" />
          {/* Degradado negro profundo de arriba hacia abajo */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60" />
        </motion.div>

        <div className="relative z-10 text-center px-6 text-white text-shadow-sm">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <span className="text-[10px] uppercase tracking-[0.8em] font-medium mb-6 block opacity-80">Save The Date</span>
            <h1 className="font-serif text-5xl md:text-7xl mb-8 leading-[1.1] text-white">
              {DEFAULT_DETAILS.brideName} 
              <span className="block text-2xl md:text-4xl italic my-4 text-[#cfa461] font-serif">&</span> 
              {DEFAULT_DETAILS.groomName}
            </h1>
            <div className="h-px w-16 bg-[#cfa461] mx-auto mb-8" />
            <p className="text-sm tracking-[0.4em] uppercase font-semibold opacity-90">
              {DEFAULT_DETAILS.date}
            </p>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </header>

      {/* 2. FRASE E IMAGEN 2 */}
      <Section className="grid md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1">
          <motion.div 
            whileInView={{ clipPath: "inset(0 0 0 0)" }}
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            transition={{ duration: 1.5 }}
            className="aspect-[4/5] overflow-hidden rounded-sm"
          >
            <img 
              src={DEFAULT_DETAILS.images[1]} 
              className="w-full h-full object-cover"
              alt="Couples story"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
        <div className="order-1 md:order-2 space-y-8 text-center md:text-left">
          <Heart className="w-6 h-6 text-[#cfa461] mx-auto md:mx-0" />
          <h2 className="font-serif text-4xl leading-tight">Cada aventura comienza con un sí.</h2>
          <p className="font-serif text-xl italic opacity-60 leading-relaxed">
            "{DEFAULT_DETAILS.message}"
          </p>
          <div className="pt-8 border-t border-[#cfa461]/10">
            <h4 className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-4">Con la bendición de nuestros padres</h4>
            <div className="grid grid-cols-2 gap-4 text-xs font-serif italic">
              <div className="space-y-1">
                {DEFAULT_DETAILS.parents.bride.map((p, i) => <p key={i}>{p}</p>)}
              </div>
              <div className="space-y-1">
                {DEFAULT_DETAILS.parents.groom.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 3. DETALLES E IMAGEN 3 */}
      <div className="bg-[#f7f2ed] py-24">
        <Section className="grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <div className="space-y-4">
              <span className="text-[#cfa461] text-xs uppercase tracking-[0.4em] font-bold">Dónde & Cuándo</span>
              <h2 className="font-serif text-5xl">La Celebración</h2>
            </div>
            
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <Calendar className="w-6 h-6 text-[#cfa461] mt-1 shrink-0" />
                <div>
                  <h3 className="text-xs uppercase tracking-widest font-bold mb-2">Fecha</h3>
                  <p className="font-serif text-2xl">{DEFAULT_DETAILS.date}</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <MapPin className="w-6 h-6 text-[#cfa461] mt-1 shrink-0" />
                <div>
                  <h3 className="text-xs uppercase tracking-widest font-bold mb-2">Ceremonia Religiosa</h3>
                  <p className="font-serif text-2xl">{DEFAULT_DETAILS.churchName}</p>
                  <p className="text-sm opacity-60 mt-1 max-w-xs">{DEFAULT_DETAILS.churchAddress}</p>
                  <p className="text-sm opacity-60 mt-1 italic flex items-center gap-2">
                    <Clock className="w-3 h-3" /> {DEFAULT_DETAILS.churchTime}
                  </p>
                  <a 
                    href={`https://maps.google.com/?q=${encodeURIComponent(DEFAULT_DETAILS.churchAddress)}`}
                    target="_blank"
                    className="inline-block mt-4 text-[10px] uppercase tracking-widest font-bold text-[#cfa461] border-b border-[#cfa461] pb-1"
                  >
                    Ver Ubicación
                  </a>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <MapPin className="w-6 h-6 text-[#cfa461] mt-1 shrink-0" />
                <div>
                  <h3 className="text-xs uppercase tracking-widest font-bold mb-2">Recepción</h3>
                  <p className="font-serif text-2xl">{DEFAULT_DETAILS.location}</p>
                  <p className="text-sm opacity-60 mt-1 max-w-xs">{DEFAULT_DETAILS.address}</p>
                  <p className="text-sm opacity-60 mt-1 italic flex items-center gap-2">
                    <Clock className="w-3 h-3" /> {DEFAULT_DETAILS.time}
                  </p>
                  <a 
                    href={`https://maps.google.com/?q=${encodeURIComponent(DEFAULT_DETAILS.address)}`}
                    target="_blank"
                    className="inline-block mt-4 text-[10px] uppercase tracking-widest font-bold text-[#cfa461] border-b border-[#cfa461] pb-1"
                  >
                    Ver Ubicación
                  </a>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <Shirt className="w-6 h-6 text-[#cfa461] mt-1 shrink-0" />
                <div>
                  <h3 className="text-xs uppercase tracking-widest font-bold mb-2">Código de Vestimenta</h3>
                  <p className="font-serif text-2xl">{DEFAULT_DETAILS.dressCode}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <motion.div 
               whileInView={{ y: 0, opacity: 1 }}
               initial={{ y: 50, opacity: 0 }}
               transition={{ duration: 1.2 }}
               className="aspect-[3/4] overflow-hidden shadow-2xl"
            >
              <img 
                src={DEFAULT_DETAILS.images[2]} 
                className="w-full h-full object-cover"
                alt="Venue or Detail"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </Section>
      </div>

      {/* 4. MESA DE REGALOS */}
      <Section className="text-center space-y-12">
        <div className="space-y-4">
          <Gift className="w-7 h-7 text-[#cfa461] mx-auto" />
          <h2 className="font-serif text-5xl">Mesa de Regalos</h2>
          <p className="text-sm opacity-50 max-w-sm mx-auto italic leading-relaxed">
            Agradecemos mucho su cariño. Si desean tener un detalle con nosotros, estas son nuestras opciones:
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {DEFAULT_DETAILS.giftRegistry.map((item, idx) => (
            <div key={idx} className="bg-white p-10 rounded-sm border border-[#f0e8de] hover:border-[#cfa461]/30 transition-colors group">
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#cfa461] mb-2">{item.type}</h4>
              <p className="font-serif text-xl mb-4">{item.details}</p>
              <button className="text-[10px] uppercase tracking-widest font-bold border-b border-transparent group-hover:border-[#cfa461] transition-all pb-1">Ver mesa</button>
            </div>
          ))}
        </div>
      </Section>

      {/* 5. CONFIRMACIÓN E IMAGEN 4 */}
      <div className="relative bg-[#3a3a3a] text-white py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={DEFAULT_DETAILS.images[3]} 
            className="w-full h-full object-cover"
            alt="Final background"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <Section className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <h2 className="font-serif text-5xl md:text-7xl">¿Nos acompañas?</h2>
              <p className="text-sm tracking-[0.3em] font-light opacity-60 uppercase italic">
                Favor de confirmar antes del {DEFAULT_DETAILS.rsvpDeadline}
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <a 
                href={`https://wa.me/${DEFAULT_DETAILS.whatsappRSVP}?text=${encodeURIComponent('¡Hola! Me gustaría confirmar mi asistencia a su boda.')}`}
                target="_blank"
                className="w-full md:w-auto px-12 py-6 bg-[#cfa461] text-white text-[11px] uppercase tracking-[0.4em] font-bold rounded-sm hover:bg-[#b08b52] transition-all shadow-xl"
              >
                Confirmar por WhatsApp
              </a>
              <button 
                onClick={addToCalendar}
                className="w-full md:w-auto px-12 py-6 border border-white/20 text-white text-[11px] uppercase tracking-[0.4em] font-bold rounded-sm hover:bg-white/10 transition-all"
              >
                Añadir al Calendario
              </button>
            </div>

            <div className="pt-24 opacity-30 flex flex-col items-center gap-6">
               <div className="h-px w-20 bg-white" />
               <p className="font-serif text-2xl italic">Claudia & Esau</p>
               <p className="text-[9px] tracking-[0.5em] uppercase">Agosto 2026</p>
            </div>
          </motion.div>
        </Section>
      </div>

      {/* Footer minimal */}
      <footer className="py-8 text-center text-[9px] uppercase tracking-[0.3em] opacity-30 bg-[#fcfaf7]">
        Hecho con amor para nuestra familia y amigos
      </footer>
    </div>
  );
}
