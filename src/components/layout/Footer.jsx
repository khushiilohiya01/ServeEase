import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  X,
  ArrowUpRight,
  ShieldCheck,
  MapPin,
} from 'lucide-react';
import { SERVICE_CATEGORIES } from '../../lib/constants';
import { useAuth } from '../../context/AuthContext';
import { CITIES_CONFIG } from '../../data/locationsData';
import { ArchitecturalIllustration } from '../home/ArchitecturalIllustration';

export function Footer() {
  const { user, openAuthModal, selectedCity, selectedLocality } = useAuth();
  const [legalModalContent, setLegalModalContent] = useState(null);

  const activeCategories = SERVICE_CATEGORIES.filter((c) => c.id !== 'all');
  const currentCityConfig =
    CITIES_CONFIG.find(
      (c) => c.name.toLowerCase() === (selectedCity || 'Bengaluru').toLowerCase()
    ) || CITIES_CONFIG[0];

  const openLegalModal = (title, content) => {
    setLegalModalContent({ title, content });
  };

  return (
    <footer className="bg-[#121820] text-neutral-300 pt-16 pb-12 border-t border-neutral-800" aria-label="Site Footer">
      <div className="container-custom space-y-14">
        {/* Architectural Illustration Header */}
        <div className="max-w-4xl mx-auto opacity-75 hover:opacity-100 transition-opacity duration-500">
          <ArchitecturalIllustration className="w-full h-auto max-h-48" />
        </div>

        {/* Editorial Brand Statement */}
        <div className="pt-2 pb-6 border-b border-neutral-800/80 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A9C9AC]">
              The ServeEase Standard
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Thoughtful care for modern homes.
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
              Combining master craftsmanship, upfront flat rates, and verified specialists
              across India&apos;s leading residential communities.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-medium text-neutral-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#52A88B]" />
              <span>Serving in {selectedLocality ? `${selectedLocality}, ${selectedCity}` : selectedCity || 'Bengaluru'}</span>
            </div>
            <Link
              to="/services"
              className="px-4 py-2 rounded-xl bg-white hover:bg-neutral-100 text-[#121820] text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <span>Book Now</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Brand and Contact */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#173D32] border border-[#A9C9AC]/30 flex items-center justify-center text-[#A9C9AC]">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 10.5L12 3l9 7.5" />
                  <path d="M5 9.5V20a1 1 0 001 1h12a1 1 0 001-1V9.5" />
                  <path d="M10 21V13h4v8" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">ServeEase</span>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              The trustworthy, effortless home-services platform. Backed by background-verified
              technicians, transparent pricing, and a 30-day rework warranty.
            </p>

            <div className="pt-2 text-xs text-neutral-400 space-y-2 font-normal">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#A9C9AC]" />
                <a href="mailto:support@serveease.com" className="hover:text-white transition-colors">
                  support@serveease.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#A9C9AC]" />
                <span>+91 1800 200 4567 (Toll-Free, 8 AM – 8 PM)</span>
              </div>
            </div>
          </div>

          {/* Col 3: Service Disciplines */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Disciplines
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              {activeCategories.map((c) => (
                <li key={c.id}>
                  <Link
                    to={`/services?category=${c.id}`}
                    className="hover:text-white transition-colors block py-0.5"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/services" className="text-[#A9C9AC] hover:text-white font-semibold block pt-1">
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Customer Portal */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Customer Portal
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <Link to="/services" className="hover:text-white transition-colors block py-0.5">
                  Book a Service
                </Link>
              </li>
              <li>
                {user ? (
                  <Link to="/dashboard" className="hover:text-white transition-colors block py-0.5">
                    Customer Dashboard
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => openAuthModal('signin')}
                    className="hover:text-white transition-colors block py-0.5 text-left cursor-pointer"
                  >
                    Customer Dashboard
                  </button>
                )}
              </li>
              <li>
                {user ? (
                  <Link to="/bookings" className="hover:text-white transition-colors block py-0.5">
                    My Bookings
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => openAuthModal('signin')}
                    className="hover:text-white transition-colors block py-0.5 text-left cursor-pointer"
                  >
                    Track Past Bookings
                  </button>
                )}
              </li>
              <li>
                {user ? (
                  <Link to="/payments" className="hover:text-white transition-colors block py-0.5">
                    Payment Receipts
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => openAuthModal('signin')}
                    className="hover:text-white transition-colors block py-0.5 text-left cursor-pointer"
                  >
                    Payment Receipts
                  </button>
                )}
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition-colors block py-0.5">
                  View Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Company & Legal */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Trust & Safety
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button
                  type="button"
                  onClick={() =>
                    openLegalModal(
                      '30-Day Workmanship Guarantee',
                      'Every completed service through ServeEase carries our unconditional 30-day rework warranty. If you notice any defect, leaks, or substandard finish within 30 days of service signoff, simply request a rework from your dashboard. A verified senior specialist will revisit free of charge.'
                    )
                  }
                  className="hover:text-white transition-colors block py-0.5 text-left cursor-pointer"
                >
                  30-Day Guarantee Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    openLegalModal(
                      'Privacy & Security Policy',
                      'ServeEase adheres to strict data privacy principles. We never sell your personal information or address details to third-party telemarketers. Your location and contact details are only securely relayed to the assigned technician 30 minutes prior to the booked arrival window.'
                    )
                  }
                  className="hover:text-white transition-colors block py-0.5 text-left cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    openLegalModal(
                      'Terms of Service',
                      'All ServeEase home repairs and maintenance services are performed by background-verified specialists adhering to standard occupational safety measures. Standard cancellations made at least 2 hours before the scheduled arrival window incur zero cancellation penalties.'
                    )
                  }
                  className="hover:text-white transition-colors block py-0.5 text-left cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    openLegalModal(
                      'Pricing Transparency Promise',
                      'ServeEase calculates fixed quotes based on objective scope parameters (such as apartment size or repair type). Technicians will not levy arbitrary on-site markups. Genuine replacement parts are billed at transparent MSRP with original manufacturer receipts provided.'
                    )
                  }
                  className="hover:text-white transition-colors block py-0.5 text-left cursor-pointer"
                >
                  Pricing Transparency
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* We serve neighbourhood list */}
        <div className="pt-8 border-t border-neutral-800/80 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-neutral-300 uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-[#A9C9AC]" />
            <span>We serve across {currentCityConfig.name}:</span>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-neutral-400">
            {currentCityConfig.localities.map((loc) => (
              <Link
                key={loc.name}
                to={`/services?locality=${encodeURIComponent(loc.name)}`}
                className="hover:text-white transition-colors"
              >
                {loc.name} <span className="text-neutral-600">({loc.pincode})</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Copyright & Rights */}
        <div className="pt-8 border-t border-neutral-800 text-xs text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} ServeEase Technologies Inc. Crafted for quiet luxury in home care.</p>
          <div className="flex items-center gap-6">
            <span>Encrypted SSL 256-bit</span>
            <span>PCI-DSS Compliant</span>
            <span>Zero Data Brokerage</span>
          </div>
        </div>
      </div>

      {/* Accessible Legal Modal */}
      {legalModalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#1C222B] text-white rounded-3xl border border-neutral-700 max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-700">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#A9C9AC]" />
                <h3 className="text-base font-bold text-white">
                  {legalModalContent.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setLegalModalContent(null)}
                className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
              {legalModalContent.content}
            </p>
            <div className="pt-2 text-right">
              <button
                type="button"
                onClick={() => setLegalModalContent(null)}
                className="px-5 py-2 rounded-xl bg-white text-[#121820] text-xs font-bold hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
