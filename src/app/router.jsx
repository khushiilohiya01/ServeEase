import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { ProtectedRoute } from '../components/layout/ProtectedRoute';
import { Skeleton } from '../components/ui/Skeleton';
import { EmptyState } from '../components/ui/EmptyState';
import { Compass } from 'lucide-react';

// Lazy-loaded Feature Pages for optimized code-splitting
const HomePage = lazy(() => import('../features/services/HomePage').then(m => ({ default: m.HomePage })));
const ServicesListPage = lazy(() => import('../features/services/ServicesListPage').then(m => ({ default: m.ServicesListPage })));
const ServiceDetailPage = lazy(() => import('../features/services/ServiceDetailPage').then(m => ({ default: m.ServiceDetailPage })));
const LoginPage = lazy(() => import('../features/auth/LoginPage').then(m => ({ default: m.LoginPage })));
const SignupPage = lazy(() => import('../features/auth/SignupPage').then(m => ({ default: m.SignupPage })));
const CartPage = lazy(() => import('../features/cart/CartPage').then(m => ({ default: m.CartPage })));
const CartCheckoutPage = lazy(() => import('../features/checkout/CartCheckoutPage').then(m => ({ default: m.CartCheckoutPage })));
const BookingWizardPage = lazy(() => import('../features/booking/BookingWizardPage').then(m => ({ default: m.BookingWizardPage })));
const CheckoutPage = lazy(() => import('../features/checkout/CheckoutPage').then(m => ({ default: m.CheckoutPage })));
const BookingSuccessPage = lazy(() => import('../features/checkout/BookingSuccessPage').then(m => ({ default: m.BookingSuccessPage })));
const DashboardPage = lazy(() => import('../features/dashboard/DashboardPage').then(m => ({ default: m.DashboardPage })));
const BookingsListPage = lazy(() => import('../features/bookings/BookingsListPage').then(m => ({ default: m.BookingsListPage })));
const BookingDetailPage = lazy(() => import('../features/bookings/BookingDetailPage').then(m => ({ default: m.BookingDetailPage })));
const ProfilePage = lazy(() => import('../features/profile/ProfilePage').then(m => ({ default: m.ProfilePage })));
const PaymentsPage = lazy(() => import('../features/payments/PaymentsPage').then(m => ({ default: m.PaymentsPage })));

function RouteFallback() {
  return (
    <div className="container-custom py-16 space-y-6">
      <Skeleton className="h-10 w-72 rounded-xl" />
      <Skeleton className="h-4 w-96 rounded-md" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <Skeleton className="h-48 rounded-2xl" />
        <Skeleton className="h-48 rounded-2xl" />
        <Skeleton className="h-48 rounded-2xl" />
      </div>
    </div>
  );
}

function withSuspense(Component) {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Component />
    </Suspense>
  );
}

function NotFoundPage() {
  return (
    <div className="container-custom py-20 text-center">
      <EmptyState
        icon={Compass}
        title="Page Not Found"
        description="The page you are looking for does not exist or may have been moved."
        actionLabel="Go to Home"
        onAction={() => window.location.assign('/')}
      />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      // Public routes
      { index: true, element: withSuspense(HomePage) },
      { path: 'services', element: withSuspense(ServicesListPage) },
      { path: 'services/:serviceId', element: withSuspense(ServiceDetailPage) },
      { path: 'cart', element: withSuspense(CartPage) },
      { path: 'login', element: withSuspense(LoginPage) },
      { path: 'signup', element: withSuspense(SignupPage) },

      // Protected routes (require authenticated session)
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'checkout', element: withSuspense(CartCheckoutPage) },
          { path: 'booking/:serviceId', element: withSuspense(BookingWizardPage) },
          { path: 'checkout/:bookingId', element: withSuspense(CheckoutPage) },
          { path: 'booking-success/:bookingId', element: withSuspense(BookingSuccessPage) },
          { path: 'dashboard', element: withSuspense(DashboardPage) },
          { path: 'bookings', element: withSuspense(BookingsListPage) },
          { path: 'bookings/:bookingId', element: withSuspense(BookingDetailPage) },
          { path: 'profile', element: withSuspense(ProfilePage) },
          { path: 'payments', element: withSuspense(PaymentsPage) },
        ],
      },

      // Fallback 404
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
