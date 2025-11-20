'use client';
import { Button } from '@/src/components/ui/button';
import { Checkbox } from '@/src/components/ui/checkbox';
import { ImageWithFallback } from '@/src/components/ui/ImageWithFallback';
import { Label } from '@/src/components/ui/label';
import { useCart } from '@/src/context/CartContext';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
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
    title: '1984',
    category: 'Book',
    price: 120000,
    stock: 30,
    image:
      'https://images.unsplash.com/photo-1723220217588-3fc2fb87b69a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjB2aW50YWdlfGVufDF8fHx8MTc2MzU2NzU4NXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '3',
    title: 'Abbey Road',
    category: 'CD',
    price: 200000,
    stock: 15,
    image:
      'https://images.unsplash.com/photo-1677799562106-0e3edc7dce45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFsYnVtJTIwdmlueWx8ZW58MXx8fHwxNzYzNTQxMzM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '4',
    title: 'Dark Side of the Moon',
    category: 'CD',
    price: 220000,
    stock: 12,
    image:
      'https://images.unsplash.com/photo-1677799562106-0e3edc7dce45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFsYnVtJTIwdmlueWx8ZW58MXx8fHwxNzYzNTQxMzM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '5',
    title: 'The Godfather',
    category: 'DVD',
    price: 180000,
    stock: 20,
    image:
      'https://images.unsplash.com/photo-1638416677779-d5cd099b23ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMGR2ZCUyMGZpbG18ZW58MXx8fHwxNzYzNTkzMjE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '6',
    title: 'Pulp Fiction',
    category: 'DVD',
    price: 190000,
    stock: 18,
    image:
      'https://images.unsplash.com/photo-1638416677779-d5cd099b23ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMGR2ZCUyMGZpbG18ZW58MXx8fHwxNzYzNTkzMjE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '7',
    title: 'Daily News',
    category: 'Newspaper',
    price: 15000,
    stock: 50,
    image:
      'https://images.unsplash.com/photo-1757716437132-ba6356390498?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXdzcGFwZXIlMjBtYWdhemluZXxlbnwxfHx8fDE3NjM1MjA4NzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '8',
    title: 'Tech Weekly',
    category: 'Newspaper',
    price: 20000,
    stock: 40,
    image:
      'https://images.unsplash.com/photo-1757716437132-ba6356390498?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXdzcGFwZXIlMjBtYWdhemluZXxlbnwxfHx8fDE3NjM1MjA4NzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '9',
    title: 'To Kill a Mockingbird',
    category: 'Book',
    price: 140000,
    stock: 22,
    image:
      'https://images.unsplash.com/photo-1723220217588-3fc2fb87b69a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjB2aW50YWdlfGVufDF8fHx8MTc2MzU2NzU4NXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '10',
    title: 'Led Zeppelin IV',
    category: 'CD',
    price: 210000,
    stock: 10,
    image:
      'https://images.unsplash.com/photo-1677799562106-0e3edc7dce45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFsYnVtJTIwdmlueWx8ZW58MXx8fHwxNzYzNTQxMzM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '11',
    title: 'The Shawshank Redemption',
    category: 'DVD',
    price: 195000,
    stock: 16,
    image:
      'https://images.unsplash.com/photo-1638416677779-d5cd099b23ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMGR2ZCUyMGZpbG18ZW58MXx8fHwxNzYzNTkzMjE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '12',
    title: 'Business Today',
    category: 'Newspaper',
    price: 25000,
    stock: 35,
    image:
      'https://images.unsplash.com/photo-1757716437132-ba6356390498?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXdzcGFwZXIlMjBtYWdhemluZXxlbnwxfHx8fDE3NjM1MjA4NzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '13',
    title: 'Pride and Prejudice',
    category: 'Book',
    price: 135000,
    stock: 28,
    image:
      'https://images.unsplash.com/photo-1723220217588-3fc2fb87b69a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjB2aW50YWdlfGVufDF8fHx8MTc2MzU2NzU4NXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '14',
    title: 'Thriller',
    category: 'CD',
    price: 250000,
    stock: 8,
    image:
      'https://images.unsplash.com/photo-1677799562106-0e3edc7dce45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFsYnVtJTIwdmlueWx8ZW58MXx8fHwxNzYzNTQxMzM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '15',
    title: 'Inception',
    category: 'DVD',
    price: 200000,
    stock: 14,
    image:
      'https://images.unsplash.com/photo-1638416677779-d5cd099b23ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMGR2ZCUyMGZpbG18ZW58MXx8fHwxNzYzNTkzMjE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '16',
    title: 'Fashion Magazine',
    category: 'Newspaper',
    price: 30000,
    stock: 45,
    image:
      'https://images.unsplash.com/photo-1757716437132-ba6356390498?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXdzcGFwZXIlMjBtYWdhemluZXxlbnwxfHx8fDE3NjM1MjA4NzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '17',
    title: 'The Catcher in the Rye',
    category: 'Book',
    price: 145000,
    stock: 20,
    image:
      'https://images.unsplash.com/photo-1723220217588-3fc2fb87b69a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjB2aW50YWdlfGVufDF8fHx8MTc2MzU2NzU4NXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '18',
    title: 'Rumours',
    category: 'CD',
    price: 230000,
    stock: 11,
    image:
      'https://images.unsplash.com/photo-1677799562106-0e3edc7dce45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFsYnVtJTIwdmlueWx8ZW58MXx8fHwxNzYzNTQxMzM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '19',
    title: 'The Dark Knight',
    category: 'DVD',
    price: 205000,
    stock: 13,
    image:
      'https://images.unsplash.com/photo-1638416677779-d5cd099b23ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMGR2ZCUyMGZpbG18ZW58MXx8fHwxNzYzNTkzMjE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '20',
    title: 'Sports Monthly',
    category: 'Newspaper',
    price: 22000,
    stock: 38,
    image:
      'https://images.unsplash.com/photo-1757716437132-ba6356390498?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXdzcGFwZXIlMjBtYWdhemluZXxlbnwxfHx8fDE3NjM1MjA4NzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

const priceRanges = [
  { label: '< 100,000 ₫', min: 0, max: 100000 },
  { label: '100,000 - 200,000 ₫', min: 100000, max: 200000 },
  { label: '200,000 - 300,000 ₫', min: 200000, max: 300000 },
  { label: '> 300,000 ₫', min: 300000, max: Infinity },
];

export default function CustomerHome() {
  const { addToCart } = useCart();
  const router = useRouter();
  const [selectedRanges, setSelectedRanges] = useState<number[]>([]);

  const filteredProducts =
    selectedRanges.length > 0
      ? mockProducts.filter((product) =>
          selectedRanges.some((index) => {
            const range = priceRanges[index];
            return product.price >= range.min && product.price < range.max;
          }),
        )
      : mockProducts;

  const handleAddToCart = (product: (typeof mockProducts)[0]) => {
    addToCart(product);
  };

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

        {/* Products Grid */}
        <div className="flex-1">
          <div className="mb-6">
            <div className="text-gray-900 text-2xl">20 Random Products</div>
            <div className="text-gray-500 mt-1">
              Discover our media collection
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.slice(0, 20).map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => router.push(`/product/${product.id}`)}
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
                      handleAddToCart(product);
                    }}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
