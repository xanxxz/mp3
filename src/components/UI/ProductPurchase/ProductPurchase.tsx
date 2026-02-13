import React, { useState } from 'react';
import styles from './ProductPurchase.module.css';
import { ProductData } from '../../../../__mocks__/products';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../utils/store';
import { addItem } from '../../../utils/slices/cartSlice';

interface ProductPurchaseProps {
  product: ProductData;
  inStock?: boolean;
  onBuyNow: () => void;
}

const ProductPurchase: React.FC<ProductPurchaseProps> = ({ product, inStock = true, onBuyNow }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch<AppDispatch>();

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    if (!inStock) return;
    dispatch(
      addItem({
        ...product,
        quantity,
      })
    );
    console.log(`Добавлено в корзину: ${product.name} x${quantity}`);
  };

  return (
    <div className={styles.purchase}>
      {product.art && <div className={styles.art}>Артикул: {product.art}</div>}

      <div className={styles.stock}>
        <span className={inStock ? styles.inStock : styles.outOfStock}>
          {inStock ? 'В наличии' : 'Нет в наличии'}
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
          disabled={!inStock}
        >
          Добавить в корзину
        </button>

        <button
          className={styles.buyNow}
          onClick={onBuyNow}
          disabled={!inStock}
        >
          Купить в 1 клик
        </button>
      </div>
    </div>
  );
};

export default ProductPurchase;
