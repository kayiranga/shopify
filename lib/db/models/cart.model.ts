import { ObjectId } from 'mongodb';

export interface CartItem {
  productId: ObjectId;
  quantity: number;
}

export interface Cart {
  _id?: ObjectId;
  userId: string;
  items: CartItem[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CartDocument extends Omit<Cart, '_id'> {
  _id: ObjectId;
}


