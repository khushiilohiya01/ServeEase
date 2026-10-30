import { Check } from 'lucide-react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { easeOut, interactionSpring } from '../../lib/motion';

export function BookingStepper({ currentStep = 1, steps = ['Schedule', 'Address', 'Review'] }) {
  return (
    <div className="w-full max-w-xl mx-auto mb-8 sm:mb-10 px-2">
      <div className="relative flex items-center justify-between">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-neutral-200 z-0" />

        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-teal-700 z-0"
          initial={false}
          animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.6, ease: easeOut }}
        />

        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div key={label} className="relative z-10 flex flex-col items-center">
              <motion.div
                animate={{ scale: isCurrent ? 1.1 : 1 }}
                transition={interactionSpring}
                className={clsx(
                  'w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-colors duration-300 border-2',
                  isCompleted &&
                    'bg-teal-700 border-teal-700 text-white shadow-xs',
                  isCurrent &&
                    'bg-white border-teal-700 text-teal-700 ring-4 ring-teal-50 shadow-sm',
                  !isCompleted &&
                    !isCurrent &&
                    'bg-white border-neutral-300 text-neutral-400'
                )}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isCompleted ? (
                    <motion.span
                      key="done"
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0 }}
                      transition={interactionSpring}
                    >
                      <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.span>
                  ) : (
                    <motion.span key="number" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      {stepNumber}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
              <span
                className={clsx(
                  'mt-2 text-xs font-semibold whitespace-nowrap',
                  isCurrent ? 'text-teal-800' : isCompleted ? 'text-neutral-800' : 'text-neutral-400'
                )}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
