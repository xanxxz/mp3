import React, { useEffect, useState } from 'react';
import type { ProductData, Category } from '../../types/types';
import categoriesData from '../../data/categories.json';
import styles from './AdminPage.module.css';
import {
  addCategoryApi,
  addProductApi,
  RawCategory,
} from '../../shared/api';

export const AdminPage = () => {
  // Товары теперь получаем с backend
  const [products, setProducts] = useState<ProductData[]>([]);

  // Категории пока оставляем из JSON
  const [categories, setCategories] = useState<Category[]>(categoriesData);
  const [users, setUsers] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  // Состояние нового товара
  const [newProduct, setNewProduct] = useState<Partial<ProductData>>({
    name: '',
    price: undefined,
    brandId: '',
    subcategoryId: '',
    images: [],
    characteristics: [],
    inStock: true,
    description: '',
  });

  // Состояние новой категории
  const [newCategoryId, setNewCategoryId] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryParentId, setNewCategoryParentId] = useState('');
  const [newCategoryPath, setNewCategoryPath] = useState('');

  const lastProduct = products[products.length - 1];
  const lastNumber = lastProduct
    ? parseInt(lastProduct.id.replace('p', ''))
    : 0;

  // Загрузка товаров с backend
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error('Ошибка загрузки товаров:', err);
      }
    };

    const loadUsers = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch('/api/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error('Ошибка загрузки пользователей:', err);
      }
    };

    const loadOrders = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch('/api/admin/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error('Ошибка загрузки заказов:', err);
      }
    };

    loadUsers();
    loadOrders();
    loadProducts();
  }, []);

  // Добавление товара через API
  const addProduct = async () => {
    if (!newProduct.name || !newProduct.brandId || !newProduct.subcategoryId) {
      return;
    }

    try {
      const productToSend = {
        id: `p${lastNumber + 1}`,
        name: newProduct.name,
        price: Number(newProduct.price),
        brandId: newProduct.brandId,
        subcategoryId: newProduct.subcategoryId,
        images:
          newProduct.images?.length
            ? newProduct.images
            : ['/images/products/default.png'],
        characteristics:
          newProduct.characteristics?.length
            ? newProduct.characteristics
            : [{ name: 'Мощность', value: '—' }],
        inStock: newProduct.inStock ?? true,
        description:
          newProduct.description || 'Описание товара отсутствует',
};

      const addedProduct = await addProductApi(productToSend);

      // Обновляем список товаров
      setProducts((prev) => [...prev, addedProduct]);

      // Сброс формы
      setNewProduct({
        name: '',
        price: 0,
        brandId: '',
        subcategoryId: '',
        images: [],
        characteristics: [],
        inStock: true,
        description: '',
      });
    } catch (err: any) {
      console.error('Ошибка добавления товара:', err.message);
    }
  };

  // Добавление категории
  const addCategory = async () => {
    if (!newCategoryName.trim()) return;

    try {
      const category: Partial<RawCategory> = {
        id: newCategoryId || `c${categories.length + 1}`,
        name: newCategoryName,
        parentId: newCategoryParentId || undefined,
        path:
          newCategoryPath ||
          newCategoryName.toLowerCase().replace(/\s+/g, '-'),
        productCount: 0,
      };

      const addedCategory = await addCategoryApi(category);

      setCategories((prev) => [...prev, addedCategory]);

      setNewCategoryId('');
      setNewCategoryName('');
      setNewCategoryParentId('');
      setNewCategoryPath('');
    } catch (err: any) {
      console.error('Ошибка добавления категории:', err.message);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.titlte}>Админ панель</h1>

      <div className={styles.container}>
        {/* Добавление категории */}
        <div>
          <h2 className={styles.subtitle}>Добавить категорию</h2>

          <input
            placeholder="ID категории"
            value={newCategoryId}
            onChange={(e) => setNewCategoryId(e.target.value)}
            className={styles.input}
          />

          <input
            placeholder="Название категории"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className={styles.input}
          />

          <select
            value={newCategoryParentId}
            onChange={(e) => setNewCategoryParentId(e.target.value)}
            className={styles.select}
          >
            <option value="">Нет родителя</option>

            {categories
              .filter((c) => c.id && String(c.id).length === 1)
              .map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
          </select>

          <input
            placeholder="Путь"
            value={newCategoryPath}
            onChange={(e) => setNewCategoryPath(e.target.value)}
            className={styles.input}
          />

          <button onClick={addCategory} className={styles.addButton}>
            Добавить категорию
          </button>
        </div>

        {/* Добавление товара */}
        <div>
          <h2 className={styles.subtitle}>Добавить товар</h2>

          <input
            placeholder="Название товара"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className={styles.input}
          />

          <input
            placeholder="Цена"
            type="number"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                price: Number(e.target.value),
              })
            }
            className={styles.input}
          />

          <input
            placeholder="Бренд ID"
            value={newProduct.brandId}
            onChange={(e) =>
              setNewProduct({ ...newProduct, brandId: e.target.value })
            }
            className={styles.input}
          />

          <select
            value={newProduct.subcategoryId || ''}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                subcategoryId: e.target.value,
              })
            }
            className={styles.select}
          >
            <option value="">Выберите подкатегорию</option>

            {categories
              .filter((c) => c.id && String(c.id).length === 2)
              .map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
          </select>

          <button onClick={addProduct} className={styles.addButton}>
            Добавить товар
          </button>
        </div>
      </div>

      {/* Список товаров */}
      <h2 className={styles.subtitle}>Товары</h2>
      <ul className={styles.ul}>
        {products.map((p) => (
          <li key={p.id} className={styles.li}>
            {p.name} — {p.price} ₽ — {p.inStock ? 'В наличии' : 'Нет в наличии'}
          </li>
        ))}
      </ul>
      <h2 className={styles.subtitle}>Пользователи</h2>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Имя</th>
            <th>Email</th>
            <th>Телефон</th>
            <th>Роль</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className={styles.subtitle}>Заказы</h2>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Код</th>
            <th>Клиент</th>
            <th>Email</th>
            <th>Телефон</th>
            <th>Сумма</th>
            <th>Дата</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.code}</td>
              <td>{order.name}</td>
              <td>{order.email}</td>
              <td>{order.phone}</td>
              <td>{order.total} ₽</td>
              <td>
                {new Date(order.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
