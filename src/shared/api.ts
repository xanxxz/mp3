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
  parentId?: string;
  productCount: number;
  path: string;
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

export interface Product {
  id: string;
  name: string;
  price: number;
  brandId: string;
  subcategoryId: string;
  images: string[];
  characteristics?: { name: string; value: string }[];
  inStock: boolean;
  description: string;
}

export const fetchAllCategories = async (): Promise<RawCategory[]> => {
  const res = await fetch(`${API_URL}/categories`);
  if (!res.ok) throw new Error('Не удалось получить категории');
  return res.json();
};

// --- Товары ---
export const fetchAllProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) throw new Error('Не удалось получить продукты');
  return res.json();
};

export const fetchProductById = async (id: string): Promise<Product> => {
  const res = await fetch(`${API_URL}/products/${id}`);
  if (!res.ok) {
    if (res.status === 404) throw new Error('Товар не найден');
    throw new Error('Ошибка при получении товара');
  }
  return res.json();
};

export const addCategoryApi = async (category: Partial<RawCategory>) => {
  const res = await fetch(`${API_URL}/admin/categories`, {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(category),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Ошибка добавления категории' }));
    throw new Error(err.message);
  }
  return res.json(); // вернёт добавленную категорию
};

export const addProductApi = async (product: Partial<Product>) => {
  const res = await fetch(`${API_URL}/admin/products`, {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(product),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Ошибка добавления товара' }));
    throw new Error(err.message);
  }
  return res.json(); // вернёт добавленный продукт
};

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

export interface CheckoutItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface CreateOrderBody {
  items: CheckoutItem[];
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

  return res.json();
};
