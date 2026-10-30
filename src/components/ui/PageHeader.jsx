import { motion } from 'framer-motion';
import { stagger, staggerItem } from '../../lib/motion';

export function PageHeader({
  badge,
  title,
  description,
  actions,
  className = '',
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className={`mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4 ${className}`}
    >
      <div>
        {badge && <motion.div variants={staggerItem} className="mb-2.5">{badge}</motion.div>}
        <motion.h1 variants={staggerItem} className="heading-section text-[#191E1B]">
          {title}
        </motion.h1>
        {description && (
          <motion.p variants={staggerItem} className="mt-1.5 text-base text-[#66716A] max-w-2xl leading-relaxed">
            {description}
          </motion.p>
        )}
      </div>
      {actions && (
        <motion.div variants={staggerItem} className="flex items-center gap-3 shrink-0">
          {actions}
        </motion.div>
      )}
    </motion.div>
  );
}
