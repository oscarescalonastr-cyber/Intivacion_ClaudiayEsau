import { useState, useEffect, useRef, ReactNode, MouseEvent } from 'react';
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
  ChevronDown,
  Church,
  Wine,
  Utensils,
  Home,
  Sparkles,
  Baby,
  Copy,
  Check
} from 'lucide-react';

const WhatsAppIcon = ({ className = "w-5 h-5 flex-shrink-0 text-white" }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512" 
    className={`${className} fill-current`}
  >
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L3 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.4-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
  </svg>
);

const DEFAULT_DETAILS = {
  brideName: "Claudia Galindo Estrada",
  groomName: "Esaú Calixtro Vargas",
  date: "Sábado, 01 de Agosto de 2026",
  time: "04:50 PM",
  churchName: "Parroquia Nuestra Señora del Rosario",
  churchAddress: "Av. Hidalgo 9, Centro, 42130 Mineral del Monte, Hgo.",
  churchMapsUrl: "https://maps.app.goo.gl/HLdHKna6ZjZGibQ67", // REEMPLAZA CON EL LINK DE LA IGLESIA
  churchTime: "3:00 PM",
  location: "Hacienda Real de Velasco",
  venueMapsUrl: "https://maps.app.goo.gl/jXMSx9vsgomciXHG7", // REEMPLAZA CON EL LINK DEL SALÓN
  address: "DE VELASCO #S/N, Centro, 43560 Omitlán de Juárez, Hgo.",
  message: "Con la bendición de nuestros padres, tenemos el honor de invitarte a celebrar nuestro amor.",
  rsvpDeadline: "25 de junio",
  parents: {
    bride: ["Sr. Armando Galindo Cervantes", "Sra. Lucero Estrada Sandoval"],
    groom: ["Sr. Celedonio Calixtro Cortés", "Sra. Simplicia Vargas Rosales"]
  },
  dressCode: "Formal - Etiqueta",
  liverpoolCode: "52010923", // EDITA AQUÍ EL CÓDIGO DE TU MESA DE REGALOS DE LIVERPOOL
  liverpoolUrl: "https://mesaderegalos.liverpool.com.mx/milistaderegalos/52010923/", // REEMPLAZA CON EL EL LINK DIRECTO A TU MESA DE REGALOS (ej. https://mesaderegalos.liverpool.com.mx/m/evento-claudia-y-esau)
  whatsappBride: "+527791088581",
  whatsappGroom: "+527711958350",
  whatsappCabins: "+527716900871", // REEMPLAZA CON EL NÚMERO DE WHATSAPP PARA LA RESERVACIÓN DE LAS CABAÑAS (ej. "Desarrollo turístico los arcos")
  musicUrl: "https://sagaonmedia.s3.us-east-2.amazonaws.com/website/machines_projects/CYE/M_1.mp3", // REEMPLAZA ESTE LINK CON TU CANCIÓN
  images: [
    "https://sagaonmedia.s3.us-east-2.amazonaws.com/website/machines_projects/CYE/C%26E_-26.jpg", // Hero
    "https://sagaonmedia.s3.us-east-2.amazonaws.com/website/machines_projects/CYE/C%26E_-6.jpg", // Story
    "https://sagaonmedia.s3.us-east-2.amazonaws.com/website/machines_projects/CYE/CyE_27.jpg", // Details
    "https://sagaonmedia.s3.us-east-2.amazonaws.com/website/machines_projects/CYE/CyE_28.jpg",  // Final
    "https://sagaonmedia.s3.us-east-2.amazonaws.com/website/machines_projects/CYE/CyE_29.jpg" // Cabañas sugerencia
  ]
};

const ITINERARY_ITEMS = [
  {
    title: "Ceremonia Religiosa",
    time: "3:00 P.M.",
    icon: Church,
  },
  {
    title: "Recepción",
    time: "4:50 P.M.",
    icon: Home,
  },
  {
    title: "Coctelería de Bienvenida",
    time: "5:00 P.M.",
    icon: Wine,
  },
  {
    title: "Ceremonia Civil",
    time: "5:30 P.M.",
    icon: Sparkles,
  },
  {
    title: "Banquete",
    time: "6:10 P.M.",
    icon: Utensils,
  },
  {
    title: "Baile",
    time: "7:00 P.M.",
    icon: Music,
  }
];

