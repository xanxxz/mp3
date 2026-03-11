import React, { useState } from 'react';
import styles from './ProductPurchase.module.css';
import productsData from '../../../data/products.json';
import { ProductData } from 'types/types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../utils/store';
import { addItem } from '../../../utils/slices/cartSlice';
import { addToCart } from 'shared/api';

interface ProductPurchaseProps {
  productId: string | number; // теперь можно передавать и число, и строку
  onBuyNow: () => void;
}

const ProductPurchase: React.FC<ProductPurchaseProps> = ({ productId, onBuyNow }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch<AppDispatch>();

  // Приводим id к формату JSON: если число, добавляем 'p' спереди
  const normalizedId = typeof productId === 'number' ? `p${productId}` : productId;

  // Находим продукт в JSON по id
  const product: ProductData | undefined = (productsData as ProductData[]).find(
    p => p.id === normalizedId
  );

  if (!product) return <div>Продукт не найден</div>;

  const isInStock = product.inStock; // берём из JSON

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isInStock) return;

    try {
      await addToCart(product.id, quantity);

      // Обновляем локальный Redux
      dispatch(
        addItem({
          ...product,
          quantity,
        })
      );

      console.log(`Добавлено в корзину (сервер + фронт): ${product.name} x${quantity}`);
    } catch (err: any) {
      console.error('Ошибка добавления в корзину:', err.message);
      alert(err.message);
    }
  };

  return (
    <div className={styles.purchase}>
      {product.art && <div className={styles.art}>Артикул: {product.art}</div>}

      <div className={styles.stock}>
        <span className={isInStock ? styles.inStock : styles.outOfStock}>
          {isInStock ? 'В наличии' : 'Нет в наличии'}
        </span>
      </div>

      <div className={styles.price}>{product.price.toLocaleString()} ₽</div>

      <div className={styles.quantity}>
        <span className={styles.quantitySpan}>Количество:</span>
        <div>
          <button onClick={() => handleQuantityChange(-1)}>-</button>
          <span>{quantity}</span>
          <button onClick={() => handleQuantityChange(1)}>+</button>
        </div>
      </div>

      <div className={styles.buttons}>
        <button
          className={styles.addToCart}
          onClick={handleAddToCart}
          disabled={!isInStock}
        >
          Добавить в корзину
        </button>
      </div>
    </div>
  );
};

export default ProductPurchase;
