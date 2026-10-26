import { motion, useReducedMotion } from 'framer-motion';
import { easeOut } from '../../lib/motion';

export function SplitHeading({
  text,
  as: Component = 'h2',
  className = '',
  delay = 0.1,
  staggerDelay = 0.05,
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion || !text) {
    return <Component className={className}>{text}</Component>;
  }

  const words = text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: '80%' },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: easeOut,
      },
    },
  };

  return (
    <Component className={className} aria-label={text}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="inline"
        aria-hidden="true"
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden align-top mr-[0.25em] last:mr-0">
            <motion.span variants={wordVariants} className="inline-block">
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Component>
  );
}
