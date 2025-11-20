'use client';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/src/components/ui/tabs';
import { Textarea } from '@/src/components/ui/textarea';
import { Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const editHistory = [
  { date: '2024-11-15 10:30', user: 'Admin User', action: 'Updated price' },
  {
    date: '2024-11-10 14:20',
    user: 'Product Manager',
    action: 'Updated stock',
  },
  { date: '2024-11-05 09:15', user: 'Admin User', action: 'Created product' },
];

export default function EditProduct({ productID }: { productID: string }) {
  const router = useRouter();
  const id = productID;
  const [currentPrice, setCurrentPrice] = useState('150000');

  return (
    <>
      <div className="flex gap-6">
        {/* Main Form */}
        <div className="flex-1 space-y-6">
          <div>
            <div className="text-gray-900 text-2xl">Edit Product</div>
            <div className="text-gray-500 mt-1">Update product information</div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0">
                <TabsTrigger
                  value="general"
                  className="rounded-none border-b-2 data-[state=active]:border-[#3A7AFE]"
                >
                  General Info
                </TabsTrigger>
                <TabsTrigger
                  value="details"
                  className="rounded-none border-b-2 data-[state=active]:border-[#3A7AFE]"
                >
                  Product Details
                </TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      defaultValue="The Great Gatsby"
                      className="rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="barcode">Barcode</Label>
                    <Input
                      id="barcode"
                      defaultValue="BK001"
                      className="rounded-lg"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    defaultValue="A classic American novel by F. Scott Fitzgerald"
                    className="rounded-lg min-h-32"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="originalValue">Original Value (₫)</Label>
                    <Input
                      id="originalValue"
                      type="number"
                      defaultValue="120000"
                      className="rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentPrice">Current Price (₫)</Label>
                    <Input
                      id="currentPrice"
                      type="number"
                      value={currentPrice}
                      onChange={(e) => setCurrentPrice(e.target.value)}
                      className="rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      defaultValue="20"
                      className="rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="width">Width (cm)</Label>
                    <Input
                      id="width"
                      type="number"
                      defaultValue="15"
                      className="rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="length">Length (cm)</Label>
                    <Input
                      id="length"
                      type="number"
                      defaultValue="2"
                      className="rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (g)</Label>
                    <Input
                      id="weight"
                      type="number"
                      defaultValue="300"
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="details" className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="authors">Authors</Label>
                    <Input
                      id="authors"
                      defaultValue="F. Scott Fitzgerald"
                      className="rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="publisher">Publisher</Label>
                    <Input
                      id="publisher"
                      defaultValue="Scribner"
                      className="rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="publicationDate">Publication Date</Label>
                    <Input
                      id="publicationDate"
                      type="date"
                      defaultValue="1925-04-10"
                      className="rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pages">Number of Pages</Label>
                    <Input
                      id="pages"
                      type="number"
                      defaultValue="180"
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() => router.push('/manager/products')}
              className="rounded-lg px-8 py-6"
            >
              Cancel
            </Button>
            <Button
              onClick={() => router.push('/manager/products')}
              className="rounded-lg bg-[#3A7AFE] hover:bg-[#2868ee] px-8 py-6"
            >
              Save Changes
            </Button>
          </div>
        </div>

        {/* Edit History Sidebar */}
        <div className="w-80">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-gray-600" />
              <span className="text-gray-900">Edit History</span>
            </div>
            <div className="space-y-4">
              {editHistory.map((entry, index) => (
                <div
                  key={index}
                  className="border-l-2 border-[#3A7AFE] pl-4 pb-4"
                >
                  <div className="text-gray-600">{entry.date}</div>
                  <div className="text-gray-900">{entry.action}</div>
                  <div className="text-gray-500">by {entry.user}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
