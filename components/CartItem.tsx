'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Plus, Minus } from 'lucide-react';
import { removeFromCart, updateCartItemQuantity } from '@/app/actions/cart.actions';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { ProductDocument } from '@/lib/db/models/product.model';
import { CartItem as CartItemType } from '@/lib/db/models/cart.model';

interface CartItemProps {
  item: CartItemType & {
    product: ProductDocument;
    subtotal: number;
  };
}

export function CartItem({ item }: CartItemProps) {
  const { toast } = useToast();
  const productId = item.productId.toString();

  const handleRemove = async () => {
    const result = await removeFromCart(productId);
    if (result.success) {
      toast({
        title: 'Removed from cart',
        description: `${item.product.name} has been removed from your cart.`,
      });
    }
  };

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemove();
      return;
    }
    const result = await updateCartItemQuantity(productId, newQuantity);
    if (!result.success) {
      toast({
        title: 'Error',
        description: result.error || 'Failed to update quantity',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="relative w-24 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
            {item.product.image ? (
              <Image
                src={item.product.image}
                alt={item.product.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                No Image Found
              </div>
            )}
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-lg">{item.product.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {item.product.description}
              </p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-lg font-bold">${item.subtotal.toFixed(2)}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleRemove}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

