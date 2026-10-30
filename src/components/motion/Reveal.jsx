import { motion } from 'framer-motion';
import { revealFrom, stagger, staggerItem } from '../../lib/motion';

const viewport = { once: true, amount: 0.2 };

// fades + slides its children in the first time they scroll into view
export function Reveal({ children, direction = 'up', delay = 0, className, ...props }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={revealFrom(direction, delay)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({ children, className, ...props }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={stagger}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, ...props }) {
  return (
    <motion.div className={className} variants={staggerItem} {...props}>
      {children}
    </motion.div>
  );
}
