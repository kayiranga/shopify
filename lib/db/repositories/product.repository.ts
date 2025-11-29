import { getDatabase } from '@/lib/mongodb';
import { Product, ProductDocument } from '../models/product.model';
import { ObjectId } from 'mongodb';

export class ProductRepository {
  private collectionName = 'products';

  async findAll(): Promise<ProductDocument[]> {
    const db = await getDatabase();
    return db.collection<Product>(this.collectionName).find({}).toArray() as Promise<ProductDocument[]>;
  }

  async findById(id: string): Promise<ProductDocument | null> {
    const db = await getDatabase();
    return db.collection<Product>(this.collectionName).findOne({ _id: new ObjectId(id) }) as Promise<ProductDocument | null>;
  }

  async findByIds(ids: ObjectId[]): Promise<ProductDocument[]> {
    const db = await getDatabase();
    return db.collection<Product>(this.collectionName)
      .find({ _id: { $in: ids } })
      .toArray() as Promise<ProductDocument[]>;
  }

  async create(product: Omit<Product, '_id' | 'createdAt' | 'updatedAt'>): Promise<ProductDocument> {
    const db = await getDatabase();
    const now = new Date();
    const newProduct: Product = {
      ...product,
      createdAt: now,
      updatedAt: now,
    };
    
    const result = await db.collection<Product>(this.collectionName).insertOne(newProduct);
    return { ...newProduct, _id: result.insertedId } as ProductDocument;
  }
}


