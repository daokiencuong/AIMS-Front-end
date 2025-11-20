'use client';
import { Button } from '@/src/components/ui/button';
import { ImageWithFallback } from '@/src/components/ui/ImageWithFallback';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { useCart } from '@/src/context/CartContext';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const productDetails: Record<string, any> = {
  '1': {
    id: '1',
    title: 'The Great Gatsby',
    category: 'Book',
    price: 150000,
    stock: 25,
    description:
      'A classic American novel by F. Scott Fitzgerald, set in the Jazz Age on Long Island.',
    image:
      'https://images.unsplash.com/photo-1723220217588-3fc2fb87b69a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjB2aW50YWdlfGVufDF8fHx8MTc2MzU2NzU4NXww&ixlib=rb-4.1.0&q=80&w=1080',
    details: {
      authors: 'F. Scott Fitzgerald',
      publisher: 'Scribner',
      publicationDate: 'April 10, 1925',
      pages: 180,
      language: 'English',
      genre: 'Classic Fiction',
      coverType: 'Paperback',
    },
  },
  '3': {
    id: '3',
    title: 'Abbey Road',
    category: 'CD',
    price: 200000,
    stock: 15,
    description:
      'The eleventh studio album by the English rock band the Beatles, released in 1969.',
    image:
      'https://images.unsplash.com/photo-1677799562106-0e3edc7dce45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFsYnVtJTIwdmlueWx8ZW58MXx8fHwxNzYzNTQxMzM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    details: {
      artists: 'The Beatles',
      recordLabel: 'Apple Records',
      genre: 'Rock',
      trackList: [
        { title: 'Come Together', length: '4:20' },
        { title: 'Something', length: '3:03' },
        { title: 'Here Comes the Sun', length: '3:05' },
      ],
    },
  },
  '5': {
    id: '5',
    title: 'The Godfather',
    category: 'DVD',
    price: 180000,
    stock: 20,
    description:
      'The Godfather is a 1972 American crime film directed by Francis Ford Coppola.',
    image:
      'https://images.unsplash.com/photo-1638416677779-d5cd099b23ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMGR2ZCUyMGZpbG18ZW58MXx8fHwxNzYzNTkzMjE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    details: {
      director: 'Francis Ford Coppola',
      studio: 'Paramount Pictures',
      runtime: 175,
      language: 'English',
      subtitles: 'English, Vietnamese',
      discType: 'DVD',
    },
  },
  '7': {
    id: '7',
    title: 'Daily News',
    category: 'Newspaper',
    price: 15000,
    stock: 50,
    description:
      'Your daily source for news, politics, business, and entertainment.',
    image:
      'https://images.unsplash.com/photo-1757716437132-ba6356390498?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXdzcGFwZXIlMjBtYWdhemluZXxlbnwxfHx8fDE3NjM1MjA4NzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    details: {
      editorInChief: 'John Smith',
      publisher: 'Daily News Group',
      publicationDate: 'November 19, 2024',
      issueNumber: '12345',
      frequency: 'Daily',
      issn: '1234-5678',
    },
  },
};

