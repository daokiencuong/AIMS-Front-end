'use client';
import { Button } from '@/src/components/ui/button';
import { Checkbox } from '@/src/components/ui/checkbox';
import { ImageWithFallback } from '@/src/components/ui/ImageWithFallback';
import { Label } from '@/src/components/ui/label';
import { useCart } from '@/src/context/CartContext';
import { ShoppingCart } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const mockProducts = [
  {
    id: '1',
    title: 'The Great Gatsby',
    category: 'Book',
    price: 150000,
    stock: 25,
    image:
      'https://images.unsplash.com/photo-1723220217588-3fc2fb87b69a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjB2aW50YWdlfGVufDF8fHx8MTc2MzU2NzU4NXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '2',
    title: 'Great Expectations',
    category: 'Book',
    price: 130000,
    stock: 18,
    image:
      'https://images.unsplash.com/photo-1723220217588-3fc2fb87b69a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjB2aW50YWdlfGVufDF8fHx8MTc2MzU2NzU4NXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '3',
    title: 'The Greatest Showman',
    category: 'DVD',
    price: 180000,
    stock: 12,
    image:
      'https://images.unsplash.com/photo-1638416677779-d5cd099b23ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMGR2ZCUyMGZpbG18ZW58MXx8fHwxNzYzNTkzMjE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

const priceRanges = [
  { label: '< 100,000 ₫', min: 0, max: 100000 },
  { label: '100,000 - 200,000 ₫', min: 100000, max: 200000 },
  { label: '200,000 - 300,000 ₫', min: 200000, max: 300000 },
  { label: '> 300,000 ₫', min: 300000, max: Infinity },
];

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const { addToCart } = useCart();
  const route = useRouter();
  const [selectedRanges, setSelectedRanges] = useState<number[]>([]);

  const searchResults = mockProducts.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase()),
  );

  const filteredResults =
    selectedRanges.length > 0
      ? searchResults.filter((product) =>
          selectedRanges.some((index) => {
            const range = priceRanges[index];
            return product.price >= range.min && product.price < range.max;
          }),
        )
      : searchResults;

  const toggleRange = (index: number) => {
    setSelectedRanges((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex gap-8">
        {/* Sidebar Filter */}
        <div className="w-64 shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
            <div className="text-gray-900 mb-4">Filter by Price</div>
            <div className="space-y-3">
              {priceRanges.map((range, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox
                    id={`range-${index}`}
                    checked={selectedRanges.includes(index)}
                    onCheckedChange={() => toggleRange(index)}
                  />
                  <Label
                    htmlFor={`range-${index}`}
                    className="cursor-pointer text-gray-600"
                  >
                    {range.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Search Results */}
        <div className="flex-1">
          <div className="mb-6">
            <div className="text-gray-900 text-2xl">Search Results</div>
            <div className="text-gray-500 mt-1">
              Found {filteredResults.length} results for "{query}"
            </div>
          </div>

          {filteredResults.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <div className="text-gray-900 mb-2">No products found</div>
              <div className="text-gray-500">
                Try searching for something else
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredResults.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => route.push(`/customer/product/${product.id}`)}
                >
                  <div className="aspect-3/4 bg-gray-100">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-gray-500 mb-1">{product.category}</div>
                    <div className="text-gray-900 mb-2 line-clamp-2">
                      {product.title}
                    </div>
                    <div className="text-[#3A7AFE] mb-3">
                      {product.price.toLocaleString('vi-VN')} ₫
                    </div>
                    <Button
                      className="w-full rounded-lg bg-[#3A7AFE] hover:bg-[#2868ee] gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
