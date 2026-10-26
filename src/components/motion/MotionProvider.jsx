import { MotionConfig } from 'framer-motion';
import { defaultTransition } from '../../lib/motion';

export function MotionProvider({ children }) {
  return (
    <MotionConfig reducedMotion="user" transition={defaultTransition}>
      {children}
    </MotionConfig>
  );
}
