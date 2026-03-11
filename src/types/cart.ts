import { ProductData } from '../../__mocks__/products'; // или твой ProductData с бэка

// types/cart.ts
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  art?: string;
  image?: string;
  quantity: number;
}
