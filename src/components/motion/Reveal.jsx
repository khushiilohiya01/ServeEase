import { motion, useReducedMotion } from 'framer-motion';
import { easeOut } from '../../lib/motion';

export function Reveal({ children, className = '', delay = 0, yOffset = 24, amount = 'some' }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const customVariant = {
    hidden: { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: easeOut,
        delay,
      },
    },
  };

  return (
    <motion.div
      variants={customVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount, margin: '0px 0px -20px 0px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
