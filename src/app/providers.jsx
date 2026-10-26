import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { MotionProvider } from '../components/motion/MotionProvider';
import { SmoothScroll } from '../components/motion/SmoothScroll';

export function AppProviders({ children }) {
  return (
    <AuthProvider>
      <CartProvider>
        <MotionProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </MotionProvider>
      </CartProvider>
    </AuthProvider>
  );
}
