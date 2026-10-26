import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Plus, Check, Clock } from 'lucide-react';
import { formatPricingDisplay } from '../../../data/servicesData';

export function RoomServicesPanel({
  activeZone,
  roomServices,
  addedMap,
  onAddToCart,
  selectedBhk,
  selectedRoom,
}) {
  const navigate = useNavigate();

  return (
    <div className="lg:col-span-5 bg-white rounded-3xl border border-[#DDE4DB] p-5 sm:p-6 shadow-xs flex flex-col justify-between min-h-[500px]">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#DDE4DB]">
          <div>
            <h3 className="text-base font-bold text-[#191E1B]">
              {activeZone.label} Essentials
            </h3>
            <p className="text-xs text-[#647269] mt-0.5">
              {roomServices.length} popular doorstep services
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#E8EDE7] text-[#173D32]">
            {activeZone.label}
          </span>
        </div>

        {/* Service Cards Stack */}
        <div className="divide-y divide-[#DDE4DB]/60 mt-1">
          {roomServices.map((service) => {
            const isAdded = addedMap[service.id];
            const priceDisplay = formatPricingDisplay(service.pricing, selectedBhk);

            return (
              <div
                key={service.id}
                className="py-3 flex items-center justify-between gap-3 group"
              >
                <div className="flex-1 min-w-0 pr-2">
                  <Link
                    to={`/services/${service.id}`}
                    className="text-xs sm:text-sm font-bold text-[#191E1B] hover:text-[#173D32] transition-colors line-clamp-1"
                  >
                    {service.name}
                  </Link>
                  <p className="text-[11px] text-[#647269] truncate mt-0.5">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-[11px]">
                    <span className="font-bold text-[#173D32]">
                      {priceDisplay}
                    </span>
                    <span className="text-[#647269]">•</span>
                    <span className="flex items-center gap-1 text-[#647269]">
                      <Clock className="w-3 h-3 text-[#647269]" />
                      {service.durationMins}m
                    </span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => onAddToCart(e, service)}
                    aria-label={`Add ${service.name} to cart`}
                    className={`p-2 rounded-xl border transition-all duration-150 cursor-pointer shadow-2xs ${
                      isAdded
                        ? 'bg-[#367A55] text-white border-[#367A55]'
                        : 'bg-[#F7F8F4] border-[#DDE4DB] text-[#191E1B] hover:border-[#173D32] hover:text-[#173D32]'
                    }`}
                  >
                    {isAdded ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <Plus className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(`/booking/${service.id}`)}
                    className="px-3 py-2 rounded-xl bg-[#173D32] hover:bg-[#245544] text-white text-xs font-semibold cursor-pointer shadow-2xs transition-colors"
                  >
                    Book
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom link to catalog with room filter */}
      <div className="pt-4 mt-2 border-t border-[#DDE4DB]">
        <Link
          to={`/services?room=${selectedRoom}`}
          className="w-full py-2.5 rounded-xl bg-[#E8EDE7] hover:bg-[#DDE4DB] text-[#173D32] text-xs font-bold text-center flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <span>See all {activeZone.label} services</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
