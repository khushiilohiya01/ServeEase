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
      <Hero />

      <SeasonalStrip />

      <TrustStrip />

      <ExploreServices />

      <BookingJourney />

      <WhyServeEase />

      <Testimonials />

      <FinalCTA />
    </div>
  );
}
