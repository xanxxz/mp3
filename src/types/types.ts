// types.ts
export interface ProductCharacteristic {
  name: string;
  value: string;
}

export interface ProductData {
  id: string;
  art?: string;
  name: string;
  price: number;
  brandId: string;
  subcategoryId: string;
  images: string[];
  characteristics: ProductCharacteristic[];
  inStock: boolean;
  description: string;
}

export interface Brand {
  id: string;
  name: string;
  productCount: number;
  categoryIds: string[]; // в каких категориях есть товары бренда
}

export interface Category {
  id: string;
  name: string;
  parentId?: string;
  productCount: number;
  path: string;
}
