import { motion } from 'framer-motion';
import { FolderOpen } from 'lucide-react';
import { Button } from './Button';

export function EmptyState({
  icon: Icon = FolderOpen,
  title = 'No items found',
  description = 'There are no records matching your current selection or query.',
  actionLabel,
  onAction,
  className = '',
}) {
  return (
    <div className={`text-center py-12 px-6 rounded-3xl border border-dashed border-[#DDE3DA] bg-[#F7F7F2]/60 ${className}`}>
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="w-12 h-12 rounded-2xl bg-[#E8EBE2] border border-[#DDE3DA] flex items-center justify-center mx-auto text-[#173D32] mb-4"
      >
        <Icon className="w-6 h-6" />
      </motion.div>
      <h3 className="text-base sm:text-lg font-bold text-[#191E1B] tracking-tight">{title}</h3>
      <p className="text-xs sm:text-sm text-[#66716A] max-w-md mx-auto mt-1.5 mb-6 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
