import { Button } from '@/src/components/ui/button';
import { Eye } from 'lucide-react';
import Link from 'next/link';

interface Order {
  id: string;
  customerId: string;
  customerName: string;
  totalAmount: number;
  orderDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

const mockOrders: Order[] = Array.from({ length: 30 }, (_, i) => ({
  id: `ORD${1000 + i}`,
  customerId: `CUST${100 + i}`,
  customerName: `Customer ${i + 1}`,
  totalAmount: Math.floor(Math.random() * 500000) + 100000,
  orderDate: new Date(
    2024,
    10,
    Math.floor(Math.random() * 19) + 1,
  ).toLocaleDateString('vi-VN'),
  status: 'Pending',
}));

export default function PendingOrders() {
  return (
    <>
      <div className="space-y-6">
        <div>
          <div className="text-gray-900 text-2xl">Pending Orders</div>
          <div className="text-gray-500 mt-1">
            Review and approve customer orders
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F5F5F5] border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-gray-600">
                    Order ID
                  </th>
                  <th className="px-6 py-4 text-left text-gray-600">
                    Customer Name
                  </th>
                  <th className="px-6 py-4 text-left text-gray-600">
                    Total Amount
                  </th>
                  <th className="px-6 py-4 text-left text-gray-600">
                    Order Date
                  </th>
                  <th className="px-6 py-4 text-left text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 text-gray-900">
                      {order.customerName}
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      {order.totalAmount.toLocaleString('vi-VN')} ₫
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {order.orderDate}
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/manager/orders/${order.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-lg gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-gray-600">
              Showing 30 pending orders per page
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="rounded-lg" disabled>
                Previous
              </Button>
              <Button
                variant="outline"
                className="rounded-lg bg-[#3A7AFE] text-white border-[#3A7AFE]"
              >
                1
              </Button>
              <Button variant="outline" className="rounded-lg">
                2
              </Button>
              <Button variant="outline" className="rounded-lg">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
