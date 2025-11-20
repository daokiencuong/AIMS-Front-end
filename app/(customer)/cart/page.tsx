'use client';
import { Button } from '@/src/components/button';
import { ImageWithFallback } from '@/src/components/ImageWithFallback';
import { Input } from '@/src/components/input';
import { useCart } from '@/src/context/CartContext';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Cart() {
  const route = useRouter();
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  const handleUpdateCart = () => {
    alert('Cart updated successfully');
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      alert('Your cart is empty');
      return;
    }
    route.push('/delivery');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-6">
        <div className="text-gray-900 text-2xl">Shopping Cart</div>
        <div className="text-gray-500 mt-1">
          Review your items before checkout
        </div>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="text-gray-900 mb-2">Your cart is empty</div>
          <div className="text-gray-500 mb-6">
            Add some products to get started
          </div>
          <Button
            onClick={() => route.push('/')}
            className="rounded-lg bg-[#3A7AFE] hover:bg-[#2868ee]"
          >
            Continue Shopping
          </Button>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F5F5F5] border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-600">
                      Product
                    </th>
                    <th className="px-6 py-4 text-left text-gray-600">Price</th>
                    <th className="px-6 py-4 text-left text-gray-600">
                      Quantity
                    </th>
                    <th className="px-6 py-4 text-left text-gray-600">
                      Subtotal
                    </th>
                    <th className="px-6 py-4 text-left text-gray-600">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {items.map((item) => {
                    const hasStockIssue = item.quantity > item.stock;
                    return (
                      <tr
                        key={item.id}
                        className={hasStockIssue ? 'bg-red-50' : ''}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-20 bg-gray-100 rounded overflow-hidden shrink-0">
                              <ImageWithFallback
                                src={item.image || ''}
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="text-gray-900">{item.title}</div>
                              <div className="text-gray-500">
                                {item.category}
                              </div>
                              {hasStockIssue && (
                                <div className="text-red-600 mt-1">
                                  Only {item.stock} available
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-900">
                          {item.price.toLocaleString('vi-VN')} ₫
                        </td>
                        <td className="px-6 py-4">
                          <Input
                            type="number"
                            min="1"
                            max={item.stock}
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(
                                item.id,
                                parseInt(e.target.value) || 1,
                              )
                            }
                            className="w-20 rounded-lg"
                          />
                        </td>
                        <td className="px-6 py-4 text-gray-900">
                          {(item.price * item.quantity).toLocaleString('vi-VN')}{' '}
                          ₫
                        </td>
                        <td className="px-6 py-4">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                            className="rounded-lg text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm max-w-md ml-auto">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <div className="text-gray-600">Subtotal (before VAT)</div>
                <div className="text-gray-900">
                  {totalPrice.toLocaleString('vi-VN')} ₫
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={handleUpdateCart}
                className="flex-1 rounded-lg"
              >
                Update Cart
              </Button>
              <Button
                onClick={handleCheckout}
                className="flex-1 rounded-lg bg-[#3A7AFE] hover:bg-[#2868ee]"
              >
                Checkout
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
