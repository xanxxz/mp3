import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCart } from './shared/api';
import { addItem, clearCart } from './utils/slices/cartSlice';
import products from '../__mocks__/products';

export const AppInit = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadCart = async () => {
      try {
        const serverCart = await fetchCart();
        dispatch(clearCart());
        serverCart.forEach((item: { productId: string; quantity: any; }) => {
          const product = products.find(p => p.id === item.productId);
          if (product) {
            dispatch(addItem({
              id: product.id,
              name: product.name,
              price: product.price,
              art: product.art,
              images: product.images,
              quantity: item.quantity,
            }));
          }
        });
      } catch (err) {
        console.error('Ошибка загрузки корзины при старте:', err);
      }
    };

    loadCart();
  }, [dispatch]);

  return null;
};
