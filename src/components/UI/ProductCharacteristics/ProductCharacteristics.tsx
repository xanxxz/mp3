import React from 'react';
import styles from './ProductCharacteristics.module.css';
import { ProductCharacteristic } from '../../../../__mocks__/products';

interface ProductCharacteristicsProps {
  characteristics: ProductCharacteristic[];
}

const ProductCharacteristics: React.FC<ProductCharacteristicsProps> = ({ characteristics }) => {
  if (!characteristics || characteristics.length === 0) return null;

  return (
    <div className={styles.characteristics}>
      <ul className={styles.list}>
        {characteristics.map((char, index) => (
          <li key={index} className={styles.item}>
            <span className={styles.name}>{char.name}:</span>
            <span className={styles.value}>{char.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductCharacteristics;
