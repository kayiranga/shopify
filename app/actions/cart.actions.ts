'use server';

import { CartRepository } from '@/lib/db/repositories/cart.repository';
import { ProductRepository } from '@/lib/db/repositories/product.repository';
import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';

const cartRepository = new CartRepository();
const productRepository = new ProductRepository();

// For demo purposes, using a static userId. In production, get from session/auth
const getUserId = () => 'user-1';

export async function addToCart(productId: string, quantity: number = 1) {
  try {
    const userId = getUserId();
    const product = await productRepository.findById(productId);
    
    if (!product) {
      return { success: false, error: 'Product not found' };
    }

    const existingCart = await cartRepository.findByUserId(userId);
    const items = existingCart?.items || [];

    console.log("hello");
    
    const existingItemIndex = items.findIndex(
      item => item.productId.toString() === productId
    );

    let updatedItems;
    if (existingItemIndex >= 0) {
      updatedItems = [...items];
      updatedItems[existingItemIndex].quantity += quantity;
    } else {
      updatedItems = [...items, { productId: new ObjectId(productId), quantity }];
    }

    await cartRepository.createOrUpdate(userId, updatedItems);
    revalidatePath('/cart');
    revalidatePath('/');
    
    return { success: true };
  } catch (error) {
    console.error('Error adding to cart:', error);
    return { success: false, error: 'Failed to add to cart' };
  }
}

export async function removeFromCart(productId: string) {
  try {
    const userId = getUserId();
    await cartRepository.removeItem(userId, productId);
    revalidatePath('/cart');
    revalidatePath('/');
    
    return { success: true };
  } catch (error) {
    console.error('Error removing from cart:', error);
    return { success: false, error: 'Failed to remove from cart' };
  }
}

export async function updateCartItemQuantity(productId: string, quantity: number) {
  try {
    const userId = getUserId();
    const existingCart = await cartRepository.findByUserId(userId);
    
    if (!existingCart) {
      return { success: false, error: 'Cart not found' };
    }

    const items = existingCart.items.map(item => {
      if (item.productId.toString() === productId) {
        return { ...item, quantity };
      }
      return item;
    }).filter(item => item.quantity > 0);

    await cartRepository.createOrUpdate(userId, items);
    revalidatePath('/cart');
    
    return { success: true };
  } catch (error) {
    console.error('Error updating cart:', error);
    return { success: false, error: 'Failed to update cart' };
  }
}

export async function getCart() {
  try {
    const userId = getUserId();
    const cart = await cartRepository.findByUserId(userId);
    
    if (!cart || cart.items.length === 0) {
      return { items: [], total: 0 };
    }

    const productIds = cart.items.map(item => item.productId);
    const products = await productRepository.findByIds(productIds);
    
    const itemsWithProducts = cart.items.map(item => {
      const product = products.find(p => p._id.equals(item.productId));
      return {
        ...item,
        product,
        subtotal: product ? product.price * item.quantity : 0,
      };
    });

    const total = itemsWithProducts.reduce((sum, item) => sum + item.subtotal, 0);

    return { items: itemsWithProducts, total };
  } catch (error) {
    console.error('Error getting cart:', error);
    return { items: [], total: 0 };
  }
}