const Section = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
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
  const [isMobile, setIsMobile] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { scrollYProgress } = useScroll();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false
  });

  useEffect(() => {
    const targetDate = new Date('2026-08-01T15:00:00');

    const updateTimer = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds, isOver: false });
      }
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 1000);

    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
  }, []);

  const getWhatsAppLink = (phone: string, text: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    const encodedText = encodeURIComponent(text);
    return `https://wa.me/${cleanPhone}?text=${encodedText}`;
  };

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

  const [showCalendarMenu, setShowCalendarMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const getCalendarLinks = () => {
    const title = `Boda de ${DEFAULT_DETAILS.brideName} & ${DEFAULT_DETAILS.groomName}`;
    const description = `¡Estamos muy emocionados de compartir este día tan especial con ustedes!\n\nCeremonia: ${DEFAULT_DETAILS.churchName}\nRecepción: ${DEFAULT_DETAILS.location}`;
    const location = `${DEFAULT_DETAILS.location}, ${DEFAULT_DETAILS.address}`;
    const startDate = "20260801T150000";
    const endDate = "20260801T235900";

    return {
      google: `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}&sf=true&output=xml`,
      outlook: `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=${encodeURIComponent(title)}&startdt=2026-08-01T15:00:00&enddt=2026-08-01T23:59:00&body=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`,
    };
  };

  const downloadICS = () => {
    const title = `Boda de ${DEFAULT_DETAILS.brideName} & ${DEFAULT_DETAILS.groomName}`;
    const description = `¡Estamos muy emocionados de compartir este día tan especial con ustedes!\n\nCeremonia: ${DEFAULT_DETAILS.churchName}\nRecepción: ${DEFAULT_DETAILS.location}`;
    const location = `${DEFAULT_DETAILS.location}, ${DEFAULT_DETAILS.address}`;
    const startDate = "20260801T150000";
    const endDate = "20260801T235900";

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
      `LOCATION:${location}`,
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
      <header className="relative h-screen min-h-[700px] w-full overflow-hidden flex items-end md:items-center justify-center pb-32 md:pb-0">
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
            <h1 className="font-serif text-3xl sm:text-4xl md:text-7xl mb-6 md:mb-8 leading-[1.2] text-white">
              {DEFAULT_DETAILS.brideName} 
              <span className="block text-xl md:text-4xl italic my-3 md:my-4 text-[#cfa461] font-serif">&</span> 
              {DEFAULT_DETAILS.groomName}
            </h1>
            <div className="h-px w-16 bg-[#cfa461] mx-auto opacity-40" />
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

      {/* CONTADOR DE TIEMPO (COUNTDOWN) - OPCIÓN 2 */}
      <div className="bg-[#fcfaf7] pt-24 pb-12">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="flex flex-col items-center">
              <div className="h-[1px] w-20 bg-[#cfa461]/35 mb-6" />
              <h2 className="font-serif text-3xl md:text-4xl italic text-neutral-800 font-normal">
                Faltan sólo...
              </h2>
            </div>

            {/* Countdown Grid */}
            <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-xl mx-auto pt-4">
              {/* Days */}
              <div className="bg-white border border-[#f0e8de] rounded-xl p-3 sm:p-5 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md">
                <div className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#cfa461] font-medium leading-none">
                  {timeLeft.days}
                </div>
                <div className="text-[9px] sm:text-[10px] tracking-[0.15em] uppercase text-neutral-500 font-sans font-bold mt-2.5">
                  Días
                </div>
              </div>

              {/* Hours */}
              <div className="bg-white border border-[#f0e8de] rounded-xl p-3 sm:p-5 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md">
                <div className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#cfa461] font-medium leading-none">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </div>
                <div className="text-[9px] sm:text-[10px] tracking-[0.15em] uppercase text-neutral-500 font-sans font-bold mt-2.5">
                  Horas
                </div>
              </div>

              {/* Minutes */}
              <div className="bg-white border border-[#f0e8de] rounded-xl p-3 sm:p-5 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md">
                <div className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#cfa461] font-medium leading-none">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </div>
                <div className="text-[9px] sm:text-[10px] tracking-[0.15em] uppercase text-neutral-500 font-sans font-bold mt-2.5">
                  Minutos
                </div>
              </div>

              {/* Seconds */}
              <div className="bg-white border border-[#f0e8de] rounded-xl p-3 sm:p-5 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md">
                <div className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#cfa461] font-medium leading-none">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </div>
                <div className="text-[9px] sm:text-[10px] tracking-[0.15em] uppercase text-neutral-500 font-sans font-bold mt-2.5">
                  Segundos
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <div className="h-[1px] w-20 bg-[#cfa461]/35 mt-6" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* 2. FRASE E IMAGEN 2 */}
      <Section className="grid md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1">
          <motion.div 
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: 50, opacity: 0 }}
            transition={{ duration: 1.2 }}
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
                    href={DEFAULT_DETAILS.churchMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
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
                    href={DEFAULT_DETAILS.venueMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
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
                  <div className="mt-3 space-y-1 text-xs opacity-80 leading-relaxed font-sans">
                    <p><span className="font-bold text-[#cfa461]/90">Damas:</span> Vestido largo (no blanco, no verde, ni rojo)</p>
                    <p><span className="font-bold text-[#cfa461]/90">Caballeros:</span> Traje formal (no azul)</p>
                  </div>
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

      {/* ITINERARIO */}
      <Section className="py-24 max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-20">
          <Clock className="w-7 h-7 text-[#cfa461] mx-auto" />
          <h2 className="font-serif text-5xl">Itinerario</h2>
          <p className="text-sm opacity-50 max-w-sm mx-auto italic leading-relaxed">
            Cada instante ha sido planeado con ilusión para compartirlo a su lado.
          </p>
        </div>

        <div className="relative py-12">
          {/* Vertical central timeline line with olive/gold shade */}
          <div className="absolute left-[30px] md:left-1/2 top-4 bottom-4 w-[1.5px] bg-[#cfa461]/30 -translate-x-[0.75px]" />

          {/* Items Container */}
          <div className="space-y-8 md:space-y-10 relative">
            {ITINERARY_ITEMS.map((item, idx) => {
              const IconComponent = item.icon;
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className="relative flex flex-col md:flex-row items-center group py-2">
                  {/* Icon node centered on the timeline line (replaces the heart) */}
                  <div className="absolute left-[30px] md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-300">
                    <div className="w-11 h-11 rounded-full bg-white border border-[#cfa461]/45 flex items-center justify-center shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:bg-[#fcfaf7] group-hover:border-[#cfa461]">
                      <IconComponent className="w-5 h-5 text-[#a37f45] stroke-[1.3] group-hover:text-[#8f6d37] transition-colors" />
                    </div>
                  </div>

                  {/* Alternating wrapper structure with elegant content */}
                  <div className="w-full flex flex-col md:flex-row items-center">
                    {/* Even indexes on Left column (Desktop), hidden on desktop for Odd indexes */}
                    <div className={`w-full md:w-1/2 pl-[70px] md:pl-0 md:pr-14 flex md:justify-end text-left md:text-right ${isEven ? 'block' : 'hidden md:block md:opacity-0 md:pointer-events-none'}`}>
                      <div className="space-y-0.5">
                        <p className="font-sans text-[11px] tracking-[0.15em] uppercase text-[#cfa461] font-bold">{item.time}</p>
                        <h3 className="font-serif text-lg md:text-xl text-neutral-800 font-medium tracking-wide">{item.title}</h3>
                      </div>
                    </div>

                    {/* Gap spacing on desktop to keep timeline balanced */}
                    <div className="hidden md:block w-16" />

                    {/* Odd indexes on Right column (Desktop), hidden on desktop for Even indexes */}
                    <div className={`w-full md:w-1/2 pl-[70px] md:pl-0 md:pl-14 flex justify-start text-left ${!isEven ? 'block' : 'hidden md:block md:opacity-0 md:pointer-events-none'}`}>
                      <div className="space-y-0.5">
                        <p className="font-sans text-[11px] tracking-[0.15em] uppercase text-[#cfa461] font-bold">{item.time}</p>
                        <h3 className="font-serif text-lg md:text-xl text-neutral-800 font-medium tracking-wide">{item.title}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* NO NIÑOS */}
      <Section className="py-10 max-w-lg mx-auto px-4">
        <div className="bg-[#fcfaf7] p-6 rounded-xl border border-[#f5ece0] text-center space-y-4 shadow-sm hover:border-[#cfa461]/35 hover:bg-[#faf6f0] transition-all duration-500 relative overflow-hidden group">
          {/* Subtle elegant corners */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#cfa461]/30 rounded-tl pointer-events-none" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#cfa461]/30 rounded-tr pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[#cfa461]/30 rounded-bl pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#cfa461]/30 rounded-br pointer-events-none" />
          
          <div className="w-12 h-12 rounded-full bg-white border border-[#f0e8de] flex items-center justify-center text-[#cfa461] mx-auto shadow-sm group-hover:scale-105 transition-transform duration-500">
            <Baby className="w-5 h-5 stroke-[1.2]" />
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-lg text-neutral-800 tracking-widest uppercase font-medium">Solo Adultos</h3>
            <p className="text-xs text-neutral-600 font-serif leading-relaxed max-w-sm mx-auto italic px-2">
              Apreciamos a tus peques, sin embargo, este evento será solo para adultos. Esperamos de corazón que esto no sea impedimento para que nos acompañen.
            </p>
          </div>
        </div>
      </Section>

      {/* 4. MESA DE REGALOS */}
      <Section className="text-center space-y-12">
        <div className="space-y-4">
          <Gift className="w-7 h-7 text-[#cfa461] mx-auto" />
          <h2 className="font-serif text-5xl">Mesa de Regalos</h2>
          <p className="text-sm opacity-60 max-w-sm mx-auto italic leading-relaxed text-neutral-600 font-serif">
            Agradecemos mucho su cariño y buenos deseos. Si desean tener un detalle con nosotros, ponemos a su disposición nuestra mesa de regalos:
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="bg-white p-6 md:p-8 rounded-xl border border-[#f0e8de] shadow-md hover:shadow-lg hover:border-[#cfa461]/40 transition-all duration-500 relative overflow-hidden group">
            {/* Background elegant decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#cfa461]/5 to-transparent rounded-bl-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#cfa461]/5 to-transparent rounded-tr-full pointer-events-none" />
            
            {/* Elegant Inner Frame */}
            <div className="border border-[#cfa461]/25 p-6 rounded-lg space-y-6 relative z-10">
              
              {/* Brand Header */}
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#cfa461] block">Mesa de Regalos</span>
                <span className="font-serif text-2xl tracking-wide text-neutral-800 font-medium block">Liverpool</span>
              </div>

              {/* Decorative divider separator */}
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-8 bg-[#cfa461]/30" />
                <Gift className="w-4 h-4 text-[#cfa461] opacity-70" />
                <div className="h-px w-8 bg-[#cfa461]/30" />
              </div>

              {/* Code Container */}
              <div className="bg-[#fcfaf7] p-5 rounded-lg border border-[#f5ece0] relative group/code transition-colors hover:bg-[#faf6f0]">
                <p className="text-[10px] uppercase tracking-[0.15em] text-neutral-500 font-bold mb-1.5">Código del Evento</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="font-serif text-3xl md:text-4xl text-neutral-800 font-normal tracking-wider">
                    {DEFAULT_DETAILS.liverpoolCode}
                  </span>
                </div>
              </div>

              {/* Buttons Container */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {/* Copy Code Button */}
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(DEFAULT_DETAILS.liverpoolCode);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#fcfaf7] hover:bg-[#cfa461]/10 border border-[#cfa461]/40 text-neutral-700 text-xs tracking-wider uppercase font-sans font-bold transition-all duration-300 shadow-sm active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                      <span className="text-emerald-700 font-bold">¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#a37f45]" />
                      <span>Copiar Código</span>
                    </>
                  )}
                </button>

                {/* Visit Site Button */}
                <a 
                  href={DEFAULT_DETAILS.liverpoolUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#cfa461] hover:bg-[#b08b52] text-white text-xs tracking-wider uppercase font-sans font-bold transition-all duration-300 shadow-md active:scale-95 whitespace-nowrap"
                >
                  <span>Ir a la tienda</span>
                </a>
              </div>

            </div>
          </div>
        </div>
      </Section>

      {/* 5. CONFIRMACIÓN */}
      <div className="bg-[#fcfaf7] pt-24 pb-16 text-center">
        <Section className="max-w-2xl mx-auto px-6 py-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="font-serif text-4xl md:text-5xl text-[#cfa461] italic font-normal">
                Confirmación de asistencia
              </h2>
              <p className="text-sm font-serif italic text-neutral-600 max-w-lg mx-auto leading-relaxed">
                Tu presencia es muy importante para nosotros.
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#cfa461] font-bold">
                Favor de confirmar antes del {DEFAULT_DETAILS.rsvpDeadline}
              </p>
            </div>

            <div className="pt-4 flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-center px-4">
              {/* Bride Button */}
              <a 
                href={getWhatsAppLink(DEFAULT_DETAILS.whatsappBride, '¡Hola Claudia! Me gustaría confirmar mi asistencia a su boda.')}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group inline-flex items-center w-full md:w-[260px] h-14 hover:scale-105 transition-all duration-300"
              >
                {/* Circle on the left */}
                <div className="absolute left-0 w-14 h-14 rounded-full bg-[#a37f45] group-hover:bg-[#8f6d37] flex items-center justify-center text-white shadow-md z-20 transition-all duration-300 border-2 border-white">
                  <WhatsAppIcon className="w-[21px] h-6 text-white" />
                </div>
                {/* Pill on the right */}
                <div className="w-full h-11 pl-16 pr-[20px] ml-3 bg-[#cfa461] group-hover:bg-[#b08b52] rounded-full flex items-center justify-center text-white text-[11px] uppercase tracking-[0.18em] font-sans font-bold shadow-md z-10 transition-colors">
                  Número de la novia
                </div>
               </a>

              {/* Groom Button */}
              <a 
                href={getWhatsAppLink(DEFAULT_DETAILS.whatsappGroom, '¡Hola Esaú! Me gustaría confirmar mi asistencia a su boda.')}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group inline-flex items-center w-full md:w-[260px] h-14 hover:scale-105 transition-all duration-300"
              >
                {/* Circle on the left */}
                <div className="absolute left-0 w-14 h-14 rounded-full bg-[#a37f45] group-hover:bg-[#8f6d37] flex items-center justify-center text-white shadow-md z-20 transition-all duration-300 border-2 border-white">
                  <WhatsAppIcon className="w-[21px] h-6 text-white" />
                </div>
                {/* Pill on the right */}
                <div className="w-full h-11 pl-16 pr-[20px] ml-3 bg-[#cfa461] group-hover:bg-[#b08b52] rounded-full flex items-center justify-center text-white text-[11px] uppercase tracking-[0.18em] font-sans font-bold shadow-md z-10 transition-colors">
                  Número del novio
                </div>
              </a>
            </div>


          </motion.div>
        </Section>
      </div>

      {/* FINAL COUPLE PHOTO WITH OVERLAY TORN EDGES */}
      <div className="relative w-full h-[450px] md:h-[600px] overflow-hidden bg-[#fcfaf7]">
        {/* Full-bleed Photo with celebration animation */}
        <motion.div 
          whileInView={{ y: 0, opacity: 1 }}
          initial={{ y: 50, opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={DEFAULT_DETAILS.images[3]} 
            className="w-full h-full object-cover object-center scale-105"
            alt="Final landscape portrait"
            referrerPolicy="no-referrer"
          />
          {/* Subtle vignette on top of the image for elegant contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/25" />
        </motion.div>

        {/* Top Paper Tear Overlay (blends with light background above) */}
        <div className="absolute top-0 inset-x-0 z-10 pointer-events-none select-none h-16 overflow-hidden">
          <svg 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none" 
            className="absolute inset-x-0 -top-4 block w-full h-[80px]"
            style={{ transform: 'rotate(180deg)', filter: 'drop-shadow(0px -5px 6px rgba(0,0,0,0.22))' }}
          >
            <defs>
              <filter id="paper-tear-top">
                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>
            {/* White inner fiber exposed layer for top paper tear */}
            <path 
              d="M 0,22 L 12,25 L 24,20 L 36,18 L 48,15 L 60,12 L 72,16 L 84,13 L 96,18 L 108,15 L 120,21 L 132,19 L 144,24 L 156,21 L 168,26 L 180,23 L 192,28 L 204,26 L 216,31 L 228,29 L 240,34 L 252,32 L 264,37 L 276,34 L 288,38 L 300,35 L 312,39 L 324,37 L 336,41 L 348,38 L 360,42 L 372,39 L 384,41 L 396,38 L 408,39 L 420,36 L 432,37 L 444,34 L 456,33 L 468,30 L 480,28 L 492,25 L 504,26 L 516,23 L 528,21 L 540,18 L 552,19 L 564,16 L 576,14 L 588,11 L 600,13 L 612,11 L 624,14 L 636,11 L 648,15 L 660,13 L 672,17 L 684,15 L 696,20 L 708,18 L 720,22 L 732,20 L 744,25 L 756,23 L 768,28 L 780,26 L 792,31 L 804,29 L 816,33 L 828,31 L 840,35 L 852,32 L 864,36 L 876,33 L 888,35 L 900,32 L 912,33 L 924,30 L 936,28 L 948,25 L 960,23 L 972,20 L 984,21 L 996,18 L 1008,16 L 1010,13 L 1020,14 L 1030,11 L 1040,9 L 1050,6 L 1060,8 L 1070,6 L 1080,9 L 1090,6 L 1100,10 L 1110,8 L 1120,12 L 1130,10 L 1140,14 L 1150,12 L 1160,15 L 1170,12 L 1180,14 L 1190,11 L 1200,9 L 1200,120 L 0,120 Z" 
              fill="#ffffff" 
              filter="url(#paper-tear-top)"
              style={{ transform: 'translateY(-2px)' }}
            />
            {/* Main paper sheet layer top */}
            <path 
              d="M 0,22 L 12,25 L 24,20 L 36,18 L 48,15 L 60,12 L 72,16 L 84,13 L 96,18 L 108,15 L 120,21 L 132,19 L 144,24 L 156,21 L 168,26 L 180,23 L 192,28 L 204,26 L 216,31 L 228,29 L 240,34 L 252,32 L 264,37 L 276,34 L 288,38 L 300,35 L 312,39 L 324,37 L 336,41 L 348,38 L 360,42 L 372,39 L 384,41 L 396,38 L 408,39 L 420,36 L 432,37 L 444,34 L 456,33 L 468,30 L 480,28 L 492,25 L 504,26 L 516,23 L 528,21 L 540,18 L 552,19 L 564,16 L 576,14 L 588,11 L 600,13 L 612,11 L 624,14 L 636,11 L 648,15 L 660,13 L 672,17 L 684,15 L 696,20 L 708,18 L 720,22 L 732,20 L 744,25 L 756,23 L 768,28 L 780,26 L 792,31 L 804,29 L 816,33 L 828,31 L 840,35 L 852,32 L 864,36 L 876,33 L 888,35 L 900,32 L 912,33 L 924,30 L 936,28 L 948,25 L 960,23 L 972,20 L 984,21 L 996,18 L 1008,16 L 1010,13 L 1020,14 L 1030,11 L 1040,9 L 1050,6 L 1060,8 L 1070,6 L 1080,9 L 1090,6 L 1100,10 L 1110,8 L 1120,12 L 1130,10 L 1140,14 L 1150,12 L 1160,15 L 1170,12 L 1180,14 L 1190,11 L 1200,9 L 1200,120 L 0,120 Z" 
              fill="#fcfaf7" 
              filter="url(#paper-tear-top)"
            />
          </svg>
        </div>

        {/* Bottom Paper Tear Overlay (blends with light background below) */}
        <div className="absolute bottom-0 inset-x-0 z-10 pointer-events-none select-none h-16 overflow-hidden">
          <svg 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none" 
            className="absolute inset-x-0 -bottom-4 block w-full h-[80px]"
            style={{ filter: 'drop-shadow(0px 5px 6px rgba(0,0,0,0.22))' }}
          >
            <defs>
              <filter id="paper-tear-bottom">
                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>
            {/* White inner fiber exposed layer for bottom paper tear */}
            <path 
              d="M 0,22 L 12,25 L 24,20 L 36,18 L 48,15 L 60,12 L 72,16 L 84,13 L 96,18 L 108,15 L 120,21 L 132,19 L 144,24 L 156,21 L 168,26 L 180,23 L 192,28 L 204,26 L 216,31 L 228,29 L 240,34 L 252,32 L 264,37 L 276,34 L 288,38 L 300,35 L 312,39 L 324,37 L 336,41 L 348,38 L 360,42 L 372,39 L 384,41 L 396,38 L 408,39 L 420,36 L 432,37 L 444,34 L 456,33 L 468,30 L 480,28 L 492,25 L 504,26 L 516,23 L 528,21 L 540,18 L 552,19 L 564,16 L 576,14 L 588,11 L 600,13 L 612,11 L 624,14 L 636,11 L 648,15 L 660,13 L 672,17 L 684,15 L 696,20 L 708,18 L 720,22 L 732,20 L 744,25 L 756,23 L 768,28 L 780,26 L 792,31 L 804,29 L 816,33 L 828,31 L 840,35 L 852,32 L 864,36 L 876,33 L 888,35 L 900,32 L 912,33 L 924,30 L 936,28 L 948,25 L 960,23 L 972,20 L 984,21 L 996,18 L 1008,16 L 1010,13 L 1020,14 L 1030,11 L 1040,9 L 1050,6 L 1060,8 L 1070,6 L 1080,9 L 1090,6 L 1100,10 L 1110,8 L 1120,12 L 1130,10 L 1140,14 L 1150,12 L 1160,15 L 1170,12 L 1180,14 L 1190,11 L 1200,9 L 1200,120 L 0,120 Z" 
              fill="#ffffff" 
              filter="url(#paper-tear-bottom)"
              style={{ transform: 'translateY(-2px)' }}
            />
            {/* Main paper sheet layer bottom */}
            <path 
              d="M 0,22 L 12,25 L 24,20 L 36,18 L 48,15 L 60,12 L 72,16 L 84,13 L 96,18 L 108,15 L 120,21 L 132,19 L 144,24 L 156,21 L 168,26 L 180,23 L 192,28 L 204,26 L 216,31 L 228,29 L 240,34 L 252,32 L 264,37 L 276,34 L 288,38 L 300,35 L 312,39 L 324,37 L 336,41 L 348,38 L 360,42 L 372,39 L 384,41 L 396,38 L 408,39 L 420,36 L 432,37 L 444,34 L 456,33 L 468,30 L 480,28 L 492,25 L 504,26 L 516,23 L 528,21 L 540,18 L 552,19 L 564,16 L 576,14 L 588,11 L 600,13 L 612,11 L 624,14 L 636,11 L 648,15 L 660,13 L 672,17 L 684,15 L 696,20 L 708,18 L 720,22 L 732,20 L 744,25 L 756,23 L 768,28 L 780,26 L 792,31 L 804,29 L 816,33 L 828,31 L 840,35 L 852,32 L 864,36 L 876,33 L 888,35 L 900,32 L 912,33 L 924,30 L 936,28 L 948,25 L 960,23 L 972,20 L 984,21 L 996,18 L 1008,16 L 1010,13 L 1020,14 L 1030,11 L 1040,9 L 1050,6 L 1060,8 L 1070,6 L 1080,9 L 1090,6 L 1100,10 L 1110,8 L 1120,12 L 1130,10 L 1140,14 L 1150,12 L 1160,15 L 1170,12 L 1180,14 L 1190,11 L 1200,9 L 1200,120 L 0,120 Z" 
              fill="#fcfaf7" 
              filter="url(#paper-tear-bottom)"
            />
          </svg>
        </div>
      </div>

      {/* SUGERENCIA DE HOSPEDAJE */}
      <div className="bg-[#fcfaf7] pt-24 pb-8 text-center">
        <Section className="max-w-2xl mx-auto px-6 py-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex flex-col items-center space-y-4">
              <Home className="w-8 h-8 text-[#cfa461] stroke-[1.2]" />
              <h2 className="font-serif text-3xl md:text-4xl text-[#cfa461] italic font-normal">
                Sugerencia de Hospedaje
              </h2>
              <p className="text-sm font-serif italic text-neutral-600 max-w-lg mx-auto leading-relaxed">
                Si optaste por acompañarnos a nuestra celebración y en tus planes está hospedarte cerca de la hacienda Real de Velasco, te sugerimos el siguiente complejo de cabañas:
              </p>
              
              <div className="bg-white rounded-2xl border border-[#f5ece0] shadow-sm max-w-md w-full overflow-hidden transition-all duration-300 hover:shadow-md hover:scale-[1.01] group">
                {/* Image of the lodging */}
                <div className="aspect-[16/10] w-full overflow-hidden relative">
                  <img 
                    src={DEFAULT_DETAILS.images[4]} 
                    alt="Sugerencia de Hospedaje" 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/5" />
                </div>
                
                <div className="p-6 space-y-3">
                  <p className="font-serif text-lg text-neutral-800 font-medium">
                    "Desarrollo turístico los arcos"
                  </p>
                  <div className="h-[1px] w-12 bg-[#cfa461]/35 mx-auto" />
                  <p className="text-xs text-neutral-500 font-sans tracking-wide">
                    Al momento de realizar tu reservación menciona el siguiente código:
                  </p>
                  <p className="text-sm font-sans font-bold text-[#cfa461] bg-[#fcfaf7] py-2 px-4 rounded-lg inline-block border border-[#f5ece0]">
                    C&E 01/08/26
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-center items-center px-4">
              {/* WhatsApp Button */}
              <a 
                href={getWhatsAppLink(DEFAULT_DETAILS.whatsappCabins, '¡Hola! Me gustaría realizar una reservación en las cabañas "Desarrollo turístico los arcos" con el código C&E 01/08/26.')}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group inline-flex items-center w-full md:w-[280px] h-14 hover:scale-105 transition-all duration-300"
              >
                {/* Circle on the left */}
                <div className="absolute left-0 w-14 h-14 rounded-full bg-[#a37f45] group-hover:bg-[#8f6d37] flex items-center justify-center text-white shadow-md z-20 transition-all duration-300 border-2 border-white">
                  <WhatsAppIcon className="w-[21px] h-6 text-white" />
                </div>
                {/* Pill on the right */}
                <div className="w-full h-11 pl-16 pr-[20px] ml-3 bg-[#cfa461] group-hover:bg-[#b08b52] rounded-full flex items-center justify-center text-white text-[11px] uppercase tracking-[0.18em] font-sans font-bold shadow-md z-10 transition-colors">
                  Contactar por WhatsApp
                </div>
              </a>
            </div>
          </motion.div>
        </Section>
      </div>

      {/* BEAUTIFUL CLOSING MONOGRAM & DATE SECTION */}
      <div className="bg-[#fcfaf7] py-24 text-center">
        <Section className="max-w-2xl mx-auto px-6 py-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="flex flex-col items-center justify-center space-y-10"
          >
            {/* Elegant foliage wreath monogram customized for light background with gold */}
            <div className="relative flex flex-col items-center justify-center p-8 bg-white rounded-full border border-[#cfa461]/25 w-44 h-44 mx-auto shadow-sm hover:scale-105 duration-500 transition-transform">
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-[#cfa461] fill-none stroke-current stroke-[1.2] opacity-80">
                <circle cx="50" cy="50" r="40" strokeWidth="1" strokeDasharray="3 3 M 50,12" />
                <path d="M 50,12 C 30,12 16,28 16,50 C 16,72 30,88 50,88 C 70,88 84,72 84,50 C 84,28 70,12 50,12" strokeWidth="1" strokeDasharray="2 1.5" />
                {/* Handcrafted leaves on the leaf crown */}
                <path d="M 24,30 Q 18,24 22,18 Q 28,24 24,30 Z" className="fill-[#cfa461]" />
                <path d="M 16,45 Q 10,41 12,34 Q 18,38 16,45 Z" className="fill-[#cfa461]" />
                <path d="M 17,55 Q 11,60 14,67 Q 20,62 17,55 Z" className="fill-[#cfa461]" />
                <path d="M 26,71 Q 20,77 25,83 Q 31,77 26,71 Z" className="fill-[#cfa461]" />
                <path d="M 76,30 Q 82,24 78,18 Q 72,24 76,30 Z" className="fill-[#cfa461]" />
                <path d="M 84,45 Q 90,41 88,34 Q 82,38 84,45 Z" className="fill-[#cfa461]" />
                <path d="M 83,55 Q 89,60 86,67 Q 80,62 83,55 Z" className="fill-[#cfa461]" />
                <path d="M 74,71 Q 80,77 75,83 Q 69,77 74,71 Z" className="fill-[#cfa461]" />
              </svg>
              <div className="text-center z-10 space-y-1">
                <p className="font-serif text-3xl tracking-wider text-[#a37f45] font-medium flex items-center justify-center gap-1">
                  C <span className="text-xl text-[#cfa461]">♥</span> E
                </p>
              </div>
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
