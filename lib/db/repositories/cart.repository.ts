import { getDatabase } from '@/lib/mongodb';
import { Cart, CartDocument, CartItem } from '../models/cart.model';
import { ObjectId } from 'mongodb';

export class CartRepository {
  private collectionName = 'carts';

  async findByUserId(userId: string): Promise<CartDocument | null> {
    const db = await getDatabase();
    return db.collection<Cart>(this.collectionName).findOne({ userId }) as Promise<CartDocument | null>;
  }

  async createOrUpdate(userId: string, items: CartItem[]): Promise<CartDocument> {
    const db = await getDatabase();
    const now = new Date();
    
    const result = await db.collection<Cart>(this.collectionName).findOneAndUpdate(
      { userId },
      {
        $set: {
          userId,
          items,
          updatedAt: now,
        },
        $setOnInsert: {
          createdAt: now,
        },
      },
      { upsert: true, returnDocument: 'after' }
    );

    return result as CartDocument;
  }

  async removeItem(userId: string, productId: string): Promise<CartDocument | null> {
    const db = await getDatabase();
    const result = await db.collection<Cart>(this.collectionName).findOneAndUpdate(
      { userId },
      {
        $pull: { items: { productId: new ObjectId(productId) } },
        $set: { updatedAt: new Date() },
      },
      { returnDocument: 'after' }
    );

    return result as CartDocument | null;
  }

  async clear(userId: string): Promise<void> {
    const db = await getDatabase();
    await db.collection<Cart>(this.collectionName).deleteOne({ userId });
  }
}


