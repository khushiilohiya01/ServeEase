import { lazy, Suspense } from 'react';
import { createBrowserRouter, Link, useRouteError } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { ProtectedRoute } from '../components/layout/ProtectedRoute';
import { Skeleton } from '../components/ui/Skeleton';
import { EmptyState } from '../components/ui/EmptyState';
import { Compass, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/Button';

const RELOAD_KEY = 'serveease_chunk_reload';

// After a deploy, a tab still running the old version asks for page files
// that no longer exist. Reload once to pick up the new version instead of
// crashing; if it still fails right after reloading, let the error screen show.
function lazyPage(load, exportName) {
  return lazy(() =>
    load().then(
      (module) => ({ default: module[exportName] }),
      (err) => {
        let lastReload = 0;
        try {
          lastReload = Number(sessionStorage.getItem(RELOAD_KEY)) || 0;
        } catch {
          // ignore
        }
        if (Date.now() - lastReload < 10000) throw err;

        try {
          sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
        } catch {
          // ignore
        }
        window.location.reload();
        // keep showing the loading skeleton until the reload kicks in
        return new Promise(() => {});
      }
    )
  );
}

const HomePage = lazyPage(() => import('../features/services/HomePage'), 'HomePage');
const ServicesListPage = lazyPage(() => import('../features/services/ServicesListPage'), 'ServicesListPage');
const ServiceDetailPage = lazyPage(() => import('../features/services/ServiceDetailPage'), 'ServiceDetailPage');
const LoginPage = lazyPage(() => import('../features/auth/LoginPage'), 'LoginPage');
const SignupPage = lazyPage(() => import('../features/auth/SignupPage'), 'SignupPage');
const CartPage = lazyPage(() => import('../features/cart/CartPage'), 'CartPage');
const CartCheckoutPage = lazyPage(() => import('../features/checkout/CartCheckoutPage'), 'CartCheckoutPage');
const BookingWizardPage = lazyPage(() => import('../features/booking/BookingWizardPage'), 'BookingWizardPage');
const CheckoutPage = lazyPage(() => import('../features/checkout/CheckoutPage'), 'CheckoutPage');
const BookingSuccessPage = lazyPage(() => import('../features/checkout/BookingSuccessPage'), 'BookingSuccessPage');
const DashboardPage = lazyPage(() => import('../features/dashboard/DashboardPage'), 'DashboardPage');
const BookingsListPage = lazyPage(() => import('../features/bookings/BookingsListPage'), 'BookingsListPage');
const BookingDetailPage = lazyPage(() => import('../features/bookings/BookingDetailPage'), 'BookingDetailPage');
const ProfilePage = lazyPage(() => import('../features/profile/ProfilePage'), 'ProfilePage');
const PaymentsPage = lazyPage(() => import('../features/payments/PaymentsPage'), 'PaymentsPage');

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

function RouteError() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F7F2] px-5">
      <div className="max-w-md w-full text-center bg-white border border-[#DDE3DA] rounded-3xl p-8 shadow-sm">
        <div className="w-12 h-12 rounded-2xl bg-[#E8EBE2] text-[#173D32] flex items-center justify-center mx-auto mb-4">
          <RefreshCw className="w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold text-[#191E1B]">Something went wrong</h1>
        <p className="text-sm text-[#66716A] mt-2 mb-6 leading-relaxed">
          This page didn&apos;t load properly. Reloading usually fixes it.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button variant="primary" onClick={() => window.location.reload()}>
            Reload page
          </Button>
          <Link to="/" reloadDocument>
            <Button variant="secondary">Go to Home</Button>
          </Link>
        </div>
      </div>
    </div>
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
    errorElement: <RouteError />,
    children: [
      { index: true, element: withSuspense(HomePage) },
      { path: 'services', element: withSuspense(ServicesListPage) },
      { path: 'services/:serviceId', element: withSuspense(ServiceDetailPage) },
      { path: 'cart', element: withSuspense(CartPage) },
      { path: 'login', element: withSuspense(LoginPage) },
      { path: 'signup', element: withSuspense(SignupPage) },

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

      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
