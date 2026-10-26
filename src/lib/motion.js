/**
 * Canonical Motion System for ServeEase
 * Adheres to Section 10 specification:
 * - Fluid ease-out [0.16, 1, 0.3, 1]
 * - Standard reveal: 0.7s - 0.8s
 * - Stagger interval: 0.06s - 0.10s
 * - Interaction springs for tactile touch feedback
 */

export const easeOut = [0.16, 1, 0.3, 1];

export const defaultTransition = {
  duration: 0.7,
  ease: easeOut,
};

export const interactionSpring = {
  type: 'spring',
  stiffness: 320,
  damping: 26,
};

export const reveal = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: easeOut },
  },
};

export const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export const fadeOnly = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: easeOut },
  },
};
