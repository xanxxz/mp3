import React, { useState } from 'react';
import type { ProductData, Category } from '../../types/types';
import productsData from '../../data/products.json';
import categoriesData from '../../data/categories.json';
import styles from './AdminPage.module.css';

export const AdminPage = () => {
  const [products, setProducts] = useState<ProductData[]>(productsData);
  const [categories, setCategories] = useState<Category[]>(categoriesData);

  // Состояние для нового товара
  const [newProduct, setNewProduct] = useState<Partial<ProductData>>({
    name: '',
    price: 0,
    brandId: '',
    subcategoryId: '',
    inStock: true,
  });

  // Состояние для новой категории
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryParentId, setNewCategoryParentId] = useState<string>('');

  // Добавление товара
  const addProduct = () => {
    if (!newProduct.name || !newProduct.brandId || !newProduct.subcategoryId) return;

    const id = `p${products.length + 1}`;
    setProducts([
      ...products,
      {
        ...newProduct,
        id,
        price: Number(newProduct.price),
        images: [],
        characteristics: [],
      } as ProductData,
    ]);

    setNewProduct({
      name: '',
      price: 0,
      brandId: '',
      subcategoryId: '',
      inStock: true,
    });
  };

  // Добавление категории
  const addCategory = () => {
    if (!newCategoryName.trim()) return;

    const id = `c${categories.length + 1}`;
    setCategories([
      ...categories,
      {
        id,
        name: newCategoryName,
        parentId: newCategoryParentId || undefined, // вместо null
        path: newCategoryName.toLowerCase().replace(/\s+/g, '-'),
        productCount: 0, // обязательно
      },
    ]);

    setNewCategoryName('');
    setNewCategoryParentId('');
  };

  return (
    <div className={styles.wrapper}>
      <h1>Админка магазина</h1>

      {/* -------------------- Добавление категории -------------------- */}
      <h2>Добавить категорию</h2>
      <input
        placeholder="Название категории"
        value={newCategoryName}
        onChange={e => setNewCategoryName(e.target.value)}
      />
      <select
        value={newCategoryParentId}
        onChange={e => setNewCategoryParentId(e.target.value)}
      >
        <option value="">Нет родителя</option>
        {categories
          .filter(c => c.id.length === 1) // только главные категории
          .map(c => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
      </select>
      <button onClick={addCategory}>Добавить категорию</button>

      {/* -------------------- Добавление товара -------------------- */}
      <h2>Добавить товар</h2>
      <input
        placeholder="Название товара"
        value={newProduct.name}
        onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
      />
      <input
        placeholder="Цена"
        type="number"
        value={newProduct.price}
        onChange={e => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
      />
      <input
        placeholder="Бренд ID"
        value={newProduct.brandId}
        onChange={e => setNewProduct({ ...newProduct, brandId: e.target.value })}
      />
      <select
        value={newProduct.subcategoryId || ''}
        onChange={e => setNewProduct({ ...newProduct, subcategoryId: e.target.value })}
      >
        <option value="">Выберите подкатегорию</option>
        {categories.map(c => (
          <option key={c.id} value={c.id}>
            {c.parentId ? `— ${c.name}` : c.name}
          </option>
        ))}
      </select>
      <label>
        В наличии
        <input
          type="checkbox"
          checked={newProduct.inStock}
          onChange={e => setNewProduct({ ...newProduct, inStock: e.target.checked })}
        />
      </label>
      <button onClick={addProduct}>Добавить товар</button>

      {/* -------------------- Список товаров -------------------- */}
      <h2>Товары</h2>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.name} — {p.price} ₽ — {p.inStock ? 'В наличии' : 'Нет в наличии'} —
            Подкатегория: {categories.find(c => c.id === p.subcategoryId)?.name || 'не выбрана'} —
            Бренд: {p.brandId}
          </li>
        ))}
      </ul>

      {/* -------------------- Список категорий -------------------- */}
      <h2>Категории</h2>
      <ul>
        {categories.map(c => (
          <li key={c.id}>
            {c.name} — parent: {c.parentId ? categories.find(p => p.id === c.parentId)?.name : 'нет'}
          </li>
        ))}
      </ul>
    </div>
  );
};
