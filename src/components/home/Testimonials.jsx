import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SAMPLE_TESTIMONIALS = [
  {
    id: 1,
    quote:
      'The calmest home service experience I have ever had. The deep cleaning crew arrived precisely at 9 AM, wore protective shoe covers, and left our wooden floors spotless without any chemical odor.',
    author: 'Ananya Deshmukh',
    location: 'Indiranagar, Bengaluru',
    service: 'Full Home Deep Cleaning',
    rating: 5,
  },
  {
    id: 2,
    quote:
      'Finding a certified electrician who does not cut corners with wire splices used to take days. ServeEase dispatched an expert within two hours who systematically diagnosed our tripping MCB.',
    author: 'Vikram Malhotra',
    location: 'Powai, Mumbai',
    service: 'Electrical Diagnostics & Rewiring',
    rating: 5,
  },
  {
    id: 3,
    quote:
      'The fixed upfront quote was exactly what I paid at checkout. No surprise charges for washer replacements or travel fees. That level of transparency is unheard of in home repairs.',
    author: 'Priya Sundaram',
    location: 'Jubilee Hills, Hyderabad',
    service: 'Plumbing & Tap Cartridge Replacement',
    rating: 5,
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? SAMPLE_TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === SAMPLE_TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = SAMPLE_TESTIMONIALS[currentIndex];

  return (
    <section className="section-viewport bg-[#F7F8F4] border-b border-[#DDE4DB] py-6 lg:py-0" aria-labelledby="testimonials-heading">
      <div className="container-custom max-w-3xl space-y-4 lg:space-y-6 text-center">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EDE7] text-[#173D32] text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Customer Reviews</span>
          </div>
          <h2
            id="testimonials-heading"
            className="heading-section text-[#191E1B]"
          >
            Trusted in thousands of thoughtful homes.
          </h2>
        </div>

        <div className="relative bg-white rounded-3xl border border-[#DDE4DB] shadow-lg p-6 sm:p-8 lg:p-9 overflow-hidden">
          <div className="absolute top-4 right-6 text-5xl text-[#A9C9AC]/20 font-bold select-none pointer-events-none leading-none">
            &ldquo;
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 sm:space-y-5 relative z-10"
            >
              <div className="flex items-center justify-center gap-1 text-amber-500">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <blockquote className="text-base sm:text-lg md:text-xl text-[#191E1B] leading-relaxed font-normal max-w-2xl mx-auto">
                &ldquo;{current.quote}&rdquo;
              </blockquote>

              <div className="pt-1">
                <p className="text-sm font-semibold text-[#191E1B]">{current.author}</p>
                <p className="text-xs text-[#647269] mt-0.5">
                  {current.location} • <span className="text-[#173D32] font-semibold">{current.service}</span>
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="pt-5 flex items-center justify-center gap-4 relative z-10">
            <button
              type="button"
              onClick={handlePrev}
              className="w-9 h-9 rounded-full border border-[#DDE4DB] bg-white hover:bg-[#F7F8F4] text-[#191E1B] flex items-center justify-center transition-all cursor-pointer shadow-2xs hover:shadow-xs"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              {SAMPLE_TESTIMONIALS.map((t, idx) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx ? 'w-6 bg-[#173D32]' : 'w-2 bg-[#DDE4DB]'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="w-9 h-9 rounded-full border border-[#DDE4DB] bg-white hover:bg-[#F7F8F4] text-[#191E1B] flex items-center justify-center transition-all cursor-pointer shadow-2xs hover:shadow-xs"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
