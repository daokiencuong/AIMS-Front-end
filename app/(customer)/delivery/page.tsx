'use client';
import { Button } from '@/src/components/button';
import { Input } from '@/src/components/input';
import { Label } from '@/src/components/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/select';
import { Textarea } from '@/src/components/textarea';
import { useCart } from '@/src/context/CartContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DeliveryInfo() {
  const router = useRouter();
  const { items, totalPrice } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    note: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calculate total weight
  const totalWeight = items.reduce((sum, item) => sum + 300 * item.quantity, 0); // Assuming 300g per item

  // Calculate shipping fee
  const calculateShipping = () => {
    if (totalPrice >= 100000) {
      // Free shipping for orders over 100k, max 25k discount
      const baseShipping = Math.ceil(totalWeight / 500) * 15000;
      const discount = Math.min(baseShipping, 25000);
      return Math.max(0, baseShipping - discount);
    }
    // Weight-based pricing
    return Math.ceil(totalWeight / 500) * 15000;
  };

  const shippingFee = calculateShipping();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone must be 10 digits';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!formData.city) {
      newErrors.city = 'City is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      router.push('/payment');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-6">
        <div className="text-gray-900 text-2xl">Delivery Information</div>
        <div className="text-gray-500 mt-1">Enter your shipping details</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Delivery Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={`rounded-lg ${
                    errors.name ? 'border-red-500' : ''
                  }`}
                />
                {errors.name && <p className="text-red-600">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className={`rounded-lg ${
                    errors.phone ? 'border-red-500' : ''
                  }`}
                />
                {errors.phone && <p className="text-red-600">{errors.phone}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Full Address *</Label>
              <Input
                id="address"
                placeholder="Street address, apartment, suite, etc."
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className={`rounded-lg ${
                  errors.address ? 'border-red-500' : ''
                }`}
              />
              {errors.address && (
                <p className="text-red-600">{errors.address}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Select
                value={formData.city}
                onValueChange={(value) =>
                  setFormData({ ...formData, city: value })
                }
              >
                <SelectTrigger
                  className={`rounded-lg ${
                    errors.city ? 'border-red-500' : ''
                  }`}
                >
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hanoi">Hanoi</SelectItem>
                  <SelectItem value="hcm">Ho Chi Minh City</SelectItem>
                  <SelectItem value="danang">Da Nang</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.city && <p className="text-red-600">{errors.city}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="note">Note (Optional)</Label>
              <Textarea
                id="note"
                placeholder="Special delivery instructions..."
                value={formData.note}
                onChange={(e) =>
                  setFormData({ ...formData, note: e.target.value })
                }
                className="rounded-lg min-h-24"
              />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm sticky top-24">
            <div className="text-gray-900 mb-4">Order Summary</div>
            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-gray-600"
                >
                  <span>
                    {item.title} x{item.quantity}
                  </span>
                  <span>
                    {(item.price * item.quantity).toLocaleString('vi-VN')} ₫
                  </span>
                </div>
              ))}
            </div>
            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{totalPrice.toLocaleString('vi-VN')} ₫</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping Fee</span>
                <span>{shippingFee.toLocaleString('vi-VN')} ₫</span>
              </div>
              {totalPrice >= 100000 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-2 text-green-700">
                  Free shipping applied!
                </div>
              )}
            </div>
            <div className="flex justify-between mb-6">
              <span className="text-gray-900">Total</span>
              <span className="text-gray-900 text-xl">
                {(totalPrice + shippingFee).toLocaleString('vi-VN')} ₫
              </span>
            </div>
            <Button
              onClick={handleContinue}
              className="w-full rounded-lg bg-[#3A7AFE] hover:bg-[#2868ee] py-6"
            >
              Continue to Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
