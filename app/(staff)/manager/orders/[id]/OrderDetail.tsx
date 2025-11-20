"use client";
import { Button } from '@/src/components/ui/button';
import { Label } from '@/src/components/ui/label';
import { Textarea } from '@/src/components/ui/textarea';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function OrderDetail({ orderID }: { orderID: string }) {
  const id = orderID;
  const router = useRouter();
  const [rejectReason, setRejectReason] = useState('');

  const orderData = {
    id: id || 'ORD1001',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '0123456789',
    address: '123 Main Street, Hanoi',
    orderDate: '15/11/2024',
    items: [
      {
        id: '1',
        title: 'The Great Gatsby',
        category: 'Book',
        quantity: 2,
        price: 150000,
      },
      {
        id: '2',
        title: 'Abbey Road',
        category: 'CD',
        quantity: 1,
        price: 200000,
      },
    ],
  };

  const subtotal = orderData.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const vat = subtotal * 0.1;
  const shippingFee = 30000;
  const total = subtotal + vat + shippingFee;

  const handleApprove = () => {
    alert('Order approved successfully');
    router.push('/manager/orders');
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }
    alert('Order rejected');
    router.push('/manager/orders');
  };

  return (
    <>
      <div className="space-y-6 max-w-5xl">
        <div>
          <div className="text-gray-900 text-2xl">Order Detail</div>
          <div className="text-gray-500 mt-1">
            Review and approve order #{orderData.id}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="text-gray-900 mb-4">Customer Information</div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-gray-500">Name</div>
                  <div className="text-gray-900">{orderData.customerName}</div>
                </div>
                <div>
                  <div className="text-gray-500">Email</div>
                  <div className="text-gray-900">{orderData.customerEmail}</div>
                </div>
                <div>
                  <div className="text-gray-500">Phone</div>
                  <div className="text-gray-900">{orderData.customerPhone}</div>
                </div>
                <div>
                  <div className="text-gray-500">Order Date</div>
                  <div className="text-gray-900">{orderData.orderDate}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-gray-500">Delivery Address</div>
                  <div className="text-gray-900">{orderData.address}</div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="text-gray-900">Order Items</div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F5F5F5] border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-gray-600">
                        Product
                      </th>
                      <th className="px-6 py-4 text-left text-gray-600">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-gray-600">
                        Quantity
                      </th>
                      <th className="px-6 py-4 text-left text-gray-600">
                        Price
                      </th>
                      <th className="px-6 py-4 text-left text-gray-600">
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orderData.items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 text-gray-900">
                          {item.title}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {item.category}
                        </td>
                        <td className="px-6 py-4 text-gray-900">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 text-gray-900">
                          {item.price.toLocaleString('vi-VN')} ₫
                        </td>
                        <td className="px-6 py-4 text-gray-900">
                          {(item.price * item.quantity).toLocaleString('vi-VN')}{' '}
                          ₫
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Reject Reason */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="text-gray-900 mb-4">
                Reason for Rejection (if applicable)
              </div>
              <div className="space-y-2">
                <Label htmlFor="rejectReason">Rejection Reason</Label>
                <Textarea
                  id="rejectReason"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Enter reason for rejecting this order..."
                  className="rounded-lg min-h-32"
                />
              </div>
            </div>
          </div>

          {/* Order Summary & Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm sticky top-24">
              <div className="text-gray-900 mb-4">Order Summary</div>
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal (before VAT)</span>
                  <span>{subtotal.toLocaleString('vi-VN')} ₫</span>
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
                  {total.toLocaleString('vi-VN')} ₫
                </span>
              </div>
              <div className="space-y-3">
                <Button
                  onClick={handleApprove}
                  className="w-full rounded-lg bg-green-600 hover:bg-green-700 gap-2 py-6"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Approve Order
                </Button>
                <Button
                  onClick={handleReject}
                  variant="outline"
                  className="w-full rounded-lg border-red-300 text-red-600 hover:bg-red-50 gap-2 py-6"
                >
                  <XCircle className="w-5 h-5" />
                  Reject Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
