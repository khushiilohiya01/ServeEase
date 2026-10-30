import { Reveal, Stagger, StaggerItem } from '../motion/Reveal';
import { ShieldCheck, CalendarCheck, Receipt, Sparkles } from 'lucide-react';

const PROPOSITIONS = [
  {
    number: '01',
    icon: ShieldCheck,
    title: 'Reliable home care',
    desc: 'Every specialist undergoes multi-stage background checks, trade credential verification, and practical skills evaluation before entering your space.',
  },
  {
    number: '02',
    icon: CalendarCheck,
    title: 'Simple scheduling',
    desc: 'Select guaranteed two-hour arrival windows that respect your schedule. Real-time arrival updates ensure zero waiting around.',
  },
  {
    number: '03',
    icon: Receipt,
    title: 'Clear service information',
    desc: 'Fixed upfront quotes with itemized inclusions before you book. No awkward negotiations, travel surcharges, or surprise replacement markups.',
  },
];

export function WhyServeEase() {
  return (
    <section id="why-serveease" className="section-viewport bg-white border-b border-[#DDE4DB] py-6 lg:py-0" aria-labelledby="why-heading">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          <Reveal direction="left" className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-[320px] xl:max-w-[360px]">
              <div className="relative aspect-3/4 max-h-[min(440px,calc(100dvh-12rem))] rounded-3xl overflow-hidden border border-[#DDE4DB] shadow-xl bg-neutral-100">
                <img
                  src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
                  alt="Modern clean living space demonstrating calm home care"
                  className="w-full h-full object-cover object-center transition-transform duration-[1.2s] ease-out hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#191E1B]/40 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-[#DDE4DB] shadow-md flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#191E1B]">The ServeEase Standard</span>
                  <span className="text-[#173D32] font-semibold">Disciplined craftsmanship</span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.1} className="lg:col-span-7 space-y-4 lg:space-y-5 xl:space-y-6 order-1 lg:order-2">
            <div className="space-y-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EDE7] text-[#173D32] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Our Ethos</span>
              </div>
              <h2
                id="why-heading"
                className="heading-section text-[#191E1B]"
              >
                The little details make all the difference.
              </h2>
              <p className="text-sm sm:text-base text-[#647269] leading-relaxed max-w-xl">
                Getting something fixed at home shouldn&apos;t mean chasing people on the phone.
                You see the price before you book, the technician is verified, and if the job
                isn&apos;t right we come back.
              </p>
            </div>

            <Stagger className="space-y-3 lg:space-y-3.5 xl:space-y-4 divide-y divide-[#DDE4DB]/80">
              {PROPOSITIONS.map((prop) => {
                const Icon = prop.icon;
                return (
                  <StaggerItem
                    key={prop.number}
                    className="pt-3 lg:pt-3.5 xl:pt-4 first:pt-0 flex items-start gap-4 group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#F7F8F4] border border-[#DDE4DB] text-[#173D32] flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 group-hover:bg-[#173D32] group-hover:text-white group-hover:rotate-6 group-hover:scale-110">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#173D32] font-mono">
                          {prop.number}
                        </span>
                        <h3 className="text-sm sm:text-base font-semibold text-[#191E1B] tracking-tight">
                          {prop.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-[#647269] leading-relaxed">
                        {prop.desc}
                      </p>
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
