
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

const revealOffsets = {
  up: { y: 32 },
  down: { y: -32 },
  left: { x: -48 },
  right: { x: 48 },
  none: {},
};

export function revealFrom(direction = 'up', delay = 0) {
  return {
    hidden: { opacity: 0, ...revealOffsets[direction] },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.75, ease: easeOut, delay },
    },
  };
}

export const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOut } },
};

// wizard steps slide in from the side you're heading towards
export const stepSlide = {
  enter: (direction) => ({ opacity: 0, x: direction > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.4, ease: easeOut } },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -60 : 60,
    transition: { duration: 0.2, ease: 'easeIn' },
  }),
};

export const listItem = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: easeOut, delay: Math.min(i, 8) * 0.06 },
  }),
  exit: { opacity: 0, x: -60, transition: { duration: 0.25, ease: 'easeIn' } },
};
