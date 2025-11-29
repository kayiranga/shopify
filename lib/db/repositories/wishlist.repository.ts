import { getDatabase } from '@/lib/mongodb';
import { Wishlist, WishlistDocument } from '../models/wishlist.model';
import { ObjectId } from 'mongodb';

export class WishlistRepository {
  private collectionName = 'wishlists';

  async findByUserId(userId: string): Promise<WishlistDocument | null> {
    const db = await getDatabase();
    return db.collection<Wishlist>(this.collectionName).findOne({ userId }) as Promise<WishlistDocument | null>;
  }

  async addProduct(userId: string, productId: string): Promise<WishlistDocument> {
    const db = await getDatabase();
    const now = new Date();
    const productObjectId = new ObjectId(productId);

    const result = await db.collection<Wishlist>(this.collectionName).findOneAndUpdate(
      { userId },
      {
        $addToSet: { productIds: productObjectId },
        $set: { updatedAt: now },
        $setOnInsert: { createdAt: now },
      },
      { upsert: true, returnDocument: 'after' }
    );

    return result as WishlistDocument;
  }

  async removeProduct(userId: string, productId: string): Promise<WishlistDocument | null> {
    const db = await getDatabase();
    const result = await db.collection<Wishlist>(this.collectionName).findOneAndUpdate(
      { userId },
      {
        $pull: { productIds: new ObjectId(productId) },
        $set: { updatedAt: new Date() },
      },
      { returnDocument: 'after' }
    );

    return result as WishlistDocument | null;
  }
}


