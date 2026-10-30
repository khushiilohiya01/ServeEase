import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  X,
  ShieldCheck,
  BadgeCheck,
  RotateCcw,
  Wallet,
} from 'lucide-react';
import { SERVICE_CATEGORIES } from '../../lib/constants';
import { useAuth } from '../../context/AuthContext';
import { ArchitecturalIllustration } from '../home/ArchitecturalIllustration';

// just the most booked categories; "View All Services" covers the rest
const FOOTER_CATEGORY_IDS = ['ac', 'cleaning', 'electrician', 'plumber', 'appliances', 'pest_control'];

// promises the product actually makes, shown along the bottom row
const FOOTER_PROMISES = [
  { icon: BadgeCheck, label: 'Verified professionals' },
  { icon: RotateCcw, label: '30-day rework warranty' },
  { icon: Wallet, label: 'Pay after the job' },
];

export function Footer() {
  const { user, openAuthModal } = useAuth();
  const [legalModalContent, setLegalModalContent] = useState(null);

  const activeCategories = FOOTER_CATEGORY_IDS
    .map((id) => SERVICE_CATEGORIES.find((c) => c.id === id))
    .filter(Boolean);

  const openLegalModal = (title, content) => {
    setLegalModalContent({ title, content });
  };

  return (
    <footer
      className="bg-[#121820] text-neutral-300 py-10 lg:py-8 border-t border-neutral-800 lg:min-h-[calc(100dvh-var(--navbar-height))] flex flex-col justify-center"
      aria-label="Site Footer"
    >
      <div className="container-custom space-y-8 lg:space-y-10">
        <div className="pb-8 border-b border-neutral-800/80 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <div className="space-y-3 max-w-lg">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#A9C9AC]">
              <span className="w-6 h-px bg-[#A9C9AC]" aria-hidden="true" />
              Home services, sorted
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              Get things fixed at home <br className="hidden sm:block" />
              without chasing anyone.
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-md">
              Tell us what's broken, pick a time, and a checked technician turns up.
              You pay once the job is done.
            </p>
          </div>

          <div className="hidden md:block opacity-75 hover:opacity-100 transition-opacity duration-500">
            <ArchitecturalIllustration className="w-full h-auto max-h-36" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
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
              Home repairs and cleaning from verified technicians, with prices shown upfront
              and a 30-day rework warranty.
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

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Services
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

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Your account
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
                    My Bookings
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
                      'If something we fixed goes wrong within 30 days, tell us from your dashboard and we will send someone back to sort it out, free of charge.'
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
                      'We do not sell your details to anyone. Your technician only gets your address and phone number shortly before your booking, so they can find you.'
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
                      'Every job is done by a technician we have checked. You can cancel for free up to 2 hours before your slot.'
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
                      'Prices are fixed by the type of job and the size of your flat, and you see them before you book. Technicians cannot add charges on the spot. Spare parts are billed at MRP and you get the receipt.'
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

        <div className="pt-6 border-t border-neutral-800 text-xs text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} ServeEase. Made with care in India.</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {FOOTER_PROMISES.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-1.5">
                <Icon className="w-3.5 h-3.5 text-[#A9C9AC]" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {legalModalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="animate-in fade-in zoom-in-95 slide-in-from-bottom-4 bg-[#1C222B] text-white rounded-3xl border border-neutral-700 max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl relative">
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
