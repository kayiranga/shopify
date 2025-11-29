import { CreateProductForm } from '@/components/CreateProductForm';

export default function CreateProductPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Create Product</h1>
        <p className="text-muted-foreground">Add a new product to your store</p>
      </div>
      <CreateProductForm />
    </div>
  );
}

