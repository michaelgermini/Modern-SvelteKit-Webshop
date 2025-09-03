export type { Product } from './product';
export type { CartItem, Cart } from './cart';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  createdAt: Date;
  lastLogin: Date;
}
