import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Plus,
  Compass,
  ArrowRight,
  ArrowLeft,
  Check,
} from 'lucide-react';
import { apiRequest } from '../../lib/apiClient';
import { TIME_SLOTS } from '../../lib/constants';
import { firstOpenSlot, isSlotInPast, slotToISO } from '../../lib/dates';
import { BookingStepper } from '../../components/booking/BookingStepper';
import { DateSlotPicker } from '../../components/booking/DateSlotPicker';
import { PriceSummary } from '../../components/booking/PriceSummary';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Skeleton } from '../../components/ui/Skeleton';
import toast from 'react-hot-toast';
import { ServiceSpotIllustration } from '../../components/illustrations/ServiceSpotIllustration';

export function BookingWizardPage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [isLoadingService, setIsLoadingService] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);

  const [initialSlot] = useState(() => firstOpenSlot(TIME_SLOTS));
  const [selectedDate, setSelectedDate] = useState(initialSlot.date);
  const [selectedSlot, setSelectedSlot] = useState(initialSlot.slot);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [notes, setNotes] = useState('');

  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: 'Home',
    line1: '',
    line2: '',
    city: 'Bengaluru',
    state: 'Karnataka',
    postal_code: '560103',
    country: 'India',
    is_default: true,
  });

  useEffect(() => {
    async function loadData() {
      setIsLoadingService(true);
      try {
        const [serviceRes, addressesRes] = await Promise.all([
          apiRequest(`/services/${serviceId}`),
          apiRequest('/addresses'),
        ]);

        const sData = serviceRes?.data;
        setService(sData);

        const aData = addressesRes?.data || [];
        setAddresses(aData);
        if (aData.length > 0) {
          const defaultAddr = aData.find((a) => a.is_default) || aData[0];
          setSelectedAddressId(defaultAddr.id);
        } else {
          setIsAddingNewAddress(true);
        }
      } catch (err) {
        toast.error(err.message || 'Error loading booking requirements');
      } finally {
        setIsLoadingService(false);
      }
    }

    loadData();
  }, [serviceId]);

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const { latitude, longitude } = pos.coords;
        setNewAddress((prev) => ({
          ...prev,
          line1: `Detected Location (${latitude.toFixed(3)}, ${longitude.toFixed(3)})`,
          city: 'Bengaluru',
          state: 'Karnataka',
          postal_code: '560103',
        }));
        setIsAddingNewAddress(true);
        toast.success('Coordinates located. Please verify street number and unit details.');
      },
      (err) => {
        setIsLocating(false);
        console.warn('Geolocation denied or failed:', err.message);
        toast.error('Location permission was denied. Please enter address manually.');
      },
      { timeout: 10000 }
    );
  };

  const handleSaveNewAddress = async () => {
    if (!newAddress.line1.trim() || !newAddress.city.trim()) {
      toast.error('Please fill in street address and city.');
      return;
    }

    try {
      const res = await apiRequest('/addresses', {
        method: 'POST',
        body: JSON.stringify(newAddress),
      });
      const created = res?.data;
      setAddresses((prev) => [...prev, created]);
      setSelectedAddressId(created.id);
      setIsAddingNewAddress(false);
      toast.success('Address saved to your address book!');
    } catch (err) {
      toast.error(err.message || 'Could not save address');
    }
  };

  const currentSelectedAddress = addresses.find((a) => a.id === selectedAddressId);

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!selectedDate || !selectedSlot) {
        toast.error('Please pick a date and time slot.');
        return;
      }
      if (isSlotInPast(selectedDate, selectedSlot)) {
        toast.error('That slot has already started. Please pick a later one.');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!selectedAddressId && !isAddingNewAddress) {
        toast.error('Please choose or enter a service address.');
        return;
      }
      if (isAddingNewAddress && (!newAddress.line1 || !newAddress.city)) {
        toast.error('Please save or complete the address details.');
        return;
      }
      setCurrentStep(3);
    }
  };

  const handleCreateBooking = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        service_id: service.id,
        address_id: selectedAddressId,
        scheduled_at: slotToISO(selectedDate, selectedSlot),
        notes,
        custom_address: isAddingNewAddress ? newAddress : null,
      };

      const res = await apiRequest('/bookings', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      const createdBooking = res?.data;
      toast.success('Booking initialized! Proceeding to payment...');
      navigate(`/checkout/${createdBooking.id}`);
    } catch (err) {
      toast.error(err.message || 'Failed to create booking.');
      setIsSubmitting(false);
    }
  };

  if (isLoadingService) {
    return (
      <div className="container-custom py-12 space-y-8">
        <Skeleton className="h-10 w-96 mx-auto rounded-xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-64 rounded-2xl" />
          </div>
          <div>
            <Skeleton className="h-80 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="container-custom py-16 text-center">
        <p className="text-neutral-500">Service not found.</p>
      </div>
    );
  }

  return (
    <div className="container-custom py-8 sm:py-12">
      <BookingStepper
        currentStep={currentStep}
        steps={['Select Time', 'Address & Notes', 'Review & Confirm']}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          {currentStep === 1 && (
            <Card className="border-neutral-200/90 shadow-sm">
              <CardContent className="p-6 sm:p-8 space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-neutral-900">
                    Step 1: Choose Appointment Date & Time
                  </h2>
                  <p className="text-xs text-neutral-500 mt-1">
                    Select when you would like the certified specialist to arrive at your property.
                  </p>
                </div>

                <DateSlotPicker
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                  selectedSlot={selectedSlot}
                  onSlotChange={setSelectedSlot}
                />

                <div className="pt-4 border-t border-neutral-100 flex justify-end">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleNextStep}
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    Continue to Address
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <Card className="border-neutral-200/90 shadow-sm">
              <CardContent className="p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold text-neutral-900">
                      Step 2: Service Location & Instructions
                    </h2>
                    <p className="text-xs text-neutral-500 mt-1">
                      Choose where the service will be performed.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleUseCurrentLocation}
                      isLoading={isLocating}
                      icon={Compass}
                    >
                      Use My Location
                    </Button>
                    {!isAddingNewAddress && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsAddingNewAddress(true)}
                        icon={Plus}
                      >
                        New Address
                      </Button>
                    )}
                  </div>
                </div>

                {!isAddingNewAddress && addresses.length > 0 && (
                  <div className="space-y-3">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700">
                      Saved Addresses
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {addresses.map((addr) => {
                        const isSelected = selectedAddressId === addr.id;
                        return (
                          <div
                            key={addr.id}
                            onClick={() => setSelectedAddressId(addr.id)}
                            className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                              isSelected
                                ? 'border-teal-700 bg-teal-50/30 ring-2 ring-teal-700/20'
                                : 'border-neutral-200 bg-white hover:border-neutral-300'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <span className="text-xs font-bold text-neutral-900">
                                {addr.label}
                              </span>
                              {isSelected && (
                                <span className="w-5 h-5 rounded-full bg-teal-700 text-white flex items-center justify-center">
                                  <Check className="w-3 h-3" />
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-neutral-600 mt-1 line-clamp-1">{addr.line1}</p>
                            <p className="text-[11px] text-neutral-400">
                              {addr.city}, {addr.state} {addr.postal_code}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {isAddingNewAddress && (
                  <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                        Enter Address Details
                      </h3>
                      {addresses.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setIsAddingNewAddress(false)}
                          className="text-xs text-teal-700 font-semibold"
                        >
                          Cancel / Use Saved
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Input
                        label="Address Label"
                        placeholder="e.g. Home, Vacation Villa"
                        value={newAddress.label}
                        onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                      />
                      <Input
                        label="Street Line 1"
                        placeholder="123 Maple Street"
                        value={newAddress.line1}
                        onChange={(e) => setNewAddress({ ...newAddress, line1: e.target.value })}
                        required
                      />
                      <Input
                        label="Unit / Suite / Apt (Optional)"
                        placeholder="Apt 4B"
                        value={newAddress.line2}
                        onChange={(e) => setNewAddress({ ...newAddress, line2: e.target.value })}
                      />
                      <Input
                        label="City"
                        placeholder="Bengaluru"
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                        required
                      />
                      <Input
                        label="State"
                        placeholder="Karnataka"
                        value={newAddress.state}
                        onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                        required
                      />
                      <Input
                        label="PIN Code"
                        placeholder="560103"
                        value={newAddress.postal_code}
                        onChange={(e) => setNewAddress({ ...newAddress, postal_code: e.target.value })}
                        required
                      />
                    </div>

                    <Button variant="secondary" size="sm" onClick={handleSaveNewAddress}>
                      Save Address to Bookings
                    </Button>
                  </div>
                )}

                <div className="pt-2">
                  <Textarea
                    label="Special Notes for the Pro (Optional)"
                    placeholder="Provide parking instructions, gate codes, pet details, or specific problem focus areas..."
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="md"
                    onClick={() => setCurrentStep(1)}
                    icon={ArrowLeft}
                  >
                    Back to Schedule
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleNextStep}
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    Review Booking
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 3 && (
            <Card className="border-neutral-200/90 shadow-sm">
              <CardContent className="p-6 sm:p-8 space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-neutral-900">
                    Step 3: Review & Confirm Booking Details
                  </h2>
                  <p className="text-xs text-neutral-500 mt-1">
                    Please inspect your appointment details before proceeding to safe payment checkout.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200/80 flex items-start gap-4">
                    <ServiceSpotIllustration
                      serviceId={service.id}
                      category={service.category}
                      aspect="aspect-square"
                      className="w-16 h-16 shrink-0"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-neutral-900">{service.name}</h3>
                      <p className="text-xs text-neutral-500 mt-0.5">{service.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-neutral-200 bg-white space-y-1">
                      <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                        Schedule
                      </span>
                      <p className="text-sm font-bold text-neutral-800">{selectedDate}</p>
                      <p className="text-xs text-teal-700 font-semibold">{selectedSlot}</p>
                    </div>

                    <div className="p-4 rounded-xl border border-neutral-200 bg-white space-y-1">
                      <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                        Service Address
                      </span>
                      {currentSelectedAddress ? (
                        <>
                          <p className="text-sm font-bold text-neutral-800">
                            {currentSelectedAddress.label}: {currentSelectedAddress.line1}
                          </p>
                          <p className="text-xs text-neutral-500">
                            {currentSelectedAddress.city}, {currentSelectedAddress.state}{' '}
                            {currentSelectedAddress.postal_code}
                          </p>
                        </>
                      ) : (
                        <p className="text-xs text-rose-500">No address selected</p>
                      )}
                    </div>
                  </div>

                  {notes && (
                    <div className="p-4 rounded-xl border border-neutral-200 bg-white text-xs">
                      <span className="font-bold text-neutral-500 uppercase tracking-wider block mb-1">
                        Instructions / Notes:
                      </span>
                      <p className="text-neutral-700">{notes}</p>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="md"
                    onClick={() => setCurrentStep(2)}
                    icon={ArrowLeft}
                  >
                    Back to Address
                  </Button>

                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleCreateBooking}
                    isLoading={isSubmitting}
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          <PriceSummary
            service={service}
            scheduledDate={selectedDate}
            scheduledSlot={selectedSlot}
            address={currentSelectedAddress}
          />
        </div>
      </div>
    </div>
  );
}
