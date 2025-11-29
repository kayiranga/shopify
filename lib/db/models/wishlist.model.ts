import { ObjectId } from 'mongodb';

export interface Wishlist {
  _id?: ObjectId;
  userId: string;
  productIds: ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface WishlistDocument extends Omit<Wishlist, '_id'> {
  _id: ObjectId;
}


