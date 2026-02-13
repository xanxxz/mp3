import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.css';
import { ProductData } from '../../../../__mocks__/products';
import ShopCart from '../../../assets/ShopCart.svg?react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../utils/store';
import { addItem } from '../../../utils/slices/cartSlice';

interface ProductCardProps {
  product: ProductData;
  inStock?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, inStock = true }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!inStock) return;
    dispatch(
      addItem({
        ...product,
        quantity,
      })
    );
    console.log(`Добавлено в корзину: ${product.name} x${quantity}`);
  };

  const handleClick = () => {
    navigate(`/products/${product.id}`); // Переход на страницу с детальной инфой
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <img className={styles.img} src={product.images[0]} alt={product.name}/>
      <span className={styles.art}>Артикул: {product.art}</span>
      <h3 className={styles.name}>{product.name}</h3>
      <span className={styles.price}>{product.price} ₽</span>
      <button className={styles.btn} onClick={handleAddToCart} disabled={!inStock}>
        <ShopCart />
        <span className={styles.btnSpan}>Купить</span>
      </button>
    </div>
  );
};

export default ProductCard;
