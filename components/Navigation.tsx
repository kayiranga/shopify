'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Plus } from 'lucide-react';
import { getCart } from '@/app/actions/cart.actions';
import { getWishlist } from '@/app/actions/wishlist.actions';
import { useEffect, useState } from 'react';

export function Navigation() {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    async function loadCounts() {
      const cart = await getCart();
      const wishlist = await getWishlist();
      setCartCount(cart.items.length);
      setWishlistCount(wishlist.products.length);
    }
    loadCounts();
    // Refresh counts every 2 seconds
    const interval = setInterval(loadCounts, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-primary">
            Shopify
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/create-product">
              <Button variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Create Product
              </Button>
            </Link>
            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}


