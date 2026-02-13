const API_URL = import.meta.env.VITE_API_URL;

export interface Subcategory {
  id: string;
  title: string;
  slug: string;
}

export interface RawCategory {
  id: string;
  name: string;
  parent_id: string | null;
  product_count: number;
  path: string;
}

export interface Brand {
  id: string;
  name: string;
  categoryIds: string[];
  productCount: number;
}

// Получить все категории
export const getCategories = async (): Promise<RawCategory[]> => {
  const res = await fetch(`${API_URL}/categories`);
  if (!res.ok) throw new Error('Не удалось получить категории');
  return res.json();
};

// Получить категории верхнего уровня
export const getTopLevelCategories = async (): Promise<RawCategory[]> => {
  const categories = await getCategories();
  return categories.filter(c => c.parent_id === null);
};

// Получить подкатегории по id родителя
export const getSubcategories = async (parentId: string): Promise<RawCategory[]> => {
  const categories = await getCategories();
  return categories.filter(c => c.parent_id === parentId);
};

// Получить все бренды
export const getBrands = async (): Promise<Brand[]> => {
  const res = await fetch(`${API_URL}/brands`);
  if (!res.ok) throw new Error('Не удалось получить бренды');
  return res.json();
};

// Получить бренды для конкретной категории
export const getBrandsByCategory = async (categoryId: string): Promise<Brand[]> => {
  const brands = await getBrands();
  return brands.filter(b => b.categoryIds.includes(categoryId));
};

export interface Product {
  id: string;
  name: string;
  art: string;
  description: string;
  price: number;
  brandId: string;
  subcategoryId: string;
  inStock: boolean;
  images: string[]; // ✅ массив строк путей
  characteristics?: { name: string; value: string }[];
}


// Получить все продукты с фильтрами
export const getProducts = async (filters?: {
  brand?: string | number;
  category?: string | number;
  subcategory?: string | number;
}): Promise<Product[]> => {
  const params = new URLSearchParams();

  if (filters?.brand !== undefined) params.append('brand', String(filters.brand));
  if (filters?.category !== undefined) params.append('category', String(filters.category));
  if (filters?.subcategory !== undefined) params.append('subcategory', String(filters.subcategory));

  const query = params.toString();
  const res = await fetch(`${API_URL}/products${query ? `?${query}` : ''}`);

  if (!res.ok) throw new Error('Не удалось получить продукты');

  return res.json();
};


export const getProductById = async (id: string): Promise<Product> => {
  const res = await fetch(`${API_URL}/products/${id}`);
  if (!res.ok) throw new Error('Продукт не найден');
  return res.json();
};

export const getFiltersData = async (): Promise<{
  categories: RawCategory[];
  brands: Brand[];
}> => {
  const [categoriesRes, brandsRes] = await Promise.all([
    fetch(`${API_URL}/categories`),
    fetch(`${API_URL}/brands`),
  ]);

  if (!categoriesRes.ok || !brandsRes.ok) throw new Error('Не удалось получить фильтры');

  const categories = await categoriesRes.json();
  const brands = await brandsRes.json();

  return { categories, brands };
};
