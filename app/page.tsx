import { getProducts } from '@/app/actions/product.actions';
import { ProductCard } from '@/components/ProductCard';

export default async function Home() {
  const { products } = await getProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome to Shopify</h1>
        <p className="text-muted-foreground">Discover amazing products</p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg mb-4">No products available</p>
          <p className="text-sm text-muted-foreground">
            Add some products to your MongoDB database to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id.toString()} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}