export default function ProductDetail({ data }: { data: string }) {
  const id = data;
  const route = useRouter();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = productDetails[id || '1'] || productDetails['1'];

  const handleAddToCart = () => {
    if (quantity > product.stock) {
      alert('Not enough stock available');
      return;
    }
    addToCart(product, quantity);
    route.push('/cart');
  };

  const renderDetails = () => {
    if (product.category === 'Book') {
      return (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-gray-500">Authors</div>
            <div className="text-gray-900">{product.details.authors}</div>
          </div>
          <div>
            <div className="text-gray-500">Publisher</div>
            <div className="text-gray-900">{product.details.publisher}</div>
          </div>
          <div>
            <div className="text-gray-500">Publication Date</div>
            <div className="text-gray-900">
              {product.details.publicationDate}
            </div>
          </div>
          <div>
            <div className="text-gray-500">Pages</div>
            <div className="text-gray-900">{product.details.pages}</div>
          </div>
          <div>
            <div className="text-gray-500">Language</div>
            <div className="text-gray-900">{product.details.language}</div>
          </div>
          <div>
            <div className="text-gray-500">Genre</div>
            <div className="text-gray-900">{product.details.genre}</div>
          </div>
        </div>
      );
    } else if (product.category === 'CD') {
      return (
        <>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <div className="text-gray-500">Artists</div>
              <div className="text-gray-900">{product.details.artists}</div>
            </div>
            <div>
              <div className="text-gray-500">Record Label</div>
              <div className="text-gray-900">{product.details.recordLabel}</div>
            </div>
            <div>
              <div className="text-gray-500">Genre</div>
              <div className="text-gray-900">{product.details.genre}</div>
            </div>
          </div>
          {product.details.trackList && (
            <div>
              <div className="text-gray-900 mb-2">Track List</div>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-[#F5F5F5]">
                    <tr>
                      <th className="px-4 py-2 text-left text-gray-600">#</th>
                      <th className="px-4 py-2 text-left text-gray-600">
                        Title
                      </th>
                      <th className="px-4 py-2 text-left text-gray-600">
                        Length
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {product.details.trackList.map(
                      (track: any, index: number) => (
                        <tr key={index}>
                          <td className="px-4 py-2 text-gray-600">
                            {index + 1}
                          </td>
                          <td className="px-4 py-2 text-gray-900">
                            {track.title}
                          </td>
                          <td className="px-4 py-2 text-gray-600">
                            {track.length}
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      );
    } else if (product.category === 'DVD') {
      return (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-gray-500">Director</div>
            <div className="text-gray-900">{product.details.director}</div>
          </div>
          <div>
            <div className="text-gray-500">Studio</div>
            <div className="text-gray-900">{product.details.studio}</div>
          </div>
          <div>
            <div className="text-gray-500">Runtime</div>
            <div className="text-gray-900">
              {product.details.runtime} minutes
            </div>
          </div>
          <div>
            <div className="text-gray-500">Language</div>
            <div className="text-gray-900">{product.details.language}</div>
          </div>
          <div className="col-span-2">
            <div className="text-gray-500">Subtitles</div>
            <div className="text-gray-900">{product.details.subtitles}</div>
          </div>
        </div>
      );
    } else if (product.category === 'Newspaper') {
      return (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-gray-500">Editor-in-Chief</div>
            <div className="text-gray-900">{product.details.editorInChief}</div>
          </div>
          <div>
            <div className="text-gray-500">Publisher</div>
            <div className="text-gray-900">{product.details.publisher}</div>
          </div>
          <div>
            <div className="text-gray-500">Publication Date</div>
            <div className="text-gray-900">
              {product.details.publicationDate}
            </div>
          </div>
          <div>
            <div className="text-gray-500">Issue Number</div>
            <div className="text-gray-900">{product.details.issueNumber}</div>
          </div>
          <div>
            <div className="text-gray-500">Frequency</div>
            <div className="text-gray-900">{product.details.frequency}</div>
          </div>
          <div>
            <div className="text-gray-500">ISSN</div>
            <div className="text-gray-900">{product.details.issn}</div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <div className="aspect-3/4 bg-gray-100 rounded-lg overflow-hidden">
            <ImageWithFallback
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="text-gray-500 mb-2">{product.category}</div>
            <div className="text-gray-900 text-3xl mb-4">{product.title}</div>
            <div className="text-[#3A7AFE] text-2xl mb-4">
              {product.price.toLocaleString('vi-VN')} ₫
            </div>
            <div className="text-gray-600">
              Stock:{' '}
              <span className="text-gray-900">{product.stock} available</span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="text-gray-900 mb-2">Description</div>
            <div className="text-gray-600">{product.description}</div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="text-gray-900 mb-4">Product Details</div>
            {renderDetails()}
          </div>

          <div className="border-t border-gray-200 pt-6 space-y-4">
            <div className="flex items-center gap-4">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-24 rounded-lg"
              />
            </div>
            <Button
              onClick={handleAddToCart}
              className="w-full rounded-lg bg-[#3A7AFE] hover:bg-[#2868ee] py-6 gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
