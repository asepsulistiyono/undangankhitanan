import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MapPin, Calendar, Clock, Copy, Check, ChevronDown, MessageCircle, Gift, Star, Moon, Sparkles, X, Send, Users, Settings, ArrowLeft, Image, Music, Share2, Volume2, VolumeX } from 'lucide-react';
import { InvitationData, GuestMessage } from './types';
import { defaultData, themes } from './data';

// ============ HOOKS ============
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000)
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

// ============ FLOATING PARTICLES ============
function FloatingParticles() {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 8 + Math.random() * 7,
    size: 8 + Math.random() * 16,
    type: ['🌙', '⭐', '✨', '🌿', '🍃'][Math.floor(Math.random() * 5)]
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute animate-leaf-fall"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            fontSize: `${p.size}px`,
            opacity: 0.4
          }}
        >
          {p.type}
        </div>
      ))}
    </div>
  );
}

// ============ ORNAMENT COMPONENTS ============
function IslamicOrnament({ type }: { type: string }) {
  switch (type) {
    case 'kaligrafi-bismillah':
      return (
        <div className="text-center my-6">
          <p className="arabic-text text-3xl md:text-4xl" style={{ color: 'var(--primary)' }}>
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>
        </div>
      );
    case 'motif-masjid':
      return (
        <div className="text-center my-4">
          <svg width="120" height="60" viewBox="0 0 120 60" className="mx-auto" style={{ color: 'var(--primary)' }}>
            <path d="M60 5 L60 15 M55 5 Q60 0 65 5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M30 35 Q30 15 60 15 Q90 15 90 35" fill="none" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="25" y="35" width="70" height="25" fill="none" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="50" y="40" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1"/>
            <path d="M20 35 L20 60 M100 35 L100 60" stroke="currentColor" strokeWidth="2"/>
            <circle cx="20" cy="30" r="3" fill="currentColor"/>
            <circle cx="100" cy="30" r="3" fill="currentColor"/>
          </svg>
        </div>
      );
    case 'bulan-sabit':
      return (
        <div className="text-center my-4">
          <svg width="80" height="80" viewBox="0 0 80 80" className="mx-auto" style={{ color: 'var(--primary)' }}>
            <path d="M50 10 A30 30 0 1 0 50 70 A22 22 0 1 1 50 10" fill="none" stroke="currentColor" strokeWidth="1.5"/>
            <polygon points="65,35 67,40 72,40 68,43 70,48 65,45 60,48 62,43 58,40 63,40" fill="currentColor"/>
          </svg>
        </div>
      );
    case 'geometris':
      return (
        <div className="text-center my-4">
          <svg width="200" height="40" viewBox="0 0 200 40" className="mx-auto" style={{ color: 'var(--primary)' }}>
            <path d="M0 20 L20 0 L40 20 L60 0 L80 20 L100 0 L120 20 L140 0 L160 20 L180 0 L200 20" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
            <path d="M0 20 L20 40 L40 20 L60 40 L80 20 L100 40 L120 20 L140 40 L160 20 L180 40 L200 20" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
            <circle cx="100" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="100" cy="20" r="4" fill="currentColor" opacity="0.3"/>
          </svg>
        </div>
      );
    case 'arabesque':
      return (
        <div className="text-center my-4">
          <svg width="200" height="40" viewBox="0 0 200 40" className="mx-auto" style={{ color: 'var(--primary)' }}>
            <path d="M20 20 Q50 0 80 20 Q110 40 140 20 Q170 0 200 20" fill="none" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M0 20 Q30 40 60 20 Q90 0 120 20 Q150 40 180 20" fill="none" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="100" cy="20" r="5" fill="currentColor" opacity="0.4"/>
          </svg>
        </div>
      );
    default:
      return null;
  }
}

function OrnamentBorder({ type }: { type: string }) {
  const patterns: Record<string, string> = {
    sunda: "M0 10 Q15 0 30 10 Q45 20 60 10 Q75 0 90 10",
    jawa: "M0 10 L10 0 L20 10 L30 0 L40 10 L50 0 L60 10 L70 0 L80 10 L90 0",
    betawi: "M0 10 L15 0 L30 10 L45 0 L60 10 L75 0 L90 10",
    bali: "M0 10 Q10 0 20 10 Q30 20 40 10 Q50 0 60 10 Q70 20 80 10 Q90 0 100 10",
    minang: "M0 10 C10 0 20 0 30 10 C40 20 50 20 60 10 C70 0 80 0 90 10",
    dayak: "M0 10 L15 5 L30 10 L45 5 L60 10 L75 5 L90 10",
    modern: "M0 10 L90 10"
  };

  return (
    <svg width="100%" height="20" viewBox="0 0 90 20" preserveAspectRatio="none" className="my-4" style={{ color: 'var(--primary)' }}>
      <path d={patterns[type] || patterns.modern} fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
    </svg>
  );
}

