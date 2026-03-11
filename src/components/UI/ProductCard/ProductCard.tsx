import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.css';
import productsData from '../../../data/products.json';
import { ProductData } from 'types/types';
import ShopCart from '../../../assets/ShopCart.svg?react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../utils/store';
import { addItem } from '../../../utils/slices/cartSlice';
import { addToCart } from 'shared/api';

const products: ProductData[] = productsData;

interface ProductCardProps {
  product: ProductData;
  inStock?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, inStock = true }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!inStock) return;

    try {
      // 1. Сначала обновляем сервер
      await addToCart(product.id, quantity);

      // 2. Потом обновляем Redux корректным объектом CartItem
      dispatch(
        addItem({
          id: product.id,
          name: product.name,
          price: product.price,
          art: product.art,
          images: product.images,
          quantity,
        })
      );

      console.log(`Добавлено в корзину (сервер + фронт): ${product.name} x${quantity}`);
    } catch (err: any) {
      console.error('Ошибка добавления в корзину:', err.message);
      alert(err.message);
    }
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
