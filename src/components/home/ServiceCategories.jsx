import { Link } from 'react-router-dom';
import {
  Sparkles,
  Wrench,
  Zap,
  Wind,
  Paintbrush,
  Hammer,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';

const CATEGORIES = [
  {
    id: 'home_cleaning',
    name: 'Home Cleaning',
    subtitle: 'Deep home, kitchen, bathroom & upholstery sanitization',
    starting: '₹499',
    count: 8,
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    icon: Sparkles,
  },
  {
    id: 'plumbing',
    name: 'Plumbing Services',
    subtitle: 'Tap repairs, pipe leaks, drain unclogging & fixtures',
    starting: '₹299',
    count: 8,
    badge: 'Emergency Ready',
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80',
    icon: Wrench,
  },
  {
    id: 'electrical',
    name: 'Electrical Services',
    subtitle: 'Switchboards, wiring repair, fans & light fittings',
    starting: '₹299',
    count: 7,
    badge: 'Certified',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    icon: Zap,
  },
  {
    id: 'ac_appliances',
    name: 'AC & Appliance Services',
    subtitle: 'AC jet wash, washing machines, RO & refrigerators',
    starting: '₹449',
    count: 9,
    badge: 'Seasonal',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80',
    icon: Wind,
  },
  {
    id: 'carpentry',
    name: 'Carpentry & Furniture',
    subtitle: 'Flat-pack assembly, lock repairs & custom woodwork',
    starting: '₹299',
    count: 7,
    badge: null,
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80',
    icon: Hammer,
  },
  {
    id: 'painting',
    name: 'Painting & Wall Care',
    subtitle: 'Interior walls, waterproofing, crack repair & touch-ups',
    starting: '₹399',
    count: 6,
    badge: null,
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80',
    icon: Paintbrush,
  },
  {
    id: 'pest_control',
    name: 'Pest Control',
    subtitle: 'Cockroach, termite, bed bug & mosquito treatments',
    starting: '₹399',
    count: 7,
    badge: null,
    image: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=800&q=80',
    icon: ShieldAlert,
  },
  {
    id: 'handyman',
    name: 'Handyman & Installations',
    subtitle: 'TV wall mounting, mirrors, hanging & punch-lists',
    starting: '₹249',
    count: 7,
    badge: 'Fast Dispatch',
    image: 'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=800&q=80',
    icon: Wrench,
  },
];

export function ServiceCategories() {
  return (
    <section id="services-discovery" className="py-16 lg:py-20" aria-labelledby="categories-heading">
      <div className="container-custom space-y-10">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EBE2] text-[#173D32] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Disciplines</span>
            </div>
            <h2
              id="categories-heading"
              className="heading-section text-[#191E1B]"
            >
              Care for every corner{' '}
              <span className="text-[#173D32]">
                of your home.
              </span>
            </h2>
            <p className="text-base text-[#66716A] max-w-xl leading-relaxed">
              Discover verified specialists across 8 structured disciplines. Upfront fixed pricing,
              background-checked technicians, and guaranteed craftsmanship.
            </p>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#173D32] hover:text-[#245544] transition-colors group shrink-0"
          >
            <span>Explore all 50+ services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Asymmetric Editorial Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          {CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            // Asymmetric spans:
            // First 2: Lead flagship (span 7) + Complementary (span 5)
            // Next 6: Three across (span 4 each)
            const colSpan =
              idx === 0
                ? 'md:col-span-7'
                : idx === 1
                ? 'md:col-span-5'
                : 'md:col-span-4';

            const isLead = idx === 0;

            return (
              <Link
                key={cat.id}
                to={`/services?category=${cat.id}`}
                className={`group relative bg-white rounded-3xl overflow-hidden border border-[#DDE4DB] hover:border-[#173D32]/50 hover:shadow-xl hover:shadow-[#173D32]/8 transition-all duration-300 flex flex-col justify-between ${colSpan}`}
              >
                {/* Image Section */}
                <div
                  className={`relative overflow-hidden bg-neutral-100 ${
                    isLead ? 'aspect-16/9 md:aspect-21/9' : idx === 1 ? 'aspect-16/9 md:aspect-16/10' : 'aspect-16/10'
                  }`}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500 ease-out"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/70 transition-colors duration-300" />

                  {/* Top Pill Tags */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                    <span className="w-8 h-8 rounded-xl bg-white/95 backdrop-blur-md text-[#173D32] flex items-center justify-center shadow-xs">
                      <Icon className="w-4 h-4" />
                    </span>
                    {cat.badge && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 text-[#173D32] backdrop-blur-md shadow-xs">
                        {cat.badge}
                      </span>
                    )}
                  </div>

                  {/* Bottom Image Stats */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs">
                    <span className="text-[11px] font-medium text-white/90">
                      {cat.count} curated services
                    </span>
                    <span className="text-[11px] font-semibold bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-md text-[#A9C9AC]">
                      From {cat.starting}
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-base font-semibold text-[#191E1B] group-hover:text-[#173D32] transition-colors leading-snug">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-[#647269] line-clamp-2 mt-1 leading-relaxed">
                      {cat.subtitle}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#DDE4DB]/70 flex items-center justify-between text-xs font-semibold text-[#173D32]">
                    <span>View services</span>
                    <div className="w-7 h-7 rounded-full bg-[#E8EDE7] group-hover:bg-[#173D32] group-hover:text-white transition-all flex items-center justify-center">
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
