import { useMemo } from 'react';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { TIME_SLOTS } from '../../lib/constants';
import { addDays, isSlotInPast, toDateKey } from '../../lib/dates';

export function DateSlotPicker({
  selectedDate,
  onDateChange,
  selectedSlot,
  onSlotChange,
}) {
  const availableDates = useMemo(() => {
    const list = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const d = addDays(today, i);
      const iso = toDateKey(d);
      const dayName = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
      const monthName = d.toLocaleDateString('en-US', { month: 'short' });
      const dayNumber = d.getDate();
      list.push({ iso, dayName, monthName, dayNumber });
    }
    return list;
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-3 flex items-center gap-1.5">
          <CalendarIcon className="w-4 h-4 text-teal-700" />
          Select Service Date
        </label>

        <div className="flex gap-2.5 overflow-x-auto pb-2 no-scrollbar">
          {availableDates.map((item) => {
            const isSelected = selectedDate === item.iso;
            return (
              <button
                key={item.iso}
                type="button"
                onClick={() => onDateChange(item.iso)}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl min-w-[76px] transition-all duration-150 border cursor-pointer ${
                  isSelected
                    ? 'bg-teal-700 border-teal-700 text-white shadow-sm scale-102'
                    : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50/80'
                }`}
              >
                <span className={`text-[11px] font-semibold ${isSelected ? 'text-teal-100' : 'text-neutral-500'}`}>
                  {item.dayName}
                </span>
                <span className="text-lg font-bold my-0.5">{item.dayNumber}</span>
                <span className={`text-[10px] font-medium uppercase ${isSelected ? 'text-teal-200' : 'text-neutral-400'}`}>
                  {item.monthName}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-3 flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-teal-700" />
          Choose 2-Hour Arrival Slot
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {TIME_SLOTS.map((slot) => {
            const isSelected = selectedSlot === slot;
            const isPast = isSlotInPast(selectedDate, slot);
            return (
              <button
                key={slot}
                type="button"
                disabled={isPast}
                onClick={() => onSlotChange(slot)}
                className={`py-3 px-3.5 text-xs font-semibold rounded-xl text-center border transition-all duration-150 ${
                  isPast
                    ? 'bg-neutral-50 border-neutral-100 text-neutral-300 cursor-not-allowed line-through'
                    : isSelected
                    ? 'bg-teal-700 border-teal-700 text-white shadow-sm ring-2 ring-teal-700/20 cursor-pointer'
                    : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50 cursor-pointer'
                }`}
              >
                {slot}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
