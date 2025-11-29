import { ObjectId } from 'mongodb';

export interface Product {
  _id?: ObjectId;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductDocument extends Omit<Product, '_id'> {
  _id: ObjectId;
}


