import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../utils/store';
import styles from './CartPage.module.css';
import { Link } from 'react-router';
import { CartItemRow } from 'components/UI/Cart/CartItemsList';
import { CartSummary } from 'components/UI/Cart/CartSummary';
import RelatedProducts from 'components/UI/ProductsRelated/RelatedProducts';
import products from '../../../__mocks__/products'; // моки

export const CartPage = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const firstProduct = items.length > 0
    ? products.find(p => p.id === items[0].id)
    : null;

  if (!items.length)
    return (
      <>
        <h1 className={styles.title1}>Корзина</h1>
        <div className={styles.empty}>
          <p className={styles.img}>😢</p>
          <h3>В вашей корзине пусто</h3>
          <p>У вас пока нет товаров в корзине. На странице "Каталог" вы найдете много интересных товаров.</p>
          <Link to="/catalog" className={styles.catalogButton}>
            Перейти в каталог
          </Link>
        </div>
      </>
    );

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

          {/* Список товаров */}
          {items.map(item => (
            <CartItemRow
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              art={item.art}
              image={item.images?.[0]}
            />
          ))}
        </div>

        <CartSummary total={total} />
      </div>
      {firstProduct && (
        <RelatedProducts currentProduct={firstProduct} allProducts={products} />
      )}
    </div>
  );
};
