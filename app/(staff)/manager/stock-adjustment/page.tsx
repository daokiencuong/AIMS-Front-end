"use client";
import { useState } from 'react';
import { Edit } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/src/components/ui/dialog';
import { AlertDialogHeader } from '@/src/components/ui/alert-dialog';
import { Label } from '@/src/components/ui/label';
import { Input } from '@/src/components/ui/input';
import { Textarea } from '@/src/components/ui/textarea';

interface Product {
  id: string;
  title: string;
  currentStock: number;
}

const mockProducts: Product[] = [
  { id: '1', title: 'The Great Gatsby', currentStock: 25 },
  { id: '2', title: 'Abbey Road', currentStock: 15 },
  { id: '3', title: 'The Godfather', currentStock: 0 },
  { id: '4', title: 'Daily News', currentStock: 50 },
];

export default function StockAdjustment() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newStock, setNewStock] = useState('');
  const [reason, setReason] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleAdjust = (product: Product) => {
    setSelectedProduct(product);
    setNewStock(product.currentStock.toString());
    setReason('');
    setShowModal(true);
  };

  const handleSave = () => {
    if (!reason.trim()) {
      alert('Reason is required');
      return;
    }
    setShowModal(false);
  };

  return (
    <>
      <div className="space-y-6">
        <div>
          <div className="text-gray-900 text-2xl">Stock Adjustment</div>
          <div className="text-gray-500 mt-1">Manage product inventory levels</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F5F5F5] border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-gray-600">Product Title</th>
                  <th className="px-6 py-4 text-left text-gray-600">Current Stock</th>
                  <th className="px-6 py-4 text-left text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">{product.title}</td>
                    <td className="px-6 py-4 text-gray-900">{product.currentStock}</td>
                    <td className="px-6 py-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-lg gap-2"
                        onClick={() => handleAdjust(product)}
                      >
                        <Edit className="w-4 h-4" />
                        Adjust
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md rounded-xl">
          <DialogHeader>
            <DialogTitle>Adjust Stock</DialogTitle>
            <DialogDescription>
              Update stock quantity for {selectedProduct?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="newStock">New Stock Quantity</Label>
              <Input
                id="newStock"
                type="number"
                value={newStock}
                onChange={(e) => setNewStock(e.target.value)}
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Adjustment *</Label>
              <Textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Please provide a reason for this stock adjustment"
                className="rounded-lg min-h-24"
                required
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowModal(false)} className="rounded-lg">
              Cancel
            </Button>
            <Button onClick={handleSave} className="rounded-lg bg-[#3A7AFE] hover:bg-[#2868ee]">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
