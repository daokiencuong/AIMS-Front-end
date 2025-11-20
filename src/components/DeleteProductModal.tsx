import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { AlertTriangle } from 'lucide-react';

interface Product {
  id: string;
  title: string;
  stock: number;
}

interface DeleteProductModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
}

export default function DeleteProductModal({ open, onClose, product }: DeleteProductModalProps) {
  const canDelete = product.stock === 0;

  const handleConfirm = () => {
    // Handle delete/deactivate logic here
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            {canDelete ? 'Delete Product' : 'Cannot Delete Product'}
          </DialogTitle>
          <DialogDescription className="space-y-3 pt-2">
            {canDelete ? (
              <>
                <p>Are you sure you want to delete this product?</p>
                <p className="text-gray-900">{product.title}</p>
                <p className="text-gray-500">This action cannot be undone.</p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
                  <p className="text-yellow-800">
                    ⚠️ Deletion limits: Maximum 10 products per deletion, and less than 20 products per day.
                  </p>
                </div>
              </>
            ) : (
              <>
                <p>This product cannot be deleted because it has stock remaining.</p>
                <p className="text-gray-900">{product.title}</p>
                <p className="text-gray-600">Current stock: {product.stock}</p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                  <p className="text-blue-800">
                    ℹ️ Stock {'>'} 0 — product will be deactivated instead of deleted.
                  </p>
                </div>
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} className="rounded-lg">
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className={`rounded-lg ${canDelete ? 'bg-red-600 hover:bg-red-700' : 'bg-orange-600 hover:bg-orange-700'}`}
          >
            {canDelete ? 'Delete' : 'Deactivate'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}