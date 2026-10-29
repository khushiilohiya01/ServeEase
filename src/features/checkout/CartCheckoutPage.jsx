import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  MapPin,
  Clock,
  ShieldCheck,
  CreditCard,
  Banknote,
  Plus,
  Check,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { apiRequest } from '../../lib/apiClient';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { TIME_SLOTS, PAYMENT_PROMISE, GUARANTEE_PROMISE } from '../../lib/constants';
import { formatCurrency } from '../../lib/formatters';
import { firstOpenSlot, isSlotInPast, slotToISO, toDateKey } from '../../lib/dates';
import toast from 'react-hot-toast';

export function CartCheckoutPage() {
  const { items, subtotal, tax, platformFee, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [initialSlot] = useState(() => firstOpenSlot(TIME_SLOTS));
  const [selectedDate, setSelectedDate] = useState(initialSlot.date);
  const [selectedSlot, setSelectedSlot] = useState(initialSlot.slot);
  const [paymentOption, setPaymentOption] = useState('pay_after');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: 'Home',
    line1: '',
    city: 'Bengaluru',
    state: 'Karnataka',
    postal_code: '560038',
  });

  useEffect(() => {
    async function loadAddresses() {
      try {
        const res = await apiRequest('/addresses');
        const list = res?.data || [];
        setAddresses(list);
        if (list.length > 0) {
          const defaultAddr = list.find((a) => a.is_default) || list[0];
          setSelectedAddressId(defaultAddr.id);
        } else {
          setIsAddingAddress(true);
        }
      } catch {
        // not fatal, user can still add an address
      }
    }
    loadAddresses();
  }, []);

  if (items.length === 0) {
    return (
      <div className="container-custom py-16 text-center">
        <h2 className="text-xl font-bold text-neutral-900">Your cart is currently empty</h2>
        <p className="text-xs text-neutral-500 mt-1">Add services before proceeding to checkout.</p>
        <Link to="/services" className="inline-block mt-4">
          <Button variant="primary" size="md">Browse Services</Button>
        </Link>
      </div>
    );
  }

  const handleAddNewAddress = async (e) => {
    e.preventDefault();
    if (!newAddress.line1.trim()) {
      toast.error('Please enter your street address');
      return;
    }
    try {
      const res = await apiRequest('/addresses', {
        method: 'POST',
        body: JSON.stringify(newAddress),
      });
      const created = res.data;
      setAddresses((prev) => [created, ...prev]);
      setSelectedAddressId(created.id);
      setIsAddingAddress(false);
      toast.success('Address added successfully');
    } catch (err) {
      toast.error(err.message || 'Failed to save address');
    }
  };

  const handleConfirmBooking = async () => {
    if (!selectedAddressId || isAddingAddress) {
      toast.error(isAddingAddress ? 'Please save the new address first' : 'Please select or add a service address');
      return;
    }
    if (isSlotInPast(selectedDate, selectedSlot)) {
      toast.error('That slot has already started. Please pick a later one.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await apiRequest('/bookings', {
        method: 'POST',
        body: JSON.stringify({
          service_id: items[0]?.serviceId,
          address_id: selectedAddressId,
          scheduled_at: slotToISO(selectedDate, selectedSlot),
          notes,
          cart_items: items,
        }),
      });

      const booking = res.data;
      clearCart();
      if (paymentOption === 'online_payment') {
        navigate(`/checkout/${booking.id}`, { replace: true });
      } else {
        toast.success('Booking confirmed. Pay after the job is done.');
        navigate(`/booking-success/${booking.id}`, { replace: true });
      }
    } catch (err) {
      toast.error(err.message || 'Failed to place booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-custom py-10 sm:py-16">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
          Complete Your Booking
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 mt-1">
          Select doorstep arrival window, address, and payment method.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <Card className="p-6 bg-white border-[#DDE3DA]">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#DDE3DA]/60">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#173D32]" />
                <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wide">
                  1. Service Address
                </h2>
              </div>
              {!isAddingAddress && (
                <button
                  type="button"
                  onClick={() => setIsAddingAddress(true)}
                  className="text-xs text-[#173D32] hover:text-[#245544] font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New</span>
                </button>
              )}
            </div>

            {isAddingAddress ? (
              <form onSubmit={handleAddNewAddress} className="space-y-3">
                <Input
                  label="Street Address / Flat No."
                  placeholder="e.g. #402, Palm Heights, 12th Main Road"
                  value={newAddress.line1}
                  onChange={(e) => setNewAddress({ ...newAddress, line1: e.target.value })}
                  required
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="City"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                    required
                  />
                  <Input
                    label="Pincode"
                    value={newAddress.postal_code}
                    onChange={(e) => setNewAddress({ ...newAddress, postal_code: e.target.value })}
                    required
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  {addresses.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsAddingAddress(false)}
                    >
                      Cancel
                    </Button>
                  )}
                  <Button variant="primary" size="sm" type="submit">
                    Save Address
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-2">
                {addresses.map((addr) => (
                  <label
                    key={addr.id}
                    className={`block p-3.5 rounded-xl border transition-all cursor-pointer ${
                      selectedAddressId === addr.id
                        ? 'border-[#173D32] bg-[#E8EBE2]/30 ring-1 ring-[#173D32]/20'
                        : 'border-[#DDE3DA] hover:border-[#173D32]/40'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="address"
                          checked={selectedAddressId === addr.id}
                          onChange={() => setSelectedAddressId(addr.id)}
                          className="text-[#173D32] focus:ring-[#173D32] cursor-pointer"
                        />
                        <div>
                          <span className="text-xs font-bold text-neutral-900 block">
                            {addr.label || 'Home'}
                          </span>
                          <span className="text-xs text-[#66716A] block mt-0.5">
                            {addr.line1}, {addr.city} - {addr.postal_code}
                          </span>
                        </div>
                      </div>
                      {selectedAddressId === addr.id && (
                        <Check className="w-4 h-4 text-[#173D32]" />
                      )}
                    </div>
                  </label>
                ))}
              </div>
            )}
          </Card>

          <Card className="p-6 bg-white border-[#DDE3DA]">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#DDE3DA]/60">
              <Clock className="w-4 h-4 text-[#173D32]" />
              <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wide">
                2. Arrival Slot (2-Hour Window)
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1.5">
                  Service Date
                </label>
                <input
                  type="date"
                  min={toDateKey()}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full sm:w-64 rounded-xl border border-[#DDE3DA] bg-white px-3.5 py-2 text-xs sm:text-sm text-neutral-900 focus:outline-hidden focus:border-[#173D32]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase mb-2">
                  Select Arrival Window
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      disabled={isSlotInPast(selectedDate, slot)}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 disabled:line-through ${
                        selectedSlot === slot
                          ? 'border-[#173D32] bg-[#E8EBE2] text-[#173D32]'
                          : 'border-[#DDE3DA] bg-white text-neutral-700 hover:border-[#173D32]/40'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                  Technician Instructions (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Ring doorbell, lift is on the left side..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-xl border border-[#DDE3DA] bg-white p-3 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:border-[#173D32]"
                />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border-[#DDE3DA]">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#DDE3DA]/60">
              <CreditCard className="w-4 h-4 text-[#173D32]" />
              <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wide">
                3. Payment Method
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentOption('pay_after')}
                className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                  paymentOption === 'pay_after'
                    ? 'border-[#173D32] bg-[#E8EBE2]/40 ring-1 ring-[#173D32]/20'
                    : 'border-[#DDE3DA] hover:border-[#173D32]/40'
                }`}
              >
                <Banknote className="w-5 h-5 text-[#173D32] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-neutral-900">Pay After Service</h4>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    Inspect completed work before releasing payment via Cash, UPI, or Card.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentOption('online_payment')}
                className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                  paymentOption === 'online_payment'
                    ? 'border-[#173D32] bg-[#E8EBE2]/40 ring-1 ring-[#173D32]/20'
                    : 'border-[#DDE3DA] hover:border-[#173D32]/40'
                }`}
              >
                <CreditCard className="w-5 h-5 text-[#173D32] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-neutral-900">Online Payment / UPI</h4>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    Pay securely using Google Pay, PhonePe, Paytm, or Credit/Debit Card.
                  </p>
                </div>
              </button>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#DDE3DA] shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-[#DDE3DA]/60 pb-3">
            <h2 className="text-base font-bold text-neutral-900">
              Booking Summary ({items.length} Service{items.length > 1 ? 's' : ''})
            </h2>
            <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#E8EBE2] text-[#173D32]">
              Demo Mode
            </span>
          </div>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {items.map((i) => (
              <div key={i.cartItemId} className="flex justify-between items-start text-xs pb-2 border-b border-neutral-50">
                <div>
                  <p className="font-bold text-neutral-900">{i.name}</p>
                  {i.bhk && (
                    <span className="text-[10px] text-[#173D32] font-semibold bg-[#E8EBE2] px-1.5 py-0.5 rounded">
                      {i.bhk} BHK Scope
                    </span>
                  )}
                </div>
                <span className="font-semibold text-neutral-900">
                  {formatCurrency(i.price)}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-xs text-neutral-600 pt-2 border-t border-[#DDE3DA]/60">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-neutral-900">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>GST & Taxes (5%)</span>
              <span className="font-semibold text-neutral-900">{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between">
              <span>Doorstep Platform & Safety Fee</span>
              <span className="font-semibold text-neutral-900">{formatCurrency(platformFee)}</span>
            </div>
            <div className="pt-3 border-t border-[#DDE3DA]/60 flex justify-between items-baseline text-sm">
              <span className="font-bold text-neutral-900">Total Amount</span>
              <span className="text-xl font-bold text-[#173D32]">
                {formatCurrency(total)}
              </span>
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            className="w-full font-semibold shadow-xs"
            isLoading={isSubmitting}
            onClick={handleConfirmBooking}
          >
            Confirm & Schedule Booking
          </Button>

          <p className="text-center text-[11px] text-[#66716A]">
            Pay after service completion via UPI or cash. 100% satisfaction guarantee.
          </p>

          <div className="pt-3 border-t border-[#DDE3DA]/60 space-y-2 text-[11px] text-[#66716A]">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#173D32] shrink-0" />
              <span>{PAYMENT_PROMISE}</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#173D32] shrink-0" />
              <span>{GUARANTEE_PROMISE}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
