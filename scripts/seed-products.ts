/**
 * Seed script to add sample products to MongoDB
 * Run with: npx tsx scripts/seed-products.ts
 */

import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shopify';

const sampleProducts = [
  {
    name: 'Wireless Headphones',
    description: 'Premium wireless headphones with noise cancellation and 30-hour battery life.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    category: 'Electronics',
    stock: 50,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with fitness tracking, heart rate monitor, and GPS.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    category: 'Electronics',
    stock: 30,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Laptop Backpack',
    description: 'Durable laptop backpack with padded compartment and USB charging port.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    category: 'Accessories',
    stock: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precision tracking and long battery life.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
    category: 'Electronics',
    stock: 75,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Mechanical Keyboard',
    description: 'RGB mechanical keyboard with Cherry MX switches and customizable keys.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
    category: 'Electronics',
    stock: 40,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'USB-C Hub',
    description: 'Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1631540575400-6c1b0b5e5a3e?w=500',
    category: 'Accessories',
    stock: 60,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

async function seedProducts() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();
    const productsCollection = db.collection('products');

    // Clear existing products (optional)
    // await productsCollection.deleteMany({});

    // Insert sample products
    const result = await productsCollection.insertMany(sampleProducts);
    console.log(`Inserted ${result.insertedCount} products`);

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seedProducts();


