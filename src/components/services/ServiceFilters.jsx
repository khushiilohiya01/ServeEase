import { Search, X } from 'lucide-react';
import { SERVICE_CATEGORIES, SORT_OPTIONS } from '../../lib/constants';
import { ROOMS } from '../../data/servicesData';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

export function ServiceFilters({
  searchQuery = '',
  selectedCategory = 'all',
  selectedRoom = 'all',
  selectedSort = 'recommended',
  onSearchChange,
  onCategoryChange,
  onRoomChange,
  onSortChange,
  onReset,
  totalResults = 0,
}) {
  const isFiltered =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'all' ||
    selectedRoom !== 'all' ||
    selectedSort !== 'recommended';

  return (
    <div className="bg-white rounded-2xl border border-[#DDE4DB] p-4 sm:p-5 shadow-xs mb-8 space-y-4">
      {/* Top row: Search input & Sort dropdown */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-lg">
          <Input
            placeholder="Search symptoms: 'ac thanda nahi', 'tap leak', 'cockroach'..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            startIcon={Search}
            className="w-full text-sm"
            aria-label="Search services or symptoms"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#647269] hover:text-[#191E1B] p-1 cursor-pointer"
              aria-label="Clear search query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-48">
            <Select
              value={selectedSort}
              onChange={(e) => onSortChange(e.target.value)}
              options={SORT_OPTIONS}
              aria-label="Sort services by"
            />
          </div>

          {isFiltered && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="text-[#647269] hover:text-rose-600"
              icon={X}
            >
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Room Filter Chips (All, Kitchen, Bathroom, Bedroom, Hall, Balcony, Whole home) */}
      <div className="pt-2 border-t border-[#DDE4DB]/60 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-semibold text-[#647269] uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">
          Room:
        </span>
        <button
          type="button"
          onClick={() => onRoomChange('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
            selectedRoom === 'all'
              ? 'bg-[#173D32] text-white shadow-xs'
              : 'bg-[#F7F8F4] text-[#647269] hover:bg-[#E8EDE7] hover:text-[#173D32] border border-[#DDE4DB]/60'
          }`}
        >
          All
        </button>
        {ROOMS.map((room) => {
          const isActive = selectedRoom === room.id;
          return (
            <button
              key={room.id}
              type="button"
              onClick={() => onRoomChange(room.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-[#173D32] text-white shadow-xs'
                  : 'bg-[#F7F8F4] text-[#647269] hover:bg-[#E8EDE7] hover:text-[#173D32] border border-[#DDE4DB]/60'
              }`}
            >
              {room.label}
            </button>
          );
        })}
      </div>

      {/* Category Pills (horizontally scrollable on mobile) */}
      <div className="pt-2 border-t border-[#DDE4DB]/60 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-semibold text-[#647269] uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">
          Category:
        </span>
        {SERVICE_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onCategoryChange(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-[#173D32] text-white shadow-xs'
                  : 'bg-[#F7F8F4] text-[#647269] hover:bg-[#E8EDE7] hover:text-[#173D32] border border-[#DDE4DB]/60'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Results counter indicator */}
      <div className="flex items-center justify-between text-xs text-[#647269] pt-1">
        <span>
          Showing <strong className="text-[#191E1B]">{totalResults}</strong> available{' '}
          {totalResults === 1 ? 'service' : 'services'}
        </span>
        {isFiltered && <span className="text-[#173D32] font-semibold">Filtered view</span>}
      </div>
    </div>
  );
}
