import React, { useState } from 'react';
import type { ProductData, Category } from '../../types/types';
import productsData from '../../data/products.json';
import categoriesData from '../../data/categories.json';
import styles from './AdminPage.module.css';
import { addCategoryApi, addProductApi, RawCategory } from '../../shared/api';

export const AdminPage = () => {
  const [products, setProducts] = useState<ProductData[]>(productsData);
  const [categories, setCategories] = useState<Category[]>(categoriesData);

  // Состояние для нового товара
  const [newProduct, setNewProduct] = useState<Partial<ProductData>>({
    name: '',
    price: undefined,
    brandId: '',
    subcategoryId: '',
    images: [],                // массив для URL картинок
    characteristics: [],       // массив объектов { name, value }
    inStock: true,
    description: '',           // описание товара
  });

  // Состояние для новой категории
  const [newCategoryId, setNewCategoryId] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryParentId, setNewCategoryParentId] = useState('');
  const [newCategoryPath, setNewCategoryPath] = useState('');

  // Добавление товара через API
  const addProduct = async () => {
    if (!newProduct.name || !newProduct.brandId || !newProduct.subcategoryId) return;

    try {
      // Формируем объект, который отправим на бек
      const fullProduct: ProductData = {
        id: `p${products.length + 1}`, // бек может тоже генерировать id, можно убрать если бек делает это
        name: newProduct.name!,
        price: Number(newProduct.price),
        brandId: newProduct.brandId!,
        subcategoryId: newProduct.subcategoryId!,
        images: newProduct.images?.length ? newProduct.images : ['/images/products/default.png'],
        characteristics: newProduct.characteristics?.length
          ? newProduct.characteristics
          : [{ name: 'Мощность', value: '—' }],
        inStock: newProduct.inStock ?? true,
        description: newProduct.description || 'Описание товара отсутствует',
      };

      // Отправка на бек
      const addedProduct = await addProductApi(fullProduct);

      // Обновляем стейт на фронте
      setProducts([...products, addedProduct]);

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

  // Добавление категории через API
  const addCategory = async () => {
    if (!newCategoryName.trim()) return;

    try {
      const category: Partial<RawCategory> = {
        id: newCategoryId || `c${categories.length + 1}`, // используем введённый id, если есть
        name: newCategoryName,
        parentId: newCategoryParentId || undefined,
        path: newCategoryPath || newCategoryName.toLowerCase().replace(/\s+/g, '-'), // используем путь из формы
        productCount: 0,
      };

      const addedCategory = await addCategoryApi(category);

      setCategories([...categories, addedCategory]);

      // Сброс формы — теперь очищаем все поля
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
      {/* -------------------- Добавление категории -------------------- */}
        <div>
          <h2 className={styles.subtitle}>Добавить категорию</h2>

          <input
            placeholder="ID категории"
            value={newCategoryId}
            onChange={e => setNewCategoryId(e.target.value)}
            className={styles.input}
          />
          <div className={styles.categoriesId}>
            <span className={styles.span}>Для родителских категорий однозначное число(от 1 до 9)</span>
            <span className={styles.span}>Для подкатегорий двузначное число(от 10 до 90)</span>
          </div>

          <input
            placeholder="Название категории"
            value={newCategoryName}
            onChange={e => {
              const name = e.target.value;
              setNewCategoryName(name);

              // Если это родительская категория, автогенерируем path
              if (!newCategoryParentId) {
                setNewCategoryPath(`/catalog/`);
              }
            }}
            className={styles.input}
          />

          <select
            value={newCategoryParentId}
            onChange={e => setNewCategoryParentId(e.target.value)}
            className={styles.select}
          >
            <option value="">Нет родителя</option>

            {categories
              .filter(c => c.id && String(c.id).length === 1)
              .map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
          </select>

          <input
            placeholder="Путь (например /catalog/hand-tools/pliers)"
            value={newCategoryPath}
            onChange={e => setNewCategoryPath(e.target.value)}
            className={styles.input}
          />

          <button onClick={addCategory} className={styles.addButton}>
            Добавить категорию
          </button>
        </div>

        {/* -------------------- Добавление товара -------------------- */}
        <div>
          <h2 className={styles.subtitle}>Добавить товар</h2>

          <input
            placeholder="Название товара"
            value={newProduct.name}
            onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
            className={styles.input}
          />

          <input
            placeholder="Цена"
            type="number"
            value={newProduct.price}
            onChange={e => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
            className={styles.input}
          />

          <input
            placeholder="Бренд ID (например metabo, stanley, bosch)"
            value={newProduct.brandId}
            onChange={e => setNewProduct({ ...newProduct, brandId: e.target.value })}
            className={styles.input}
          />

          <select
            value={newProduct.subcategoryId || ''}
            onChange={e => setNewProduct({ ...newProduct, subcategoryId: e.target.value })}
            className={styles.select}
          >
            <option value="">Выберите подкатегорию</option>
            {categories.filter(c => c.id && String(c.id).length === 2).map(c => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* -------------------- Изображения -------------------- */}
          <div className={styles.div}>
            <h4 className={styles.text}>Изображения</h4>
            <span className={styles.span}>(например /images/products/defoult.png)</span>
          </div>
          {(newProduct.images || []).map((img, idx) => (
            <input
              key={idx}
              placeholder={`URL изображения ${idx + 1}`}
              value={img}
              onChange={e => {
                const images = [...(newProduct.images || [])];
                images[idx] = e.target.value;
                setNewProduct({ ...newProduct, images });
              }}
              className={styles.input}
            />
          ))}
          <button
            type="button"
            onClick={() =>
              setNewProduct({ ...newProduct, images: [...(newProduct.images || []), ''] })
            }
            className={styles.button}
          >
            Добавить изображение
          </button>

          {/* -------------------- Характеристики -------------------- */}
          <h4 className={styles.text}>Характеристики</h4>
          {(newProduct.characteristics || []).map((ch, idx) => (
            <div key={idx} className={styles.characteristicRow}>
              <input
                placeholder="Название"
                value={ch.name}
                onChange={e => {
                  const chars = [...(newProduct.characteristics || [])];
                  chars[idx].name = e.target.value;
                  setNewProduct({ ...newProduct, characteristics: chars });
                }}
                className={styles.input}
              />
              <input
                placeholder="Значение"
                value={ch.value}
                onChange={e => {
                  const chars = [...(newProduct.characteristics || [])];
                  chars[idx].value = e.target.value;
                  setNewProduct({ ...newProduct, characteristics: chars });
                }}
                className={styles.input}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setNewProduct({
                ...newProduct,
                characteristics: [...(newProduct.characteristics || []), { name: '', value: '' }],
              })
            }
            className={styles.button}
          >
            Добавить характеристику
          </button>

          <label className={styles.labelCheckbox}>
            <h4 className={styles.text}>В наличии</h4>
            <input
              type="checkbox"
              checked={newProduct.inStock}
              onChange={e => setNewProduct({ ...newProduct, inStock: e.target.checked })}
              className={styles.checkbox}
            />
          </label>

          <textarea
            placeholder="Описание товара"
            value={newProduct.description || ''}
            onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
            className={styles.input}
          />

          <button onClick={addProduct} className={styles.addButton}>
            Добавить товар
          </button>
        </div>
      </div>


      {/* -------------------- Список товаров -------------------- */}
      <h2 className={styles.subtitle}>Товары</h2>
      <ul className={styles.ul}>
        {products.map(p => (
          <li key={p.id} className={styles.li}>
            {p.name} — {p.price} ₽ — {p.inStock ? 'В наличии' : 'Нет в наличии'} —
            Подкатегория: {categories.find(c => c.id === p.subcategoryId)?.name || 'не выбрана'} —
            Бренд: {p.brandId}
          </li>
        ))}
      </ul>

      {/* -------------------- Список категорий -------------------- */}
      <h2 className={styles.subtitle}>Категории</h2>
      <ul className={styles.ul}>
        {categories.map(c => (
          <li key={c.id} className={styles.li}>
            {c.name} — parent: {c.parentId ? categories.find(p => p.id === c.parentId)?.name : 'нет'}
          </li>
        ))}
      </ul>
    </div>
  );
};
