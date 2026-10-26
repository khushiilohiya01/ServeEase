import { Hero } from '../../components/home/Hero';
import { SeasonalStrip } from '../../components/home/SeasonalStrip';
import { TrustStrip } from '../../components/home/TrustStrip';
import { ExploreServices } from '../../components/home/ExploreServices';
import { BookingJourney } from '../../components/home/BookingJourney';
import { WhyServeEase } from '../../components/home/WhyServeEase';
import { Testimonials } from '../../components/home/Testimonials';
import { FinalCTA } from '../../components/home/FinalCTA';

export function HomePage() {
  return (
    <div className="space-y-0">
      {/* 1. Hero */}
      <Hero />

      {/* 2. Seasonal Strip (Slim, dismissible, date & city driven) */}
      <SeasonalStrip />

      {/* 3. Trust Strip */}
      <TrustStrip />

      {/* 4. Unified Explore Services (Featured Upfront Packages) */}
      <ExploreServices />

      {/* 5. Horizontal Curved How It Works Journey */}
      <BookingJourney />

      {/* 6. Why ServeEase */}
      <WhyServeEase />

      {/* 7. Featured Testimonial */}
      <Testimonials />

      {/* 8. Final CTA */}
      <FinalCTA />
    </div>
  );
}
