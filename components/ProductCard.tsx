'use client';

import { ProductDocument } from '@/lib/db/models/product.model';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart } from 'lucide-react';
import { addToCart } from '@/app/actions/cart.actions';
import { addToWishlist, removeFromWishlist, isInWishlist } from '@/app/actions/wishlist.actions';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

interface ProductCardProps {
  product: ProductDocument;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    async function checkWishlist() {
      const inWishlist = await isInWishlist(product._id.toString());
      setIsWishlisted(inWishlist);
    }
    checkWishlist();
  }, [product._id]);

  const handleAddToCart = async () => {
    setIsLoading(true);
    const result = await addToCart(product._id.toString(), 1);
    setIsLoading(false);
    
    if (result.success) {
      toast({
        title: 'Added to cart',
        description: `${product.name} has been added to your cart.`,
      });
    } else {
      toast({
        title: 'Error',
        description: result.error || 'Failed to add to cart',
        variant: 'destructive',
      });
    }
  };

  const handleToggleWishlist = async () => {
    setIsLoading(true);
    if (isWishlisted) {
      const result = await removeFromWishlist(product._id.toString());
      if (result.success) {
        setIsWishlisted(false);
        toast({
          title: 'Removed from wishlist',
          description: `${product.name} has been removed from your wishlist.`,
        });
      }
    } else {
      const result = await addToWishlist(product._id.toString());
      if (result.success) {
        setIsWishlisted(true);
        toast({
          title: 'Added to wishlist',
          description: `${product.name} has been added to your wishlist.`,
        });
      }
    }
    setIsLoading(false);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative w-full h-48 bg-gray-100">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          onClick={handleToggleWishlist}
          disabled={isLoading}
        >
          <Heart
            className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`}
          />
        </Button>
      </div>
      <CardHeader>
        <CardTitle className="text-lg">{product.name}</CardTitle>
        <CardDescription className="line-clamp-2">{product.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
          <Badge variant="secondary">{product.category}</Badge>
        </div>
        {product.stock > 0 ? (
          <p className="text-sm text-muted-foreground mt-2">In stock ({product.stock})</p>
        ) : (
          <p className="text-sm text-destructive mt-2">Out of stock</p>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleAddToCart}
          disabled={isLoading || product.stock === 0}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