// ============ COVER COMPONENT ============
function Cover({ data, guestName, onOpen }: { data: InvitationData; guestName: string; onOpen: () => void }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(onOpen, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: `linear-gradient(135deg, var(--bg), var(--primary))` }}>
      <FloatingParticles />
      <div className="absolute inset-0 islamic-pattern opacity-30" />
      
      <motion.div
        className="relative text-center px-6 max-w-md mx-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Islamic Ornament */}
        <IslamicOrnament type={data.islamicOrnamentId} />
        
        {/* Envelope Icon */}
        <motion.div
          className="mb-6"
          animate={isOpening ? { scale: 0, opacity: 0 } : { scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center" style={{ background: 'var(--primary)', boxShadow: '0 8px 30px rgba(0,0,0,0.2)' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="M2 4l10 8 10-8"/>
            </svg>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm uppercase tracking-[4px] mb-2" style={{ color: 'var(--secondary)' }}>Undangan</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--primary)' }}>
            Syukuran Khitanan
          </h1>
          <OrnamentBorder type={data.ornamentId} />
        </motion.div>

        {/* Child Photo Placeholder */}
        <motion.div
          className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-4"
          style={{ borderColor: 'var(--secondary)' }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
        >
          {data.childName.photo ? (
            <img src={data.childName.photo} alt={data.childName.full} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl" style={{ background: `linear-gradient(135deg, var(--primary), var(--primary-light))` }}>
              👦
            </div>
          )}
        </motion.div>

        {/* Child Name */}
        <motion.h2
          className="font-display text-4xl md:text-5xl font-bold mb-2"
          style={{ color: 'var(--primary)' }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {data.childName.full}
        </motion.h2>

        {/* Date */}
        <motion.p
          className="text-lg mb-2"
          style={{ color: 'var(--text-light)' }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          {data.dateLabel}
        </motion.p>

        {/* Guest Name */}
        {guestName && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <p className="text-sm mb-1" style={{ color: 'var(--text-light)' }}>Kepada Yth.</p>
            <p className="font-display text-xl font-semibold" style={{ color: 'var(--primary)' }}>
              {guestName}
            </p>
          </motion.div>
        )}

        {/* Open Button */}
        <motion.button
          onClick={handleOpen}
          className="mt-8 btn-primary text-lg px-8 py-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Sparkles size={20} />
          Buka Undangan
        </motion.button>

        {/* Parents */}
        <motion.p
          className="mt-6 text-sm"
          style={{ color: 'var(--text-light)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          {data.parents.father} & {data.parents.mother}
        </motion.p>
      </motion.div>
    </div>
  );
}

// ============ COUNTDOWN COMPONENT ============
function Countdown({ targetDate }: { targetDate: string }) {
  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  return (
    <div className="flex justify-center gap-3 md:gap-4 flex-wrap">
      {[
        { value: days, label: 'Hari' },
        { value: hours, label: 'Jam' },
        { value: minutes, label: 'Menit' },
        { value: seconds, label: 'Detik' }
      ].map((item, i) => (
        <div key={i} className="countdown-box">
          <div className="countdown-number">{String(item.value).padStart(2, '0')}</div>
          <div className="countdown-label">{item.label}</div>
        </div>
      ))}
    </div>
  );
}

// ============ SECTION WRAPPER ============
function Section({ children, className = '', id = '' }: { children: React.ReactNode; className?: string; id?: string }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      id={id}
      ref={ref}
      className={`py-16 md:py-20 px-4 md:px-8 ${className} ${isVisible ? 'scroll-reveal visible' : 'scroll-reveal'}`}
    >
      <div className="max-w-2xl mx-auto">
        {children}
      </div>
    </section>
  );
}

// ============ MAIN INVITATION ============
function MainInvitation({ data, guestName }: { data: InvitationData; guestName: string }) {
  const [messages, setMessages] = useState<GuestMessage[]>(() => {
    const saved = localStorage.getItem('khitanan_messages');
    return saved ? JSON.parse(saved) : [];
  });
  const [newMessage, setNewMessage] = useState<{ name: string; attendance: 'hadir' | 'tidak'; count: number; message: string }>({ name: guestName || '', attendance: 'hadir', count: 1, message: '' });
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    localStorage.setItem('khitanan_messages', JSON.stringify(messages));
  }, [messages]);

  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.name || !newMessage.message) return;
    const msg: GuestMessage = {
      id: Date.now().toString(),
      ...newMessage,
      timestamp: Date.now()
    };
    setMessages(prev => [msg, ...prev]);
    setNewMessage({ name: '', attendance: 'hadir', count: 1, message: '' });
  };

  const copyToClipboard = (text: string, bank: string) => {
    navigator.clipboard.writeText(text.replace(/\s/g, ''));
    setCopiedBank(bank);
    setTimeout(() => setCopiedBank(null), 2000);
  };

  // Gallery images - using placeholder gradients
  const galleryImages = data.gallery.length > 0 ? data.gallery : [
    { src: '', caption: `${data.childName.short} sedang mengaji`, gradient: 'linear-gradient(135deg, #065f46, #059669)' },
    { src: '', caption: `${data.childName.short} di sekolah`, gradient: 'linear-gradient(135deg, #d97706, #f59e0b)' },
    { src: '', caption: 'Keluarga bahagia', gradient: 'linear-gradient(135deg, #1e3a5f, #2563eb)' },
    { src: '', caption: `Persiapan khitanan`, gradient: 'linear-gradient(135deg, #5b21b6, #7c3aed)' },
    { src: '', caption: `${data.childName.short} bermain`, gradient: 'linear-gradient(135deg, #0f766e, #14b8a6)' },
    { src: '', caption: 'Foto bersama keluarga', gradient: 'linear-gradient(135deg, #92400e, #b45309)' },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <FloatingParticles />

      {/* Music Toggle */}
      <button
        className="fixed top-4 right-4 z-40 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
        style={{ background: 'var(--primary)', color: 'white' }}
        title="Toggle Music"
      >
        <Music size={18} />
      </button>

      {/* Share Button */}
      <button
        onClick={() => {
          const url = window.location.href;
          const text = `Undangan Khitanan ${data.childName.full}\n${data.dateLabel}\n${data.venueMain}, ${data.city}\n\n${url}`;
          window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
        }}
        className="fixed top-4 left-4 z-40 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
        style={{ background: '#25D366', color: 'white' }}
        title="Bagikan via WhatsApp"
      >
        <Share2 size={18} />
      </button>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden" style={{ background: 'var(--bg-card)', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
        <div className="flex justify-around py-2">
          {[
            { icon: '🏠', label: 'Beranda', target: 'hero' },
            { icon: '📅', label: 'Acara', target: 'acara' },
            { icon: '📸', label: 'Galeri', target: 'galeri' },
            { icon: '💬', label: 'RSVP', target: 'rsvp' },
          ].map(item => (
            <a
              key={item.target}
              href={`#${item.target}`}
              className="flex flex-col items-center gap-0.5 px-3 py-1 text-xs"
              style={{ color: 'var(--primary)' }}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </div>
      </nav>

      {/* Admin Button */}
      <button
        onClick={() => setShowAdmin(true)}
        className="fixed bottom-16 md:bottom-4 right-4 z-40 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
        style={{ background: 'var(--primary)', color: 'white' }}
        title="Admin Panel"
      >
        <Settings size={20} />
      </button>

      {/* ====== HERO SECTION ====== */}
      <div id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: `linear-gradient(180deg, var(--bg) 0%, var(--primary) 100%)` }}>
        <div className="absolute inset-0 islamic-pattern opacity-20" />
        <div className="absolute inset-0 geometric-pattern opacity-10" />
        
        <div className="relative z-20 text-center px-4 py-20">
          <IslamicOrnament type={data.islamicOrnamentId} />
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-40 h-40 md:w-48 md:h-48 mx-auto rounded-full overflow-hidden mb-6 border-4 shadow-2xl"
            style={{ borderColor: 'var(--secondary)' }}
          >
            {data.childName.photo ? (
              <img src={data.childName.photo} alt={data.childName.full} className="w-full h-full object-cover animate-ken-burns" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-7xl" style={{ background: `linear-gradient(135deg, var(--primary), var(--primary-light))` }}>
                👦
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-sm uppercase tracking-[4px] mb-2" style={{ color: 'var(--secondary)' }}>
              Bismillahirrahmanirrahim
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-3" style={{ color: 'white' }}>
              {data.childName.full}
            </h1>
            <OrnamentBorder type={data.ornamentId} />
            <p className="text-xl md:text-2xl mb-6" style={{ color: 'rgba(255,255,255,0.9)' }}>
              Syukuran Khitanan
            </p>
            <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.8)' }}>
              {data.dateLabel}
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Countdown targetDate={data.dateISO} />
          </motion.div>

          {guestName && (
            <motion.div
              className="mt-8"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>Kepada Yth.</p>
              <p className="font-display text-xl font-semibold" style={{ color: 'white' }}>{guestName}</p>
            </motion.div>
          )}

          <motion.div
            className="mt-10"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown size={30} style={{ color: 'rgba(255,255,255,0.6)' }} />
          </motion.div>
        </div>
      </div>

      {/* ====== QUOTE SECTION ====== */}
      <Section>
        <div className="text-center">
          <IslamicOrnament type="geometris" />
          <div className="card-elegant p-8 md:p-10">
            <p className="arabic-text text-2xl md:text-3xl mb-6 leading-loose" style={{ color: 'var(--primary)' }}>
              {data.quote.arabic}
            </p>
            <div className="ornament-divider mb-4">
              <Star size={16} style={{ color: 'var(--secondary)' }} />
            </div>
            <p className="text-base md:text-lg italic mb-4" style={{ color: 'var(--text)' }}>
              "{data.quote.text}"
            </p>
            <p className="text-sm font-semibold" style={{ color: 'var(--secondary)' }}>
              {data.quote.source}
            </p>
          </div>
        </div>
      </Section>

      {/* ====== CHILD PROFILE ====== */}
      <Section>
        <div className="text-center mb-8">
          <p className="text-sm uppercase tracking-[3px] mb-2" style={{ color: 'var(--secondary)' }}>Profil</p>
          <h2 className="section-title text-3xl md:text-4xl">Yang Bersangkutan</h2>
          <OrnamentBorder type={data.ornamentId} />
        </div>

        <div className="card-elegant p-8">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-3 shadow-lg" style={{ borderColor: 'var(--secondary)' }}>
              {data.childName.photo ? (
                <img src={data.childName.photo} alt={data.childName.full} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-5xl" style={{ background: `linear-gradient(135deg, var(--primary), var(--primary-light))` }}>
                  👦
                </div>
              )}
            </div>
            
            <h3 className="font-display text-2xl font-bold mb-1" style={{ color: 'var(--primary)' }}>
              {data.childName.full}
            </h3>
            <p className="text-sm mb-4" style={{ color: 'var(--text-light)' }}>
              Panggilan: "{data.childName.short}"
            </p>

            <div className="w-full space-y-3 text-left">
              <div className="flex items-start gap-3 p-3 rounded-lg" style={{ background: 'var(--bg)' }}>
                <Calendar size={18} style={{ color: 'var(--primary)' }} className="mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-semibold" style={{ color: 'var(--text-light)' }}>Tanggal Lahir</p>
                  <p className="text-sm">{data.childName.birthDate}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg" style={{ background: 'var(--bg)' }}>
                <Star size={18} style={{ color: 'var(--primary)' }} className="mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-semibold" style={{ color: 'var(--text-light)' }}>Umur saat Khitan</p>
                  <p className="text-sm">{data.childName.age}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg" style={{ background: 'var(--bg)' }}>
                <Heart size={18} style={{ color: 'var(--primary)' }} className="mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-semibold" style={{ color: 'var(--text-light)' }}>Hobi</p>
                  <p className="text-sm">{data.childName.hobby}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg" style={{ background: 'var(--bg)' }}>
                <Moon size={18} style={{ color: 'var(--primary)' }} className="mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-semibold" style={{ color: 'var(--text-light)' }}>Sekolah</p>
                  <p className="text-sm">{data.childName.school}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg text-center" style={{ background: `linear-gradient(135deg, var(--primary), var(--primary-light))`, color: 'white' }}>
              <p className="italic text-sm">"{data.childName.quote}"</p>
            </div>
          </div>
        </div>

        {/* Parents */}
        <div className="card-elegant p-6 mt-6 text-center">
          <p className="text-sm mb-2" style={{ color: 'var(--text-light)' }}>Putra dari</p>
          <p className="font-display text-lg font-semibold" style={{ color: 'var(--primary)' }}>
            {data.parents.father}
          </p>
          <p className="text-sm my-1" style={{ color: 'var(--text-light)' }}>&</p>
          <p className="font-display text-lg font-semibold" style={{ color: 'var(--primary)' }}>
            {data.parents.mother}
          </p>
          <OrnamentBorder type={data.ornamentId} />
          <p className="text-sm" style={{ color: 'var(--text-light)' }}>{data.parents.family}</p>
        </div>
      </Section>

      {/* ====== EVENT DETAILS ====== */}
      <Section id="acara">
        <div className="text-center mb-8">
          <p className="text-sm uppercase tracking-[3px] mb-2" style={{ color: 'var(--secondary)' }}>Acara</p>
          <h2 className="section-title text-3xl md:text-4xl">Waktu & Tempat</h2>
          <OrnamentBorder type={data.ornamentId} />
        </div>

        <div className="space-y-4">
          {data.events.map((event, idx) => (
            <motion.div
              key={event.id}
              className="card-elegant p-6"
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: 'var(--primary)', color: 'white' }}>
                  {idx === 0 ? <Users size={20} /> : idx === 1 ? <Moon size={20} /> : idx === 2 ? <Gift size={20} /> : <Heart size={20} />}
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-bold mb-1" style={{ color: 'var(--primary)' }}>
                    {event.name}
                  </h3>
                  <div className="space-y-2 text-sm" style={{ color: 'var(--text-light)' }}>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} />
                      <span>{event.venue}</span>
                    </div>
                    <p className="text-xs italic">{event.address}</p>
                    {event.note && (
                      <p className="text-xs px-3 py-1 rounded-full inline-block" style={{ background: 'var(--bg)', color: 'var(--primary)' }}>
                        {event.note}
                      </p>
                    )}
                  </div>
                  <a
                    href={event.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold"
                    style={{ color: 'var(--primary)' }}
                  >
                    <MapPin size={14} /> Lihat di Google Maps
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add to Calendar */}
        <div className="text-center mt-6">
          <button
            onClick={() => {
              const event = data.events[0];
              const startDate = new Date(data.dateISO);
              const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000);
              const formatDate = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
              const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Khitanan ' + data.childName.full)}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${encodeURIComponent('Syukuran Khitanan ' + data.childName.full)}&location=${encodeURIComponent(event.address)}`;
              window.open(googleUrl, '_blank');
            }}
            className="btn-secondary text-sm"
          >
            <Calendar size={16} />
            Simpan ke Google Calendar
          </button>
        </div>
      </Section>

      {/* ====== HIKMAH KHITANAN ====== */}
      <Section>
        <div className="text-center mb-8">
          <p className="text-sm uppercase tracking-[3px] mb-2" style={{ color: 'var(--secondary)' }}>Hikmah</p>
          <h2 className="section-title text-3xl md:text-4xl">Hikmah Khitanan</h2>
          <OrnamentBorder type={data.ornamentId} />
        </div>

        <div className="space-y-4">
          {data.hikmah.map((item, idx) => (
            <motion.div
              key={idx}
              className="card-elegant p-6 flex items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="text-3xl shrink-0">{item.icon}</div>
              <div>
                <h3 className="font-display text-lg font-bold mb-1" style={{ color: 'var(--primary)' }}>
                  {item.title}
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-light)' }}>{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Islamic Info Card */}
        <div className="card-elegant p-6 mt-6 text-center" style={{ background: `linear-gradient(135deg, var(--primary), var(--primary-light))` }}>
          <p className="text-white text-sm italic">
            "Khitanan adalah sunnah bagi laki-laki dan kemuliaan bagi wanita."
          </p>
          <p className="text-white/80 text-xs mt-2">HR. Ahmad</p>
        </div>
      </Section>

      {/* ====== GALLERY ====== */}
      <Section id="galeri">
        <div className="text-center mb-8">
          <p className="text-sm uppercase tracking-[3px] mb-2" style={{ color: 'var(--secondary)' }}>Galeri</p>
          <h2 className="section-title text-3xl md:text-4xl">Momen Bahagia</h2>
          <OrnamentBorder type={data.ornamentId} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {galleryImages.map((img, idx) => (
            <motion.div
              key={idx}
              className="gallery-item aspect-square"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setLightboxImage(img.src || `gradient-${idx}`)}
            >
              {img.src ? (
                <img src={img.src} alt={img.caption} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white text-center p-2" style={{ background: (img as any).gradient || 'linear-gradient(135deg, var(--primary), var(--primary-light))' }}>
                  <div>
                    <span className="text-3xl mb-2 block">📸</span>
                    <span className="text-xs">{img.caption}</span>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <div className="lightbox-overlay" onClick={() => setLightboxImage(null)}>
            <button className="absolute top-4 right-4 text-white z-50" onClick={() => setLightboxImage(null)}>
              <X size={30} />
            </button>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-lg w-full mx-4"
              onClick={e => e.stopPropagation()}
            >
              {lightboxImage.startsWith('gradient') ? (
                <div className="aspect-square rounded-xl flex items-center justify-center text-6xl" style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-light))' }}>
                  📸
                </div>
              ) : (
                <img src={lightboxImage} alt="" className="w-full rounded-xl" />
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ====== GIFTS ====== */}
      <Section>
        <div className="text-center mb-8">
          <p className="text-sm uppercase tracking-[3px] mb-2" style={{ color: 'var(--secondary)' }}>Hadiah</p>
          <h2 className="section-title text-3xl md:text-4xl">Hadiah & Kado</h2>
          <OrnamentBorder type={data.ornamentId} />
          <p className="text-sm mt-4" style={{ color: 'var(--text-light)' }}>
            Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika Anda ingin memberikan hadiah, kami menyediakan amplop digital berikut:
          </p>
        </div>

        <div className="space-y-4">
          {data.gifts.map((gift, idx) => (
            <div key={idx} className="card-elegant p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-lg" style={{ color: 'var(--primary)' }}>{gift.bank}</p>
                  <p className="font-mono text-lg mt-1">{gift.number}</p>
                  <p className="text-sm" style={{ color: 'var(--text-light)' }}>a.n. {gift.holder}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(gift.number, gift.bank)}
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
                  style={{ background: copiedBank === gift.bank ? '#10b981' : 'var(--primary)', color: 'white' }}
                >
                  {copiedBank === gift.bank ? <Check size={20} /> : <Copy size={20} />}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Address */}
        <div className="card-elegant p-6 mt-4">
          <div className="flex items-start gap-3">
            <MapPin size={20} style={{ color: 'var(--primary)' }} className="shrink-0 mt-1" />
            <div>
              <p className="font-bold mb-1" style={{ color: 'var(--primary)' }}>Kirim Kado</p>
              <p className="text-sm" style={{ color: 'var(--text-light)' }}>{data.giftAddress}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ====== RSVP & MESSAGES ====== */}
      <Section id="rsvp">
        <div className="text-center mb-8">
          <p className="text-sm uppercase tracking-[3px] mb-2" style={{ color: 'var(--secondary)' }}>RSVP</p>
          <h2 className="section-title text-3xl md:text-4xl">Konfirmasi & Ucapan</h2>
          <OrnamentBorder type={data.ornamentId} />
        </div>

        {/* Form */}
        <div className="card-elegant p-6 mb-6">
          <form onSubmit={handleSubmitMessage} className="space-y-4">
            <div>
              <label className="text-sm font-semibold block mb-1" style={{ color: 'var(--text-light)' }}>Nama</label>
              <input
                type="text"
                value={newMessage.name}
                onChange={e => setNewMessage(p => ({ ...p, name: e.target.value }))}
                placeholder="Nama Anda"
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                style={{ borderColor: 'var(--primary)', '--tw-ring-color': 'var(--primary)' } as any}
              />
            </div>
            <div>
              <label className="text-sm font-semibold block mb-1" style={{ color: 'var(--text-light)' }}>Konfirmasi Kehadiran</label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setNewMessage(p => ({ ...p, attendance: 'hadir' }))}
                  className="flex-1 py-3 rounded-lg font-semibold text-sm transition-all"
                  style={{
                    background: newMessage.attendance === 'hadir' ? 'var(--primary)' : 'transparent',
                    color: newMessage.attendance === 'hadir' ? 'white' : 'var(--primary)',
                    border: `2px solid var(--primary)`
                  }}
                >
                  ✓ Hadir
                </button>
                <button
                  type="button"
                  onClick={() => setNewMessage(p => ({ ...p, attendance: 'tidak' }))}
                  className="flex-1 py-3 rounded-lg font-semibold text-sm transition-all"
                  style={{
                    background: newMessage.attendance === 'tidak' ? '#ef4444' : 'transparent',
                    color: newMessage.attendance === 'tidak' ? 'white' : '#ef4444',
                    border: '2px solid #ef4444'
                  }}
                >
                  ✗ Tidak Hadir
                </button>
              </div>
            </div>
            {newMessage.attendance === 'hadir' && (
              <div>
                <label className="text-sm font-semibold block mb-1" style={{ color: 'var(--text-light)' }}>Jumlah Tamu</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={newMessage.count}
                  onChange={e => setNewMessage(p => ({ ...p, count: parseInt(e.target.value) || 1 }))}
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                  style={{ borderColor: 'var(--primary)' }}
                />
              </div>
            )}
            <div>
              <label className="text-sm font-semibold block mb-1" style={{ color: 'var(--text-light)' }}>Ucapan & Doa</label>
              <textarea
                value={newMessage.message}
                onChange={e => setNewMessage(p => ({ ...p, message: e.target.value }))}
                placeholder="Tulis ucapan dan doa untuk anak kami..."
                rows={4}
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 resize-none"
                style={{ borderColor: 'var(--primary)' }}
              />
            </div>
            <button type="submit" className="btn-primary w-full justify-center">
              <Send size={18} />
              Kirim Ucapan
            </button>
          </form>
        </div>

        {/* Message Wall */}
        <div className="space-y-3">
          <h3 className="font-display text-xl font-bold text-center" style={{ color: 'var(--primary)' }}>
            Dinding Ucapan ({messages.length})
          </h3>
          {messages.length === 0 ? (
            <p className="text-center text-sm" style={{ color: 'var(--text-light)' }}>Belum ada ucapan. Jadilah yang pertama!</p>
          ) : (
            messages.map(msg => (
              <motion.div
                key={msg.id}
                className="message-card"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-sm" style={{ color: 'var(--primary)' }}>{msg.name}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${msg.attendance === 'hadir' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {msg.attendance === 'hadir' ? '✓ Hadir' : '✗ Tidak Hadir'}
                    {msg.attendance === 'hadir' && ` (${msg.count} orang)`}
                  </span>
                </div>
                <p className="text-sm" style={{ color: 'var(--text-light)' }}>{msg.message}</p>
                <p className="text-xs mt-2" style={{ color: 'var(--text-light)', opacity: 0.6 }}>
                  {new Date(msg.timestamp).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </motion.div>
            ))
          )}
        </div>
      </Section>

      {/* ====== FOOTER ====== */}
      <div className="py-16 pb-24 md:pb-16 px-4 text-center" style={{ background: `linear-gradient(180deg, var(--bg), var(--primary))` }}>
        <div className="max-w-md mx-auto">
          <IslamicOrnament type="kaligrafi-bismillah" />
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-lg mb-4" style={{ color: 'rgba(255,255,255,0.9)' }}>
              Merupakan suatu kebahagiaan dan kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
            </p>
            
            <p className="text-white/70 text-sm mb-2">Atas kehadiran dan doa restunya, kami ucapkan terima kasih.</p>
            
            <div className="ornament-divider my-6">
              <Heart size={16} style={{ color: 'var(--secondary)' }} />
            </div>

            <p className="font-display text-2xl font-bold text-white mb-2">
              {data.parents.father} & {data.parents.mother}
            </p>
            <p className="text-white/70 text-sm">{data.parents.family}</p>

            <div className="mt-8 p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <p className="arabic-text text-xl text-white/90">
                جَزَاكُمُ اللَّهُ خَيْرًا
              </p>
              <p className="text-white/70 text-sm mt-2">Jazakumullahu Khairan</p>
              <p className="text-white/60 text-xs mt-1">Semoga Allah membalas kebaikan Anda</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Admin Panel */}
      <AnimatePresence>
        {showAdmin && <AdminPanel data={data} onClose={() => setShowAdmin(false)} />}
      </AnimatePresence>
    </div>
  );
}

// ============ ADMIN PANEL ============
function AdminPanel({ data, onClose }: { data: InvitationData; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState('data');
  const [editData, setEditData] = useState<InvitationData>(() => {
    const saved = localStorage.getItem('khitanan_data');
    return saved ? JSON.parse(saved) : data;
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem('khitanan_data', JSON.stringify(editData));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: 'data', label: 'Data Undangan', icon: '📋' },
    { id: 'theme', label: 'Tema', icon: '🎨' },
    { id: 'events', label: 'Acara', icon: '📅' },
    { id: 'gallery', label: 'Galeri', icon: '📸' },
    { id: 'gifts', label: 'Hadiah', icon: '🎁' },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{ background: 'rgba(0,0,0,0.5)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="min-h-screen p-4 flex items-start justify-center pt-8">
        <motion.div
          className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
        >
          {/* Header */}
          <div className="p-4 flex items-center justify-between" style={{ background: 'var(--primary)', color: 'white' }}>
            <div className="flex items-center gap-2">
              <Settings size={20} />
              <h2 className="font-bold text-lg">Admin Panel</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex overflow-x-auto border-b">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-semibold whitespace-nowrap transition-all ${activeTab === tab.id ? 'border-b-2' : 'opacity-60'}`}
                style={{ borderColor: activeTab === tab.id ? 'var(--primary)' : 'transparent', color: activeTab === tab.id ? 'var(--primary)' : undefined }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-4 max-h-[60vh] overflow-y-auto">
            {activeTab === 'data' && (
              <div className="space-y-4">
                <h3 className="font-bold" style={{ color: 'var(--primary)' }}>Info Anak</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-500">Nama Lengkap</label>
                    <input
                      type="text"
                      value={editData.childName.full}
                      onChange={e => setEditData(p => ({ ...p, childName: { ...p.childName, full: e.target.value } }))}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500">Nama Panggilan</label>
                    <input
                      type="text"
                      value={editData.childName.short}
                      onChange={e => setEditData(p => ({ ...p, childName: { ...p.childName, short: e.target.value } }))}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500">Tanggal Lahir</label>
                    <input
                      type="text"
                      value={editData.childName.birthDate}
                      onChange={e => setEditData(p => ({ ...p, childName: { ...p.childName, birthDate: e.target.value } }))}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500">Umur saat Khitan</label>
                    <input
                      type="text"
                      value={editData.childName.age}
                      onChange={e => setEditData(p => ({ ...p, childName: { ...p.childName, age: e.target.value } }))}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500">Hobi</label>
                    <input
                      type="text"
                      value={editData.childName.hobby}
                      onChange={e => setEditData(p => ({ ...p, childName: { ...p.childName, hobby: e.target.value } }))}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500">Sekolah</label>
                    <input
                      type="text"
                      value={editData.childName.school}
                      onChange={e => setEditData(p => ({ ...p, childName: { ...p.childName, school: e.target.value } }))}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500">Quote Anak</label>
                  <input
                    type="text"
                    value={editData.childName.quote}
                    onChange={e => setEditData(p => ({ ...p, childName: { ...p.childName, quote: e.target.value } }))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>

                <h3 className="font-bold pt-4" style={{ color: 'var(--primary)' }}>Info Orang Tua</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-500">Nama Ayah</label>
                    <input
                      type="text"
                      value={editData.parents.father}
                      onChange={e => setEditData(p => ({ ...p, parents: { ...p.parents, father: e.target.value } }))}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500">Nama Ibu</label>
                    <input
                      type="text"
                      value={editData.parents.mother}
                      onChange={e => setEditData(p => ({ ...p, parents: { ...p.parents, mother: e.target.value } }))}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                  </div>
                </div>

                <h3 className="font-bold pt-4" style={{ color: 'var(--primary)' }}>Tanggal Acara</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-500">Tanggal (Label)</label>
                    <input
                      type="text"
                      value={editData.dateLabel}
                      onChange={e => setEditData(p => ({ ...p, dateLabel: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500">Tanggal (ISO)</label>
                    <input
                      type="datetime-local"
                      value={editData.dateISO.slice(0, 16)}
                      onChange={e => setEditData(p => ({ ...p, dateISO: e.target.value + ':00+07:00' }))}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'theme' && (
              <div className="space-y-4">
                <h3 className="font-bold" style={{ color: 'var(--primary)' }}>Pilih Tema Warna</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {themes.map(theme => (
                    <button
                      key={theme.id}
                      onClick={() => setEditData(p => ({ ...p, themeId: theme.id }))}
                      className={`p-3 rounded-lg border-2 text-left transition-all ${editData.themeId === theme.id ? 'ring-2 ring-offset-2' : ''}`}
                      style={{ borderColor: theme.primary, '--tw-ring-color': theme.primary } as any}
                    >
                      <div className="flex gap-1 mb-2">
                        <div className="w-6 h-6 rounded-full" style={{ background: theme.primary }} />
                        <div className="w-6 h-6 rounded-full" style={{ background: theme.secondary }} />
                        <div className="w-6 h-6 rounded-full" style={{ background: theme.bg }} />
                      </div>
                      <p className="text-xs font-bold">{theme.name}</p>
                      <p className="text-xs text-gray-500">{theme.description}</p>
                    </button>
                  ))}
                </div>

                <h3 className="font-bold pt-4" style={{ color: 'var(--primary)' }}>Ornamen Islami</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['kaligrafi-bismillah', 'motif-masjid', 'bulan-sabit', 'geometris', 'arabesque'].map(id => (
                    <button
                      key={id}
                      onClick={() => setEditData(p => ({ ...p, islamicOrnamentId: id }))}
                      className={`p-3 rounded-lg border-2 text-center transition-all ${editData.islamicOrnamentId === id ? 'ring-2' : ''}`}
                      style={{ borderColor: 'var(--primary)' }}
                    >
                      <IslamicOrnament type={id} />
                      <p className="text-xs font-semibold mt-2" style={{ color: 'var(--primary)' }}>{id.replace('-', ' ')}</p>
                    </button>
                  ))}
                </div>

                <h3 className="font-bold pt-4" style={{ color: 'var(--primary)' }}>Ornamen Adat</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['sunda', 'jawa', 'betawi', 'bali', 'minang', 'dayak', 'modern'].map(id => (
                    <button
                      key={id}
                      onClick={() => setEditData(p => ({ ...p, ornamentId: id }))}
                      className={`p-3 rounded-lg border-2 text-center transition-all ${editData.ornamentId === id ? 'ring-2' : ''}`}
                      style={{ borderColor: 'var(--primary)' }}
                    >
                      <OrnamentBorder type={id} />
                      <p className="text-xs font-semibold mt-2" style={{ color: 'var(--primary)' }}>{id}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'events' && (
              <div className="space-y-4">
                <h3 className="font-bold" style={{ color: 'var(--primary)' }}>Rundown Acara</h3>
                {editData.events.map((event, idx) => (
                  <div key={event.id} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm" style={{ color: 'var(--primary)' }}>Acara {idx + 1}</span>
                      {editData.events.length > 1 && (
                        <button
                          onClick={() => setEditData(p => ({ ...p, events: p.events.filter((_, i) => i !== idx) }))}
                          className="text-red-500 text-xs"
                        >
                          Hapus
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      value={event.name}
                      onChange={e => setEditData(p => ({ ...p, events: p.events.map((ev, i) => i === idx ? { ...ev, name: e.target.value } : ev) }))}
                      placeholder="Nama Acara"
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={event.time}
                        onChange={e => setEditData(p => ({ ...p, events: p.events.map((ev, i) => i === idx ? { ...ev, time: e.target.value } : ev) }))}
                        placeholder="Waktu"
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                      />
                      <input
                        type="text"
                        value={event.venue}
                        onChange={e => setEditData(p => ({ ...p, events: p.events.map((ev, i) => i === idx ? { ...ev, venue: e.target.value } : ev) }))}
                        placeholder="Tempat"
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                      />
                    </div>
                    <input
                      type="text"
                      value={event.note}
                      onChange={e => setEditData(p => ({ ...p, events: p.events.map((ev, i) => i === idx ? { ...ev, note: e.target.value } : ev) }))}
                      placeholder="Catatan"
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                  </div>
                ))}
                <button
                  onClick={() => setEditData(p => ({ ...p, events: [...p.events, { id: `event-${Date.now()}`, name: '', date: p.dateLabel, time: '', venue: '', address: '', maps: '', note: '' }] }))}
                  className="btn-secondary text-sm w-full justify-center"
                >
                  + Tambah Acara
                </button>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="space-y-4">
                <h3 className="font-bold" style={{ color: 'var(--primary)' }}>Galeri Foto</h3>
                <p className="text-sm text-gray-500">Upload foto anak untuk ditampilkan di galeri undangan.</p>
                <div className="border-2 border-dashed rounded-lg p-8 text-center" style={{ borderColor: 'var(--primary)' }}>
                  <Image size={40} className="mx-auto mb-2" style={{ color: 'var(--primary)' }} />
                  <p className="text-sm" style={{ color: 'var(--text-light)' }}>
                    Fitur upload foto tersedia di mode production dengan Supabase storage.
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Format: JPG, PNG, WebP | Max: 200KB per foto
                  </p>
                </div>
                {editData.gallery.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {editData.gallery.map((img, idx) => (
                      <div key={idx} className="relative aspect-square rounded-lg overflow-hidden">
                        <img src={img.src} alt={img.caption} className="w-full h-full object-cover" />
                        <button
                          onClick={() => setEditData(p => ({ ...p, gallery: p.gallery.filter((_, i) => i !== idx) }))}
                          className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'gifts' && (
              <div className="space-y-4">
                <h3 className="font-bold" style={{ color: 'var(--primary)' }}>Amplop Digital</h3>
                {editData.gifts.map((gift, idx) => (
                  <div key={idx} className="p-4 border rounded-lg space-y-2">
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={gift.bank}
                        onChange={e => setEditData(p => ({ ...p, gifts: p.gifts.map((g, i) => i === idx ? { ...g, bank: e.target.value } : g) }))}
                        placeholder="Bank"
                        className="px-3 py-2 border rounded-lg text-sm"
                      />
                      <input
                        type="text"
                        value={gift.number}
                        onChange={e => setEditData(p => ({ ...p, gifts: p.gifts.map((g, i) => i === idx ? { ...g, number: e.target.value } : g) }))}
                        placeholder="No. Rekening"
                        className="px-3 py-2 border rounded-lg text-sm"
                      />
                      <input
                        type="text"
                        value={gift.holder}
                        onChange={e => setEditData(p => ({ ...p, gifts: p.gifts.map((g, i) => i === idx ? { ...g, holder: e.target.value } : g) }))}
                        placeholder="Atas Nama"
                        className="px-3 py-2 border rounded-lg text-sm"
                      />
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => setEditData(p => ({ ...p, gifts: [...p.gifts, { bank: '', number: '', holder: '' }] }))}
                  className="btn-secondary text-sm w-full justify-center"
                >
                  + Tambah Rekening
                </button>

                <h3 className="font-bold pt-4" style={{ color: 'var(--primary)' }}>Alamat Kirim Kado</h3>
                <textarea
                  value={editData.giftAddress}
                  onChange={e => setEditData(p => ({ ...p, giftAddress: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t flex items-center justify-between">
            <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-700">
              Tutup
            </button>
            <button onClick={handleSave} className="btn-primary text-sm">
              {saved ? <><Check size={16} /> Tersimpan!</> : <>💾 Simpan Perubahan</>}
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ============ MAIN APP ============
export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [data, setData] = useState<InvitationData>(() => {
    const saved = localStorage.getItem('khitanan_data');
    return saved ? JSON.parse(saved) : defaultData;
  });

  // Get guest name from URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get('to');
    if (to) setGuestName(decodeURIComponent(to));
  }, []);

  // Apply theme
  useEffect(() => {
    const theme = themes.find(t => t.id === data.themeId);
    if (theme) {
      document.documentElement.className = theme.className;
    }
  }, [data.themeId]);

  return (
    <>
      {!isOpen && (
        <Cover data={data} guestName={guestName} onOpen={() => setIsOpen(true)} />
      )}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <MainInvitation data={data} guestName={guestName} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
