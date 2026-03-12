import React, { useEffect, useState } from 'react';
import styles from './CartPage.module.css';
import { CartItemRow } from 'components/UI/Cart/CartItemsList';
import { CartSummary } from 'components/UI/Cart/CartSummary';
import RelatedProducts from 'components/UI/ProductsRelated/RelatedProducts';

import { fetchCart, updateCartItem, removeCartItem, fetchAllProducts } from '../../shared/api';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'utils/store';
import { useNavigate } from 'react-router-dom';

import {
  addItem,
  removeItem,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} from 'utils/slices/cartSlice';

import { ErrorModal } from 'components/UI/Modal/ErrorModal';
import Loader from 'components/UI/Loader/Loader';

export const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [loading, setLoading] = useState(true);
  const [errorOpen, setErrorOpen] = useState(false);
  const navigate = useNavigate();

  const loadCart = async () => {
    setLoading(true);

    try {
      const [serverCart, products] = await Promise.all([
        fetchCart(),
        fetchAllProducts(),
      ]);

      const productMap = new Map(products.map(p => [p.id, p]));

      dispatch(clearCart());

      serverCart.forEach((item: { productId: string; quantity: number }) => {
        const product = productMap.get(item.productId);

        if (product) {
          dispatch(
            addItem({
              id: product.id,
              name: product.name,
              price: product.price,
              images: product.images,
              quantity: item.quantity,
            })
          );
        }
      });
    } catch (err) {
      setErrorOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleQuantityChange = async (productId: string, qty: number) => {
    if (qty < 1) return;
    try {
      await updateCartItem(productId, qty);
      const item = cartItems.find(i => i.id === productId);
      if (!item) return;
      if (qty > item.quantity) dispatch(incrementQuantity(productId));
      else if (qty < item.quantity) dispatch(decrementQuantity(productId));
    } catch (err: any) {
      console.error('Ошибка обновления количества:', err.message);
    }
  };

  const handleRemove = async (productId: string) => {
    try {
      await removeCartItem(productId);
      dispatch(removeItem(productId));
    } catch (err: any) {
      console.error('Ошибка удаления товара:', err.message);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (loading) return <Loader fullscreen />;

  if (!cartItems.length) {
    return (
      <div className={styles.emptyWrapper}>
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>🛒</span>
          <h2>Ваша корзина пуста</h2>
          <p>Похоже, вы ещё не добавили товары. Пора выбрать что-то интересное!</p>
          <button
            className={styles.catalogButton}
            onClick={() => navigate('/catalog')}
          >
            Перейти в каталог
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Корзина</h1>
      <div className={styles.page}>
        <div className={styles.list}>
          <div className={styles.header}>
            <span>Товар</span>
            <span>Цена</span>
            <span>Кол-во</span>
            <span>Сумма</span>
          </div>

          {cartItems.map(item => (
            <CartItemRow
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              art={item.art}
              image={item.images?.[0]}
              onQuantityChange={qty => handleQuantityChange(item.id, qty)}
              onRemove={() => handleRemove(item.id)}
            />
          ))}
        </div>

        <CartSummary total={total} />
      </div>

      {cartItems[0] && (
        <RelatedProducts
          currentProductId={cartItems[0].id}
        />
      )}
      <ErrorModal
        isOpen={errorOpen}
        title="Ошибка загрузки корзины"
        message="Попробуйте позже"
        onClose={() => setErrorOpen(false)}
      />
    </div>
  );
};
