import { ShieldCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { formatCurrency, formatDuration } from '../../lib/formatters';
import { TAX_RATE, PLATFORM_FEE } from '../../lib/constants';

export function PriceSummary({
  service,
  scheduledDate,
  scheduledSlot,
  address,
  couponDiscount = 0,
}) {
  if (!service) return null;

  const basePrice = service.base_price || 0;
  const taxes = Math.round(basePrice * TAX_RATE * 100) / 100;
  const fee = PLATFORM_FEE;
  const total = Math.max(0, Math.round((basePrice + taxes + fee - couponDiscount) * 100) / 100);

  return (
    <Card className="bg-white border-neutral-200/80 sticky top-24">
      <CardHeader className="pb-4">
        <CardTitle className="text-base">Booking Summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 pt-4">
        {/* Service item mini preview */}
        <div className="flex gap-3 pb-4 border-b border-neutral-100">
          <img
            src={service.image_url}
            alt={service.name}
            className="w-16 h-16 rounded-xl object-cover shrink-0 border border-neutral-100"
          />
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-neutral-900 line-clamp-1">{service.name}</h4>
            <p className="text-[11px] text-neutral-500 mt-0.5">Est. {formatDuration(service.duration_minutes)}</p>
            <span className="inline-block mt-1 text-xs font-bold text-teal-700">
              {formatCurrency(basePrice)}
            </span>
          </div>
        </div>

        {/* Schedule & Address details if selected */}
        {(scheduledDate || scheduledSlot || address) && (
          <div className="bg-neutral-50 rounded-xl p-3 text-xs space-y-1.5 border border-neutral-100">
            {scheduledDate && (
              <div className="flex justify-between">
                <span className="text-neutral-500">Date:</span>
                <span className="font-semibold text-neutral-800">{scheduledDate}</span>
              </div>
            )}
            {scheduledSlot && (
              <div className="flex justify-between">
                <span className="text-neutral-500">Time Slot:</span>
                <span className="font-semibold text-neutral-800">{scheduledSlot}</span>
              </div>
            )}
            {address && (
              <div className="flex justify-between items-start pt-1 border-t border-neutral-200/50">
                <span className="text-neutral-500 shrink-0">Location:</span>
                <span className="font-semibold text-neutral-800 text-right truncate max-w-[170px]">
                  {address.line1}, {address.city}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Price Breakdown */}
        <div className="space-y-2 text-xs text-neutral-600 pt-1">
          <div className="flex justify-between">
            <span>Base Service Rate</span>
            <span className="font-medium text-neutral-900">{formatCurrency(basePrice)}</span>
          </div>

          <div className="flex justify-between">
            <span className="flex items-center gap-1">
              Taxes (GST 5%)
            </span>
            <span className="font-medium text-neutral-900">{formatCurrency(taxes)}</span>
          </div>

          <div className="flex justify-between">
            <span className="flex items-center gap-1">
              Safety & Guarantee Fee
            </span>
            <span className="font-medium text-neutral-900">{formatCurrency(fee)}</span>
          </div>

          {couponDiscount > 0 && (
            <div className="flex justify-between text-teal-600 font-semibold">
              <span>Promotional Discount</span>
              <span>-{formatCurrency(couponDiscount)}</span>
            </div>
          )}

          <div className="pt-3 border-t border-neutral-200 flex justify-between items-baseline">
            <div>
              <span className="text-sm font-bold text-neutral-900 block">Total Due</span>
              <span className="text-[10px] text-neutral-400">Server verified final rate</span>
            </div>
            <span className="text-xl font-bold text-neutral-900">
              {formatCurrency(total)}
            </span>
          </div>
        </div>

        {/* Guarantee Banner */}
        <div className="pt-3 border-t border-neutral-100 flex items-center gap-2 text-[11px] text-neutral-500">
          <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
          <span>Covered by ServeEase 100% Happiness Guarantee</span>
        </div>
      </CardContent>
    </Card>
  );
}
