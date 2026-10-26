import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#173D32] text-white section-viewport py-6 lg:py-0" aria-labelledby="cta-heading">
      {/* Background Architectural Line Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 600"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          preserveAspectRatio="none"
        >
          <path d="M0,300 L500,100 L1000,300" />
          <path d="M100,600 L100,340 L500,180 L900,340 L900,600" />
          <line x1="300" y1="600" x2="300" y2="400" />
          <line x1="700" y1="600" x2="700" y2="400" />
        </svg>
      </div>

      <div className="container-custom relative z-10 max-w-3xl text-center space-y-4 lg:space-y-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#A9C9AC] text-xs font-semibold backdrop-blur-md border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-[#A9C9AC]" />
            <span>Ready for effortless home maintenance?</span>
          </div>

          <h2
            id="cta-heading"
            className="heading-section text-white"
          >
            A better home starts with a little ease.
          </h2>

          <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto leading-relaxed font-normal">
            Whatever your home needs, we&apos;re here to make the next step simple. Book certified
            specialists with clear fixed quotes and zero friction.
          </p>
        </div>

        {/* Action Button & Badges */}
        <div className="space-y-4 lg:space-y-5">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/services"
              className="px-7 py-3.5 rounded-2xl bg-white hover:bg-[#F7F7F2] text-[#173D32] text-sm sm:text-base font-bold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-101 active:scale-99 flex items-center gap-2.5"
            >
              <span>Find Your Service</span>
              <ArrowRight className="w-4 h-4 text-[#173D32]" />
            </Link>
          </div>

          <div className="pt-1 flex flex-wrap items-center justify-center gap-5 text-xs text-white/70">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#A9C9AC]" />
              <span>Transparent fixed quotes</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#A9C9AC]" />
              <span>30-Day rework warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#A9C9AC]" />
              <span>Pay after inspection</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
