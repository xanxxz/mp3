import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.css';
import { ProductData } from 'types/types';
import ShopCart from '../../../assets/ShopCart.svg?react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../utils/store';
import { addItem } from '../../../utils/slices/cartSlice';
import { addToCart } from 'shared/api';
import { ErrorModal } from '../Modal/ErrorModal';

interface ProductCardProps {
  product: ProductData;
  inStock?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, inStock = true }) => {
  const [quantity] = useState(1);
  const [errorOpen, setErrorOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!inStock) return;

    try {
      await addToCart(product.id, quantity);

      dispatch(
        addItem({
          id: product.id,
          name: product.name,
          price: product.price,
          images: product.images,
          quantity,
        })
      );
    } catch (err: any) {
      setErrorOpen(true);
    }
  };

  const handleClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <>
      <div className={styles.card} onClick={handleClick}>
        <img
          className={styles.img}
          src={product.images[0]}
          alt={product.name}
        />
        <h3 className={styles.name}>{product.name}</h3>

        <span className={styles.price}>{product.price} ₽</span>

        <button
          className={styles.btn}
          onClick={handleAddToCart}
          disabled={!inStock}
        >
          <ShopCart />
          <span className={styles.btnSpan}>Купить</span>
        </button>
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

export default ProductCard;
