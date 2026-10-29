import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import clsx from 'clsx';

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = 'max-w-lg',
  className = '',
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={modalRef}
        className={clsx(
          'relative w-full bg-white rounded-3xl shadow-2xl border border-[#DDE3DA] z-10 overflow-hidden transform transition-all duration-200 animate-in fade-in zoom-in-95',
          maxWidth,
          className
        )}
      >
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[#DDE3DA]/80">
          <div>
            {title && (
              <h2 id="modal-title" className="text-lg sm:text-xl font-bold text-[#191E1B] tracking-tight">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-xs sm:text-sm text-[#66716A] mt-0.5">{description}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 rounded-xl text-[#66716A] hover:text-[#191E1B] hover:bg-[#E8EBE2] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6">{children}</div>
      </div>
    </div>,
    document.body
  );
}
