import { useState, useEffect } from 'react';
import {
  User,
  MapPin,
  Plus,
  Trash2,
  Compass,
  Save,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { apiRequest } from '../../lib/apiClient';
import { PageHeader } from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Skeleton } from '../../components/ui/Skeleton';
import toast from 'react-hot-toast';

export function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Profile Form state
  const [profileData, setProfileData] = useState({
    full_name: user?.full_name || '',
    phone: user?.phone || '',
    email: user?.email || '',
  });
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // New Address Modal state
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [addressForm, setAddressForm] = useState({
    label: 'Home',
    line1: '',
    line2: '',
    city: 'Bengaluru',
    state: 'Karnataka',
    postal_code: '560103',
    country: 'India',
    is_default: false,
  });
  const [isSavingAddress, setIsSavingAddress] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    async function loadAddresses() {
      setIsLoading(true);
      try {
        const res = await apiRequest('/addresses');
        setAddresses(res?.data || []);
      } catch (err) {
        console.error('Failed to load addresses:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadAddresses();
  }, []);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSavingProfile(true);
    try {
      updateProfile({
        full_name: profileData.full_name,
        phone: profileData.phone,
      });
      toast.success('Profile updated successfully!');
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Browser geolocation is not available.');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const { latitude, longitude } = pos.coords;
        setAddressForm((prev) => ({
          ...prev,
          line1: `Detected Location (${latitude.toFixed(3)}, ${longitude.toFixed(3)})`,
          city: 'Bengaluru',
          state: 'Karnataka',
          postal_code: '560103',
        }));
        toast.success('Coordinates retrieved. Please review and edit the address fields.');
      },
      () => {
        setIsLocating(false);
        toast.error('Location permission was denied. Enter manually.');
      }
    );
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    if (!addressForm.line1 || !addressForm.city) {
      toast.error('Please enter street line 1 and city.');
      return;
    }

    setIsSavingAddress(true);
    try {
      const res = await apiRequest('/addresses', {
        method: 'POST',
        body: JSON.stringify(addressForm),
      });
      const created = res?.data;
      setAddresses((prev) => [...prev, created]);
      setIsAddressModalOpen(false);
      setAddressForm({
        label: 'Home',
        line1: '',
        line2: '',
        city: 'Bengaluru',
        state: 'Karnataka',
        postal_code: '560103',
        country: 'India',
        is_default: false,
      });
      toast.success('New address added!');
    } catch (err) {
      toast.error(err.message || 'Error saving address');
    } finally {
      setIsSavingAddress(false);
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      await apiRequest(`/addresses/${id}`, { method: 'DELETE' });
      setAddresses((prev) => prev.filter((a) => a.id !== id));
      toast.success('Address removed.');
    } catch {
      toast.error('Could not remove address');
    }
  };

  const handleSetDefaultAddress = async (id) => {
    try {
      await apiRequest(`/addresses/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ is_default: true }),
      });
      setAddresses((prev) =>
        prev.map((a) => ({
          ...a,
          is_default: a.id === id,
        }))
      );
      toast.success('Default address updated.');
    } catch {
      toast.error('Could not update default address');
    }
  };

  return (
    <div className="container-custom py-8 sm:py-12 space-y-8">
      <PageHeader
        badge={
          <Badge variant="primary" size="sm">
            Account Center
          </Badge>
        }
        title="Personal Profile & Address Book"
        description="Manage your contact details and default destination addresses for instant one-click booking."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Personal Information */}
        <div className="space-y-6">
          <Card className="border-[#DDE3DA] shadow-sm">
            <CardHeader className="pb-4 border-b border-[#DDE3DA]/60">
              <CardTitle className="text-base flex items-center gap-2">
                <User className="w-4 h-4 text-[#173D32]" />
                Personal Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <Input
                  label="Full Name"
                  value={profileData.full_name}
                  onChange={(e) => setProfileData({ ...profileData, full_name: e.target.value })}
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={profileData.email}
                  disabled
                  helperText="Email is linked to your ServeEase account identity."
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="w-full mt-2"
                  isLoading={isSavingProfile}
                  icon={Save}
                >
                  Save Profile Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right 2 Columns: Saved Addresses */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-[#DDE3DA] shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-[#DDE3DA]/60">
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#173D32]" />
                Saved Service Locations
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                icon={Plus}
                onClick={() => setIsAddressModalOpen(true)}
              >
                Add Address
              </Button>
            </CardHeader>

            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-24 rounded-xl" />
                  <Skeleton className="h-24 rounded-xl" />
                </div>
              ) : addresses.length === 0 ? (
                <div className="text-center py-8 text-xs text-neutral-500">
                  <p>No saved addresses in your account yet.</p>
                  <Button
                    variant="primary"
                    size="sm"
                    className="mt-3"
                    onClick={() => setIsAddressModalOpen(true)}
                  >
                    Add Your First Address
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="p-4 rounded-xl border border-[#DDE3DA] bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-neutral-900">{addr.label}</span>
                          {addr.is_default && (
                            <Badge variant="forest" size="sm">
                              Default
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-[#66716A]">{addr.line1}</p>
                        {addr.line2 && <p className="text-xs text-[#66716A]">{addr.line2}</p>}
                        <p className="text-[11px] text-[#66716A]">
                          {addr.city}, {addr.state} {addr.postal_code} • {addr.country}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {!addr.is_default && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs text-[#66716A]"
                            onClick={() => handleSetDefaultAddress(addr.id)}
                          >
                            Set Default
                          </Button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleDeleteAddress(addr.id)}
                          className="p-2 text-neutral-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                          title="Delete address"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Address Modal */}
      <Modal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        title="Add New Service Address"
        description="Save a frequently serviced residence, office, or apartment."
      >
        <form onSubmit={handleSaveAddress} className="space-y-4 pt-2">
          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              icon={Compass}
              isLoading={isLocating}
              onClick={handleUseCurrentLocation}
            >
              Use My Current Location
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Address Label"
              placeholder="e.g. Home, Downtown Apartment"
              value={addressForm.label}
              onChange={(e) => setAddressForm({ ...addressForm, label: e.target.value })}
              required
            />
            <Input
              label="Street Line 1"
              placeholder="123 Maple Street"
              value={addressForm.line1}
              onChange={(e) => setAddressForm({ ...addressForm, line1: e.target.value })}
              required
            />
            <Input
              label="Line 2 / Unit"
              placeholder="Apt 2B (Optional)"
              value={addressForm.line2}
              onChange={(e) => setAddressForm({ ...addressForm, line2: e.target.value })}
            />
            <Input
              label="City"
              placeholder="Bengaluru"
              value={addressForm.city}
              onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
              required
            />
            <Input
              label="State"
              placeholder="Karnataka"
              value={addressForm.state}
              onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
              required
            />
            <Input
              label="PIN Code"
              placeholder="560103"
              value={addressForm.postal_code}
              onChange={(e) => setAddressForm({ ...addressForm, postal_code: e.target.value })}
              required
            />
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-neutral-700 cursor-pointer">
              <input
                type="checkbox"
                checked={addressForm.is_default}
                onChange={(e) => setAddressForm({ ...addressForm, is_default: e.target.checked })}
                className="rounded border-[#DDE3DA] text-[#173D32] focus:ring-[#173D32] accent-[#173D32]"
              />
              <span>Set as my default booking address</span>
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-[#DDE3DA]/60">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsAddressModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              isLoading={isSavingAddress}
            >
              Save Address
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
