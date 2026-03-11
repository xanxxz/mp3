import React from 'react';
import styles from './CartItemRow.module.css';

interface CartItemRowProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  art?: string;
  image?: string;
  onQuantityChange: (qty: number) => void;
  onRemove: () => void;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({
  name,
  price,
  quantity,
  art,
  image,
  onQuantityChange,
  onRemove,
}) => {
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
          <button onClick={() => onQuantityChange(quantity - 1)} disabled={quantity <= 1}>−</button>
          <span>{quantity}</span>
          <button onClick={() => onQuantityChange(quantity + 1)}>+</button>
        </div>
      </div>
      <div className={styles.total}>{price * quantity} ₽</div>
      <div className={styles.remove}>
        <button onClick={onRemove}>Удалить</button>
      </div>
    </div>
  );
};
