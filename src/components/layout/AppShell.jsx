import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AuthModal } from '../auth/AuthModal';
import { BackToTop } from '../motion/BackToTop';
import { FloatingCartBar } from './FloatingCartBar';
import { AutoDetectLocation } from '../location/AutoDetectLocation';
import { pageTransition } from '../../lib/motion';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname]);

  return null;
}

export function AppShell() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F2] text-[#191E1B] selection:bg-[#A9C9AC]/40 selection:text-[#173D32] overflow-x-clip">
      <ScrollToTop />
      <AutoDetectLocation />
      <AuthModal />

      <Navbar />

      <main className="flex-1">
        <motion.div key={pathname} {...pageTransition}>
          <Outlet />
        </motion.div>
      </main>

      <Footer />

      <FloatingCartBar />
      <BackToTop />

      <Toaster
        position="top-center"
        containerStyle={{ top: 88 }}
        toastOptions={{
          duration: 4000,
          className: 'text-sm font-medium rounded-xl shadow-lg border border-[#DDE3DA]',
          style: {
            background: '#ffffff',
            color: '#191E1B',
            padding: '12px 16px',
            borderRadius: '12px',
          },
          success: {
            iconTheme: {
              primary: '#173D32',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#B54848',
              secondary: '#ffffff',
            },
          },
        }}
      />
    </div>
  );
}
