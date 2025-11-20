"use client";
import DeleteProductModal from '@/src/components/DeleteProductModal';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface Product {
  id: string;
  barcode: string;
  title: string;
  category: string;
  stock: number;
  price: number;
  status: 'Active' | 'Deactivated';
}

const mockProducts: Product[] = [
  {
    id: '1',
    barcode: 'BK001',
    title: 'The Great Gatsby',
    category: 'Book',
    stock: 25,
    price: 150000,
    status: 'Active',
  },
  {
    id: '2',
    barcode: 'CD002',
    title: 'Abbey Road',
    category: 'CD',
    stock: 15,
    price: 200000,
    status: 'Active',
  },
  {
    id: '3',
    barcode: 'DVD003',
    title: 'The Godfather',
    category: 'DVD',
    stock: 0,
    price: 180000,
    status: 'Deactivated',
  },
  {
    id: '4',
    barcode: 'NP004',
    title: 'Daily News',
    category: 'Newspaper',
    stock: 50,
    price: 15000,
    status: 'Active',
  },
  {
    id: '5',
    barcode: 'BK005',
    title: '1984',
    category: 'Book',
    stock: 30,
    price: 120000,
    status: 'Active',
  },
];

export default function ProductList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === 'all' || product.category === categoryFilter;
    const matchesStatus =
      statusFilter === 'all' || product.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleDelete = (product: Product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-gray-900 text-2xl">Product Management</div>
            <div className="text-gray-500 mt-1">
              Manage your product inventory
            </div>
          </div>
          <Link href="/manager/products/add">
            <Button className="rounded-lg bg-[#3A7AFE] hover:bg-[#2868ee] gap-2">
              <Plus className="w-5 h-5" />
              Add Product
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Search by product name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-lg"
            />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="rounded-lg">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Book">Book</SelectItem>
                <SelectItem value="CD">CD</SelectItem>
                <SelectItem value="DVD">DVD</SelectItem>
                <SelectItem value="Newspaper">Newspaper</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="rounded-lg">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Deactivated">Deactivated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F5F5F5] border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-gray-600">Barcode</th>
                  <th className="px-6 py-4 text-left text-gray-600">Title</th>
                  <th className="px-6 py-4 text-left text-gray-600">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-gray-600">Stock</th>
                  <th className="px-6 py-4 text-left text-gray-600">Price</th>
                  <th className="px-6 py-4 text-left text-gray-600">Status</th>
                  <th className="px-6 py-4 text-left text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">
                      {product.barcode}
                    </td>
                    <td className="px-6 py-4 text-gray-900">{product.title}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 text-gray-900">{product.stock}</td>
                    <td className="px-6 py-4 text-gray-900">
                      {product.price.toLocaleString('vi-VN')} ₫
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full ${
                          product.status === 'Active'
                            ? 'bg-green-50 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link href={`/manager/products/edit/${product.id}`}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-lg"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link href={`/manager/products/edit/${product.id}`}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-lg"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-lg text-red-600 hover:text-red-700"
                          onClick={() => handleDelete(product)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-gray-600">
              Showing 1 to {filteredProducts.length} of {mockProducts.length}{' '}
              products
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

      {productToDelete && (
        <DeleteProductModal
          open={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          product={productToDelete}
        />
      )}
    </>
  );
}
