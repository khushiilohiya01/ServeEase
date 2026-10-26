import { Check } from 'lucide-react';
import clsx from 'clsx';

export function BookingStepper({ currentStep = 1, steps = ['Schedule', 'Address', 'Review'] }) {
  return (
    <div className="w-full max-w-xl mx-auto mb-8 sm:mb-10 px-2">
      <div className="relative flex items-center justify-between">
        {/* Background Connecting Line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-neutral-200 z-0" />

        {/* Dynamic Progress Line */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-teal-700 transition-all duration-300 z-0"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div key={label} className="relative z-10 flex flex-col items-center">
              <div
                className={clsx(
                  'w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-200 border-2',
                  isCompleted &&
                    'bg-teal-700 border-teal-700 text-white shadow-xs',
                  isCurrent &&
                    'bg-white border-teal-700 text-teal-700 ring-4 ring-teal-50 shadow-sm',
                  !isCompleted &&
                    !isCurrent &&
                    'bg-white border-neutral-300 text-neutral-400'
                )}
              >
                {isCompleted ? <Check className="w-4 h-4 sm:w-5 sm:h-5" /> : stepNumber}
              </div>
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
