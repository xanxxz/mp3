import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../utils/store';
import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
} from '../../../utils/slices/cartSlice';
import styles from './CartItemRow.module.css';

interface CartItemRowProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  art?: string;
  image?: string;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({ id, name, price, quantity, art, image, }) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
        <div className={styles.row}>
          <div className={styles.product}>
            {image && <img src={image} alt={name} className={styles.image} />}
            <div className={styles.info}>
              <div className={styles.name}>{name}</div>
              {art && <div className={styles.art}>Артикул: {art}</div>}
            </div>
          </div>
          <div className={styles.price}>{price} ₽</div>
          <div className={styles.quantity}>
            <div>
              <button onClick={() => dispatch(decrementQuantity(id))}>−</button>
              <span>{quantity}</span>
              <button onClick={() => dispatch(incrementQuantity(id))}>+</button>
            </div>
          </div>
          <div className={styles.total}>{price * quantity} ₽</div>
          <div className={styles.remove}>
            <button onClick={() => dispatch(removeItem(id))}>Удалить</button>
          </div>
        </div>
  );
};
