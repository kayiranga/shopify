'use server';

import { ProductRepository } from '@/lib/db/repositories/product.repository';
import { revalidatePath } from 'next/cache';

const productRepository = new ProductRepository();

export async function getProducts() {
  try {
    const products = await productRepository.findAll();
    return { success: true, products };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { success: false, products: [] };
  }
}

export async function createProduct(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const image = formData.get('image') as string;
    const category = formData.get('category') as string;
    const stock = parseInt(formData.get('stock') as string);

    if (!name || !description || !price || !image || !category || isNaN(stock)) {
      return { success: false, error: 'All fields are required' };
    }

    const product = await productRepository.create({
      name,
      description,
      price,
      image,
      category,
      stock,
    });

    revalidatePath('/');
    return { success: true, product };
  } catch (error) {
    console.error('Error creating product:', error);
    return { success: false, error: 'Failed to create product' };
  }
}
