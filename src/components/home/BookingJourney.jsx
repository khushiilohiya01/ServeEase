import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  CheckSquare,
  Calendar,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const MILESTONES = [
  {
    step: '01',
    id: 'discover',
    title: 'Discover',
    description: 'Find the service your home needs.',
    icon: Search,
    // Placed BELOW curve: x=100, y=170
    xPercent: 10,
    yPercent: 53.125,
    textPosition: 'bottom',
    categoryLink: '/services',
  },
  {
    step: '02',
    id: 'choose',
    title: 'Choose',
    description: 'Select the option that suits you.',
    icon: CheckSquare,
    // Placed ABOVE curve: x=370, y=90
    xPercent: 37,
    yPercent: 28.125,
    textPosition: 'top',
    categoryLink: '/services?category=home_cleaning',
  },
  {
    step: '03',
    id: 'schedule',
    title: 'Schedule',
    description: 'Pick a convenient date and time.',
    icon: Calendar,
    // Placed BELOW curve: x=640, y=210
    xPercent: 64,
    yPercent: 65.625,
    textPosition: 'bottom',
    categoryLink: '/services',
  },
  {
    step: '04',
    id: 'relax',
    title: 'Relax',
    description: "We'll guide you through the rest.",
    icon: CheckCircle2,
    // Placed ABOVE curve: x=900, y=110
    xPercent: 90,
    yPercent: 34.375,
    textPosition: 'top',
    categoryLink: '/services',
  },
];

export function BookingJourney() {
  const [activeMilestone, setActiveMilestone] = useState(null);

  // SVG Cubic Bézier curve definition matching the milestones:
  // Starts at (100, 170) -> curves up to (370, 90) -> curves down to (640, 210) -> curves up to (900, 110)
  const curvePath = 'M 100,170 C 235,170 235,90 370,90 C 505,90 505,210 640,210 C 770,210 770,110 900,110';

  return (
    <section
      id="how-it-works"
      className="section-viewport bg-[#F7F8F4] border-b border-[#DDE4DB] py-6 lg:py-0 overflow-hidden"
      aria-labelledby="journey-heading"
    >
      <div className="container-custom space-y-4 lg:space-y-5 xl:space-y-6">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EDE7] text-[#173D32] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>How It Works</span>
            </div>
            <h2
              id="journey-heading"
              className="heading-section text-[#191E1B]"
            >
              Four steps. One easier home.
            </h2>
            <p className="text-sm sm:text-base text-[#647269] leading-relaxed">
              From finding the right service to getting it done.
            </p>
          </div>

          {/* Quick CTA to catalog */}
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#173D32] hover:text-[#245544] transition-colors group shrink-0"
          >
            <span>Browse all services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mobile Horizontal Scroll Hint */}
        <div className="flex items-center justify-between text-xs text-[#647269] lg:hidden px-1">
          <span>Swipe horizontally to follow the path</span>
          <span className="font-semibold text-[#173D32] flex items-center">
            Swipe <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* The Signature Continuous Organic Curved Journey Container */}
        <div className="relative overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
          <div className="min-w-[820px] lg:min-w-full relative h-[320px] lg:h-[340px] xl:h-[370px] select-none">
            {/* Background SVG Canvas with Continuous Organic Curved Path */}
            <svg
              viewBox="0 0 1000 320"
              className="w-full h-full absolute inset-0 overflow-visible pointer-events-none"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <defs>
                {/* Subtle gradient for the flowing stroke */}
                <linearGradient id="journeyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#173D32" stopOpacity="0.4" />
                  <stop offset="40%" stopColor="#173D32" stopOpacity="0.85" />
                  <stop offset="70%" stopColor="#245544" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#173D32" stopOpacity="0.6" />
                </linearGradient>

                {/* Subtle glow filter */}
                <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Muted background guide track */}
              <path
                d={curvePath}
                fill="none"
                stroke="#DDE4DB"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray="4 6"
              />

              {/* Animated Foreground Organic SVG Curve */}
              <motion.path
                d={curvePath}
                fill="none"
                stroke="url(#journeyGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 1.4,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.15,
                }}
              />

              {/* Flowing animated dash pulse along the path */}
              <motion.path
                d={curvePath}
                fill="none"
                stroke="#A9C9AC"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="20 180"
                initial={{ strokeDashoffset: 1000 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                opacity={0.7}
              />
            </svg>

            {/* The Four Milestones positioned precisely along the curve */}
            {MILESTONES.map((item, index) => {
              const Icon = item.icon;
              const isHovered = activeMilestone === item.id;
              const isTop = item.textPosition === 'top';

              return (
                <div
                  key={item.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 snap-center"
                  style={{
                    left: `${item.xPercent}%`,
                    top: `${item.yPercent}%`,
                  }}
                  onMouseEnter={() => setActiveMilestone(item.id)}
                  onMouseLeave={() => setActiveMilestone(null)}
                >
                  {/* Central Milestone Interactive Dot Anchor */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.25 + index * 0.2,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="relative flex items-center justify-center cursor-pointer group"
                  >
                    {/* Outer soft aura ring */}
                    <span
                      className={`absolute w-12 h-12 rounded-full transition-all duration-300 ${
                        isHovered
                          ? 'bg-[#173D32]/15 scale-125'
                          : 'bg-[#A9C9AC]/20 group-hover:scale-110'
                      }`}
                    />

                    {/* Main Milestone Circular Badge with Line Illustration */}
                    <div
                      className={`relative w-10 h-10 rounded-full border-2 transition-all duration-300 flex items-center justify-center shadow-md ${
                        isHovered
                          ? 'bg-[#173D32] border-[#173D32] text-white scale-110'
                          : 'bg-white border-[#173D32] text-[#173D32] group-hover:bg-[#F7F8F4]'
                      }`}
                    >
                      <Icon className="w-4.5 h-4.5 stroke-[2.2]" />
                    </div>

                    {/* Center Pin Indicator Dot */}
                    <span className="absolute -bottom-1 w-2 h-2 rounded-full bg-[#173D32]" />
                  </motion.div>

                  {/* Alternating Content (Above or Below the Curve) */}
                  <motion.div
                    initial={{ opacity: 0, y: isTop ? -10 : 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.4 + index * 0.2,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`absolute left-1/2 transform -translate-x-1/2 w-44 sm:w-52 text-center pointer-events-auto ${
                      isTop ? 'bottom-7 pb-2' : 'top-7 pt-2'
                    }`}
                  >
                    {/* Step Number Tag */}
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white border border-[#DDE4DB] text-[10px] font-semibold text-[#173D32] mb-1 shadow-2xs">
                      <span>{item.step}</span>
                      <span className="text-[#647269]">•</span>
                      <span>{item.title}</span>
                    </div>

                    {/* Milestone Title */}
                    <h3 className="text-sm sm:text-base font-bold text-[#191E1B] tracking-tight leading-snug">
                      {item.title}
                    </h3>

                    {/* Supporting Description */}
                    <p className="text-[11px] sm:text-xs text-[#647269] leading-relaxed mt-0.5">
                      {item.description}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Minimal Bottom Trust Footnote */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#DDE4DB]/80 text-xs text-[#647269]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#367A55]" />
            <span className="font-medium">Every stage is backed by our upfront pricing & 30-day rework guarantee</span>
          </div>
          <span className="text-[11px] text-[#647269]/80 font-normal">
            No on-site surprise charges • Direct human phone support
          </span>
        </div>
      </div>
    </section>
  );
}
