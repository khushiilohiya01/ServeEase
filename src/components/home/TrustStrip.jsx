import { ShieldCheck, Receipt, CalendarCheck, Headphones } from 'lucide-react';

const TRUST_PILLARS = [
  {
    icon: ShieldCheck,
    title: 'Verified Professionals',
    desc: 'Background checks & trade credentials',
  },
  {
    icon: Receipt,
    title: 'Transparent Pricing',
    desc: 'Clear, itemized upfront quotes',
  },
  {
    icon: CalendarCheck,
    title: 'Flexible Scheduling',
    desc: 'Convenient appointment windows',
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    desc: 'Assistance before, during, and after',
  },
];

// rendered twice so translating by -50% loops cleanly
const MARQUEE_SET = [...TRUST_PILLARS, ...TRUST_PILLARS];

export function TrustStrip() {
  return (
    <section
      className="relative bg-white border-b border-[#DDE4DB] overflow-hidden py-4 sm:py-5 select-none"
      aria-label="Trust and Key Service Guarantees"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-white to-transparent z-10" />

      <div
        className="trust-marquee-track items-center"
        tabIndex={0}
        aria-label="Continuous guarantees marquee. Hover or focus to pause."
      >
        {[0, 1].map((setIndex) => (
          <div key={setIndex} className="flex items-center shrink-0">
            {MARQUEE_SET.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={`${setIndex}-${idx}`} className="flex items-center">
                  <div className="flex items-center gap-3 px-4 sm:px-6 shrink-0">
                    <div className="w-8 h-8 rounded-xl bg-[#F7F8F4] border border-[#DDE4DB] text-[#173D32] flex items-center justify-center shrink-0 shadow-2xs">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="whitespace-nowrap">
                      <h3 className="text-xs sm:text-sm font-semibold text-[#191E1B] tracking-tight">
                        {pillar.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-[#647269] leading-tight mt-0.5">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>

                  <div className="h-6 w-[1px] bg-[#DDE4DB] shrink-0" aria-hidden="true" />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
