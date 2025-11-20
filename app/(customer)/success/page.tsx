
"use client";
import { useCart } from '@/src/context/CartContext';
import { CheckCircle2 } from 'lucide-react';

export default function PaymentSuccess() {
  const { items, totalPrice, clearCart } = useCart();

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
  const vat = totalPrice * 0.1;
  const finalTotal = totalPrice + vat + shippingFee;

  const transactionId = `TXN${Date.now()}`;
  const orderDate = new Date().toLocaleString('vi-VN');

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <CheckCircle2 className="w-20 h-20 text-green-600 mx-auto mb-4" />
          <div className="text-gray-900 text-2xl mb-2">Payment Successful!</div>
          <div className="text-gray-500">
            Your order has been placed successfully
          </div>
        </div>

        {/* Order Details */}
        <div className="space-y-6">
          <div className="border-t border-gray-200 pt-6">
            <div className="text-gray-900 mb-4">Order Information</div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-gray-500">Transaction ID</div>
                <div className="text-gray-900">{transactionId}</div>
              </div>
              <div>
                <div className="text-gray-500">Order Date</div>
                <div className="text-gray-900">{orderDate}</div>
              </div>
              <div>
                <div className="text-gray-500">Customer Name</div>
                <div className="text-gray-900">John Doe</div>
              </div>
              <div>
                <div className="text-gray-500">Phone</div>
                <div className="text-gray-900">0123456789</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="text-gray-900 mb-4">Items Ordered</div>
            <div className="space-y-3">
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
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="space-y-3">
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
              <div className="flex justify-between border-t border-gray-200 pt-3">
                <span className="text-gray-900">Total Amount</span>
                <span className="text-[#3A7AFE] text-xl">
                  {finalTotal.toLocaleString('vi-VN')} ₫
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
