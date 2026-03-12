import React, { useState } from 'react';
import styles from './ProductPurchase.module.css';
import { ProductData } from 'types/types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../utils/store';
import { addItem } from '../../../utils/slices/cartSlice';
import { addToCart } from 'shared/api';
import { ErrorModal } from '../Modal/ErrorModal';
import { useNavigate } from 'react-router';

interface ProductPurchaseProps {
  product: ProductData;
  onBuyNow: () => void;
}

const ProductPurchase: React.FC<ProductPurchaseProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [errorOpen, setErrorOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const isInStock = product.inStock;

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isInStock) return;

    try {
      await addToCart(product.id, quantity);

      dispatch(
        addItem({
          ...product,
          quantity,
        })
      );
    } catch (err: any) {
      setErrorOpen(true);
    }
  };

  return (
    <>
      <div className={styles.purchase}>
        {product.art && (
          <div className={styles.art}>
            Артикул: {product.art}
          </div>
        )}

        <div className={styles.stock}>
          <span className={isInStock ? styles.inStock : styles.outOfStock}>
            {isInStock ? 'В наличии' : 'Нет в наличии'}
          </span>
        </div>

        <div className={styles.price}>
          {product.price.toLocaleString()} ₽
        </div>

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

      <ErrorModal
        isOpen={errorOpen}
        title="Требуется авторизация"
        message="Чтобы добавить товар в корзину, войдите в аккаунт"
        actionText="Войти"
        onAction={() => navigate('/login')}
        onClose={() => setErrorOpen(false)}
      />
    </>
  );
};

export default ProductPurchase;
