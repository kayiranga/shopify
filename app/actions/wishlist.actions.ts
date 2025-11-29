'use server';

import { WishlistRepository } from '@/lib/db/repositories/wishlist.repository';
import { ProductRepository } from '@/lib/db/repositories/product.repository';
import { revalidatePath } from 'next/cache';

const wishlistRepository = new WishlistRepository();
const productRepository = new ProductRepository();

// For demo purposes, using a static userId. In production, get from session/auth
const getUserId = () => 'user-1';

export async function addToWishlist(productId: string) {
  try {
    const userId = getUserId();
    await wishlistRepository.addProduct(userId, productId);
    revalidatePath('/wishlist');
    revalidatePath('/');
    
    return { success: true };
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    return { success: false, error: 'Failed to add to wishlist' };
  }
}

export async function removeFromWishlist(productId: string) {
  try {
    const userId = getUserId();
    await wishlistRepository.removeProduct(userId, productId);
    revalidatePath('/wishlist');
    revalidatePath('/');
    
    return { success: true };
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    return { success: false, error: 'Failed to remove from wishlist' };
  }
}

export async function getWishlist() {
  try {
    const userId = getUserId();
    const wishlist = await wishlistRepository.findByUserId(userId);
    
    if (!wishlist || wishlist.productIds.length === 0) {
      return { products: [] };
    }

    const products = await productRepository.findByIds(wishlist.productIds);
    
    return { products };
  } catch (error) {
    console.error('Error getting wishlist:', error);
    return { products: [] };
  }
}

export async function isInWishlist(productId: string): Promise<boolean> {
  try {
    const userId = getUserId();
    const wishlist = await wishlistRepository.findByUserId(userId);
    
    if (!wishlist) {
      return false;
    }

    return wishlist.productIds.some(id => id.toString() === productId);
  } catch (error) {
    console.error('Error checking wishlist:', error);
    return false;
  }
}


