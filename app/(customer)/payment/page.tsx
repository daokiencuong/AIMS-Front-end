'use client';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/src/components/ui/tabs';
import { useCart } from '@/src/context/CartContext';
import { CreditCard, QrCode } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function PaymentMethod() {
  const router = useRouter();
  const { items, totalPrice } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('qr');

  // Calculate totals
  const totalWeight = items.reduce((sum, item) => sum + 300 * item.quantity, 0);
  const calculateShipping = () => {
    if (totalPrice >= 100000) {
      const baseShipping = Math.ceil(totalWeight / 500) * 15000;
      const discount = Math.min(baseShipping, 25000);
      return Math.max(0, baseShipping - discount);
    }
    return Math.ceil(totalWeight / 500) * 15000;
  };

  const shippingFee = calculateShipping();
  const vat = totalPrice * 0.1; // 10% VAT
  const finalTotal = totalPrice + vat + shippingFee;

  const handlePayment = () => {
    router.push('/success');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-6">
        <div className="text-gray-900 text-2xl">Payment Method</div>
        <div className="text-gray-500 mt-1">Choose your payment method</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Methods */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <Tabs
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="w-full"
            >
              <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0">
                <TabsTrigger
                  value="qr"
                  className="rounded-none border-b-2 data-[state=active]:border-[#3A7AFE] gap-2"
                >
                  <QrCode className="w-4 h-4" />
                  QR Code
                </TabsTrigger>
                <TabsTrigger
                  value="card"
                  className="rounded-none border-b-2 data-[state=active]:border-[#3A7AFE] gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  Credit Card
                </TabsTrigger>
              </TabsList>

              <TabsContent value="qr" className="p-8">
                <div className="flex flex-col items-center">
                  <div className="text-gray-900 mb-4">Scan QR Code to Pay</div>
                  <div className="w-64 h-64 bg-gray-100 rounded-lg border-2 border-gray-300 flex items-center justify-center mb-4">
                    <div className="text-center">
                      <QrCode className="w-32 h-32 mx-auto mb-2 text-gray-400" />
                      <div className="text-gray-500">QR Code Placeholder</div>
                    </div>
                  </div>
                  <div className="text-gray-600 text-center">
                    <p>Scan this QR code with your banking app</p>
                    <p className="mt-2">
                      Amount:{' '}
                      <span className="text-[#3A7AFE]">
                        {finalTotal.toLocaleString('vi-VN')} ₫
                      </span>
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="card" className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="cardHolder">Card Holder Name</Label>
                  <Input
                    id="cardHolder"
                    placeholder="Enter card holder name"
                    className="rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    className="rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      className="rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      type="password"
                      maxLength={3}
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Invoice Summary */}
        <div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm sticky top-24">
            <div className="text-gray-900 mb-4">Invoice Summary</div>
            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-gray-600"
                >
                  <span className="line-clamp-1">
                    {item.title} x{item.quantity}
                  </span>
                  <span className="shrink-0 ml-2">
                    {(item.price * item.quantity).toLocaleString('vi-VN')} ₫
                  </span>
                </div>
              ))}
            </div>
            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal (before VAT)</span>
                <span>{totalPrice.toLocaleString('vi-VN')} ₫</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>VAT (10%)</span>
                <span>{vat.toLocaleString('vi-VN')} ₫</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping Fee</span>
                <span>{shippingFee.toLocaleString('vi-VN')} ₫</span>
              </div>
            </div>
            <div className="flex justify-between mb-6">
              <span className="text-gray-900">Total Amount</span>
              <span className="text-[#3A7AFE] text-xl">
                {finalTotal.toLocaleString('vi-VN')} ₫
              </span>
            </div>
            <Button
              onClick={handlePayment}
              className="w-full rounded-lg bg-[#3A7AFE] hover:bg-[#2868ee] py-6"
            >
              Complete Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
