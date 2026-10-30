import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { INITIAL_SERVICES } from '../../lib/mockData';
import { ServiceCard } from '../services/ServiceCard';
import { Reveal } from '../motion/Reveal';
import { RevealCard } from '../services/ServiceGrid';

const DEFAULT_FEATURED_IDS = [
  'ac-service-jet-wash',
  'washing-machine-repair',
  'chimney-cleaning',
  'full-home-cleaning',
  'fan-installation',
  'tap-leaking',
];

export function ExploreServices() {
  const displayedServices = DEFAULT_FEATURED_IDS
    .map((id) => INITIAL_SERVICES.find((s) => s.id === id))
    .filter(Boolean);

  return (
    <section
      id="services-discovery"
      className="py-14 lg:py-20 bg-white border-b border-[#DDE4DB]"
      aria-labelledby="explore-heading"
    >
      <div className="container-custom space-y-8 lg:space-y-10">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EDE7] text-[#173D32] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore Services</span>
            </div>
            <h2 id="explore-heading" className="heading-section text-[#191E1B]">
              Care for every corner of your home.
            </h2>
            <p className="text-base text-[#647269] leading-relaxed">
              Popular services booked by homes near you, with clear prices before you book.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#173D32] hover:text-[#245544] transition-colors group"
            >
              <span>View all 50+ services</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </Reveal>

        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#DDE4DB]/80 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#173D32]" />
              <h3 className="text-sm font-semibold text-[#191E1B]">
                Featured Upfront Packages
              </h3>
              <span className="text-xs text-[#647269]">
                ({displayedServices.length} {displayedServices.length === 1 ? 'service' : 'services'})
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs text-[#647269]">
              <ShieldCheck className="w-4 h-4 text-[#367A55]" />
              <span>30-Day Workmanship Warranty</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {displayedServices.map((service, index) => (
              <RevealCard key={service.id} index={index % 3}>
                <ServiceCard service={service} />
              </RevealCard>
            ))}
          </div>
        </div>

        <Reveal className="pt-2 text-center space-y-3">
          <Link
            to="/services"
            className="btn-shine group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-[#173D32] hover:bg-[#245544] text-white text-xs sm:text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Explore All 50+ Verified Services</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <p className="text-xs text-[#647269]">
            Transparent pricing • Same-day & advance scheduling • 30-day rework guarantee
          </p>
        </Reveal>
      </div>
    </section>
  );
}
