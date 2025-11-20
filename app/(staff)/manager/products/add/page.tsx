"use client";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { Textarea } from "@/src/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddProduct() {
  const router = useRouter();
  const [category, setCategory] = useState('');
  const [originalValue, setOriginalValue] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');
  const [priceError, setPriceError] = useState('');

  const validatePrice = (original: string, current: string) => {
    const origVal = parseFloat(original);
    const currVal = parseFloat(current);

    if (!origVal || !currVal) {
      setPriceError('');
      return;
    }

    const minPrice = origVal * 0.3;
    const maxPrice = origVal * 1.5;

    if (currVal < minPrice || currVal > maxPrice) {
      setPriceError(`Price must be between 30% and 150% of original value (${minPrice.toLocaleString()} - ${maxPrice.toLocaleString()} ₫)`);
    } else {
      setPriceError('');
    }
  };

  const handleOriginalValueChange = (value: string) => {
    setOriginalValue(value);
    validatePrice(value, currentPrice);
  };

  const handleCurrentPriceChange = (value: string) => {
    setCurrentPrice(value);
    validatePrice(originalValue, value);
  };

  const handleSave = () => {
    if (priceError) {
      return;
    }
    router.push('/manager/products');
  };

  return (
    <>
      <div className="space-y-6 max-w-5xl">
        {/* Header */}
        <div>
          <div className="text-gray-900 text-2xl">Add New Product</div>
          <div className="text-gray-500 mt-1">Create a new product in the inventory</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0">
              <TabsTrigger value="general" className="rounded-none border-b-2 data-[state=active]:border-[#3A7AFE]">
                General Info
              </TabsTrigger>
              <TabsTrigger value="category" className="rounded-none border-b-2 data-[state=active]:border-[#3A7AFE]">
                Category
              </TabsTrigger>
              <TabsTrigger value="details" className="rounded-none border-b-2 data-[state=active]:border-[#3A7AFE]" disabled={!category}>
                Product Details
              </TabsTrigger>
            </TabsList>

            {/* General Info Tab */}
            <TabsContent value="general" className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Enter product title" className="rounded-lg" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="barcode">Barcode</Label>
                  <Input id="barcode" placeholder="Enter barcode" className="rounded-lg" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter product description"
                  className="rounded-lg min-h-32"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="originalValue">Original Value (₫)</Label>
                  <Input
                    id="originalValue"
                    type="number"
                    placeholder="0"
                    value={originalValue}
                    onChange={(e) => handleOriginalValueChange(e.target.value)}
                    className="rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentPrice">Current Price (₫)</Label>
                  <Input
                    id="currentPrice"
                    type="number"
                    placeholder="0"
                    value={currentPrice}
                    onChange={(e) => handleCurrentPriceChange(e.target.value)}
                    className={`rounded-lg ${priceError ? 'border-red-500' : ''}`}
                  />
                  {priceError && <p className="text-red-600">{priceError}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input id="height" type="number" placeholder="0" className="rounded-lg" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="width">Width (cm)</Label>
                  <Input id="width" type="number" placeholder="0" className="rounded-lg" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="length">Length (cm)</Label>
                  <Input id="length" type="number" placeholder="0" className="rounded-lg" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (g)</Label>
                  <Input id="weight" type="number" placeholder="0" className="rounded-lg" />
                </div>
              </div>
            </TabsContent>

            {/* Category Tab */}
            <TabsContent value="category" className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="category">Select Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Choose product category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="book">Book</SelectItem>
                    <SelectItem value="newspaper">Newspaper</SelectItem>
                    <SelectItem value="cd">CD</SelectItem>
                    <SelectItem value="dvd">DVD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            {/* Product Details Tab - Book */}
            {category === 'book' && (
              <TabsContent value="details" className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="authors">Authors</Label>
                    <Input id="authors" placeholder="Enter authors" className="rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="coverType">Cover Type</Label>
                    <Select>
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="Select cover type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hardcover">Hardcover</SelectItem>
                        <SelectItem value="paperback">Paperback</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="publisher">Publisher</Label>
                    <Input id="publisher" placeholder="Enter publisher" className="rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="publicationDate">Publication Date</Label>
                    <Input id="publicationDate" type="date" className="rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pages">Number of Pages</Label>
                    <Input id="pages" type="number" placeholder="0" className="rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Input id="language" placeholder="Enter language" className="rounded-lg" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="genre">Genre</Label>
                    <Input id="genre" placeholder="Enter genre" className="rounded-lg" />
                  </div>
                </div>
              </TabsContent>
            )}

            {/* Product Details Tab - Newspaper */}
            {category === 'newspaper' && (
              <TabsContent value="details" className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="editorInChief">Editor-in-Chief</Label>
                    <Input id="editorInChief" placeholder="Enter editor-in-chief" className="rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="publisher">Publisher</Label>
                    <Input id="publisher" placeholder="Enter publisher" className="rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="publicationDate">Publication Date</Label>
                    <Input id="publicationDate" type="date" className="rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="issueNumber">Issue Number</Label>
                    <Input id="issueNumber" placeholder="Enter issue number" className="rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="frequency">Frequency</Label>
                    <Select>
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="issn">ISSN</Label>
                    <Input id="issn" placeholder="Enter ISSN" className="rounded-lg" />
                  </div>
                </div>
              </TabsContent>
            )}

            {/* Product Details Tab - CD */}
            {category === 'cd' && (
              <TabsContent value="details" className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="artists">Artists</Label>
                    <Input id="artists" placeholder="Enter artists" className="rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recordLabel">Record Label</Label>
                    <Input id="recordLabel" placeholder="Enter record label" className="rounded-lg" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="genre">Genre</Label>
                    <Input id="genre" placeholder="Enter genre" className="rounded-lg" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Track List</Label>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-[#F5F5F5]">
                        <tr>
                          <th className="px-4 py-3 text-left text-gray-600">Track Title</th>
                          <th className="px-4 py-3 text-left text-gray-600">Length</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-gray-200">
                          <td className="px-4 py-3">
                            <Input placeholder="Track 1" className="rounded-lg" />
                          </td>
                          <td className="px-4 py-3">
                            <Input placeholder="0:00" className="rounded-lg" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <Button variant="outline" className="rounded-lg mt-2">Add Track</Button>
                </div>
              </TabsContent>
            )}

            {/* Product Details Tab - DVD */}
            {category === 'dvd' && (
              <TabsContent value="details" className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="discType">Disc Type</Label>
                    <Select>
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="Select disc type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dvd">DVD</SelectItem>
                        <SelectItem value="bluray">Blu-ray</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="director">Director</Label>
                    <Input id="director" placeholder="Enter director" className="rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="runtime">Runtime (minutes)</Label>
                    <Input id="runtime" type="number" placeholder="0" className="rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="studio">Studio</Label>
                    <Input id="studio" placeholder="Enter studio" className="rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Input id="language" placeholder="Enter language" className="rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subtitles">Subtitles</Label>
                    <Input id="subtitles" placeholder="Enter subtitles" className="rounded-lg" />
                  </div>
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => router.push('/manager/products')} className="rounded-lg">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!!priceError}
            className="rounded-lg bg-[#3A7AFE] hover:bg-[#2868ee] px-8 py-6"
          >
            Save Product
          </Button>
        </div>
      </div>
    </>
  );
}