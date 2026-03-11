const API_URL = import.meta.env.VITE_API_URL;

const getToken = () => localStorage.getItem('token');

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

export interface RegisterData {
  email: string;
  phone: string;
  name: string;
  region: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

const authHeader = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

export const fetchCart = async () => {
  const res = await fetch(`${API_URL}/cart`, {
    method: 'GET',
    headers: authHeader(),
  });
  if (!res.ok) throw new Error('Ошибка получения корзины');
  return res.json();
};

export const addToCart = async (productId: string, quantity = 1) => {
  const res = await fetch(`${API_URL}/cart`, {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({ productId, quantity }), // тело отдельно
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Ошибка добавления в корзину');
  }
  return res.json();
};

export const updateCartItem = async (productId: string, quantity: number) => {
  const res = await fetch(`${API_URL}/cart/${productId}`, {
    method: 'PUT',
    headers: authHeader(),
    body: JSON.stringify({ quantity }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Ошибка обновления количества');
  }
  return res.json();
};

export const removeCartItem = async (productId: string) => {
  const token = localStorage.getItem('token'); // или откуда у тебя хранится JWT

  const res = await fetch(`${API_URL}/cart/${productId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Ошибка удаления товара');
  }

  return res.json();
};

export const registerUser = async (data: RegisterData) => {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).message);
  return res.json();
};

export const loginUser = async (data: LoginData) => {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).message);
  return res.json(); // вернёт { token, user }
};

export const resetPassword = async (email: string) => {
  const res = await fetch(`${API_URL}/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error((await res.json()).message);
  return res.json();
};

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

// shared/api.ts
export interface CheckoutItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface CreateOrderBody {
  items: CheckoutItem[]; // фронт использует только для локальной проверки
  total: number;
}

// Создать заказ
export const createOrder = async (body: CreateOrderBody) => {
  if (!body.items || body.items.length === 0) {
    throw new Error('Корзина пуста');
  }

  const payload = { total: Number(body.total) || 0 };

  const res = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Ошибка создания заказа' }));
    throw new Error(err.message || 'Ошибка создания заказа');
  }

  // Сервер теперь возвращает { orderId, code, total }
  return res.json() as Promise<{ orderId: string; code: string; total: number; message: string }>;
};

// Получить заказы текущего пользователя
export const fetchOrders = async () => {
  const res = await fetch(`${API_URL}/orders`, {
    method: 'GET',
    headers: authHeader(),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Ошибка получения заказов');
  }

  return res.json(); // массив заказов
};
