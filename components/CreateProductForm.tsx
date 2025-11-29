'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { createProduct } from '@/app/actions/product.actions';
import { uploadImageToCloudinary } from '@/app/actions/cloudinary.actions';
import { useToast } from '@/hooks/use-toast';
import { Upload, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function CreateProductForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // First, upload image to Cloudinary
      let imageUrl = '';
      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append('file', imageFile);
        const uploadResult = await uploadImageToCloudinary(imageFormData);
        
        if (!uploadResult.success || !uploadResult.url) {
          toast({
            title: 'Error',
            description: uploadResult.error || 'Failed to upload image',
            variant: 'destructive',
          });
          setIsLoading(false);
          return;
        }
        imageUrl = uploadResult.url;
      } else {
        toast({
          title: 'Error',
          description: 'Please select an image',
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }

      // Then, create the product
      const formData = new FormData(e.currentTarget);
      formData.set('image', imageUrl);

      const result = await createProduct(formData);

      if (result.success) {
        toast({
          title: 'Success',
          description: 'Product created successfully!',
        });
        router.push('/');
        router.refresh();
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to create product',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Product</CardTitle>
        <CardDescription>Add a new product to your store</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter product name"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter product description"
              rows={4}
              required
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($) *</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock *</Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                min="0"
                placeholder="0"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Input
              id="category"
              name="category"
              placeholder="e.g., Electronics, Clothing, Accessories"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Product Image *</Label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              disabled={isLoading}
            />
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-md border"
                />
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Create Product
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

