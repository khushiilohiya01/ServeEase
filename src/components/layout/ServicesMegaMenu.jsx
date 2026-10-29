import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Wrench,
  Zap,
  Wind,
  Paintbrush,
  Hammer,
  ShieldAlert,
  ArrowRight,
  ShieldCheck,
  Star,
  CheckCircle2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORY_ITEMS = [
  {
    id: 'home_cleaning',
    name: 'Home Cleaning',
    desc: 'Deep home, kitchen, bathroom & sofa sanitization',
    icon: Sparkles,
    badge: 'Popular',
  },
  {
    id: 'plumbing',
    name: 'Plumbing Services',
    desc: 'Tap repair, pipe leaks, drain unclogging & fixtures',
    icon: Wrench,
    badge: null,
  },
  {
    id: 'electrical',
    name: 'Electrical Services',
    desc: 'Switchboards, wiring repair, fans & light fittings',
    icon: Zap,
    badge: null,
  },
  {
    id: 'ac_appliances',
    name: 'AC & Appliance Services',
    desc: 'AC jet wash, washing machines & refrigerators',
    icon: Wind,
    badge: 'Seasonal',
  },
  {
    id: 'carpentry',
    name: 'Carpentry & Furniture',
    desc: 'Flat-pack assembly, lock repairs & woodwork',
    icon: Hammer,
    badge: null,
  },
  {
    id: 'painting',
    name: 'Painting & Wall Care',
    desc: 'Interior walls, waterproofing & crack filling',
    icon: Paintbrush,
    badge: null,
  },
  {
    id: 'pest_control',
    name: 'Pest Control',
    desc: 'Cockroach, termite, bed bug & mosquito control',
    icon: ShieldAlert,
    badge: null,
  },
  {
    id: 'handyman',
    name: 'Handyman & Installations',
    desc: 'TV mounting, mirrors, hanging & odd jobs',
    icon: Wrench,
    badge: 'Versatile',
  },
];

export function ServicesMegaMenu({ isOpen, onClose }) {
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: 8, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.99 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[92vw] max-w-[1080px] bg-white rounded-3xl shadow-2xl border border-[#DDE3DA] p-6 lg:p-8 z-50 overflow-hidden"
          role="region"
          aria-label="Services Navigation Directory"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#A9C9AC]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#DDE3DA]/80">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#66716A]">
                    Curated Home Disciplines
                  </h3>
                  <p className="text-sm font-semibold text-[#191E1B]">
                    Specialized technicians with upfront flat rates
                  </p>
                </div>
                <Link
                  to="/services"
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#173D32] hover:text-[#245544] transition-colors group"
                >
                  <span>Explore full catalogue</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {CATEGORY_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.id}
                      to={`/services?category=${item.id}`}
                      onClick={onClose}
                      className="group flex items-start gap-3.5 p-3 rounded-2xl hover:bg-[#F7F7F2] border border-transparent hover:border-[#DDE3DA] transition-all duration-200"
                    >
                      <div className="w-9 h-9 rounded-xl bg-[#E8EBE2] text-[#173D32] group-hover:bg-[#173D32] group-hover:text-white transition-colors duration-200 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-[#191E1B] group-hover:text-[#173D32] transition-colors">
                            {item.name}
                          </span>
                          {item.badge && (
                            <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-[#A9C9AC]/30 text-[#173D32] leading-none">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#66716A] line-clamp-1 mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#F7F7F2] rounded-2xl p-5 border border-[#DDE3DA] flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#173D32] text-white text-[10px] font-bold uppercase tracking-wider">
                    <Star className="w-2.5 h-2.5 fill-amber-300 text-amber-300" />
                    Signature Care
                  </span>
                  <span className="text-xs font-semibold text-[#173D32]">★ 4.9 (400+ reviews)</span>
                </div>

                <div className="relative rounded-xl overflow-hidden aspect-16/10 mb-3 bg-neutral-200">
                  <img
                    src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80"
                    alt="Deep Home Cleaning"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 text-white">
                    <p className="text-[11px] font-medium opacity-90">Most Requested</p>
                    <p className="text-sm font-bold">Deep Home Sanitization</p>
                  </div>
                </div>

                <p className="text-xs text-[#66716A] leading-relaxed mb-3">
                  Hospital-grade scrubbers, certified 2-person team, and eco-friendly formulas for bathrooms, kitchens & living spaces.
                </p>

                <div className="space-y-1.5 text-xs text-[#191E1B] font-medium">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#367A55]" />
                    <span>Includes machine floor scrubbing</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#367A55]" />
                    <span>Fixed rate from ₹1,499</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    navigate('/services/1');
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#173D32] hover:bg-[#245544] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm hover:shadow"
                >
                  <span>Book Signature Cleaning</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#DDE3DA]/80 flex flex-wrap items-center justify-between gap-4 text-xs text-[#66716A]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#173D32]" />
                <strong className="text-[#191E1B]">30-Day Guarantee</strong> on all bookings
              </span>
              <span className="hidden sm:inline text-neutral-300">•</span>
              <span className="hidden sm:inline">Transparent fixed quotes with no hidden fees</span>
            </div>
            <Link
              to="/services"
              onClick={onClose}
              className="text-xs font-semibold text-[#173D32] hover:underline"
            >
              Browse all 50+ services →
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
