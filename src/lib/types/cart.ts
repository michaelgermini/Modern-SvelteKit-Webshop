import type { Product } from "./product";

export type CartItem = { 
  product: Product; 
  qty: number 
};

export type Cart = CartItem[];
