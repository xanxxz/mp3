import React, { useState } from 'react';
import styles from './checkout.module.css';
import { Link, useNavigate } from 'react-router-dom';
import {
  validateCheckout,
  CheckoutFormValues,
  ValidationErrors
} from '../../utils/validation';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from 'utils/slices/cartSlice';
import { RootState } from 'utils/store';
import { createOrder, CreateOrderBody } from 'shared/api';
import Loader from 'components/UI/Loader/Loader';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [form, setForm] = useState<CheckoutFormValues>({
    name: '',
    phone: '',
    address: '',
    comment: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const [errors, setErrors] = useState<ValidationErrors<CheckoutFormValues>>({});
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const [orderCode, setOrderCode] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let newValue = value;

    // номер карты
    if (name === 'cardNumber') {
      const digits = value.replace(/\D/g, '').slice(0, 16);
      newValue = digits.replace(/(.{4})/g, '$1 ').trim();
    }

    // срок карты
    if (name === 'expiry') {
      const digits = value.replace(/\D/g, '').slice(0, 4);

      if (digits.length >= 3) {
        newValue = `${digits.slice(0, 2)}/${digits.slice(2)}`;
      } else {
        newValue = digits;
      }
    }

    // cvv
    if (name === 'cvv') {
      newValue = value.replace(/\D/g, '').slice(0, 3);
    }

    // телефон
    if (name === 'phone') {
      newValue = value.replace(/[^\d+]/g, '').slice(0, 15);
    }

    setForm({
      ...form,
      [name]: newValue
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateCheckout(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      if (!cartItems.length) {
        alert('Корзина пуста');
        setLoading(false);
        return;
      }

      // total считается на фронте
      const body: CreateOrderBody = {
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        total,
      };

      console.log('Создаём заказ', body);

      const { orderId, code } = await createOrder(body);

      setOrderCode(code);
      dispatch(clearCart());
      setPaid(true);
    } catch (err: any) {
      alert(err.message || 'Ошибка при создании заказа');
    } finally {
      setLoading(false);
    }
  };

  if (paid) {
    return (
      <div className={styles.containerFinish}>
        <h1 className={styles.title}>Оплата прошла успешно</h1>
        <p className={styles.subTitle}>Спасибо за заказ. Деньги виртуально исчезли.</p>
        {orderCode && <p>Ваш код заказа: <b>{orderCode}</b></p>}
        <Link className={styles.submitBtn} to="/">На главную</Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Оформление заказа</h1>
      <p className={styles.total}>Итого к оплате: {total} ₽</p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.sectionTitle}>Контактные данные</h2>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Имя"
          className={styles.input}
        />
        {errors.name && <span className={styles.error}>{errors.name}</span>}

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+79991234567"
          className={styles.input}
        />
        {errors.phone && <span className={styles.error}>{errors.phone}</span>}

        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Адрес доставки"
          className={styles.input}
        />
        {errors.address && (
          <span className={styles.error}>{errors.address}</span>
        )}

        <textarea
          name="comment"
          value={form.comment}
          onChange={handleChange}
          placeholder="Комментарий к заказу"
          className={styles.textarea}
        />

        <h2 className={styles.sectionTitle}>Данные карты</h2>

        <input
          name="cardNumber"
          value={form.cardNumber}
          onChange={handleChange}
          placeholder="1234 5678 9012 3456"
          className={styles.input}
          inputMode="numeric"
        />
        {errors.cardNumber && (
          <span className={styles.error}>{errors.cardNumber}</span>
        )}

        <div className={styles.cardRow}>
          <div className={styles.cardField}>
            <input
              name="expiry"
              value={form.expiry}
              onChange={handleChange}
              placeholder="MM/YY"
              className={styles.input}
              inputMode="numeric"
            />
            {errors.expiry && (
              <span className={styles.error}>{errors.expiry}</span>
            )}
          </div>

          <div className={styles.cardField}>
            <input
              name="cvv"
              value={form.cvv}
              onChange={handleChange}
              placeholder="123"
              className={styles.input}
              inputMode="numeric"
              type="password"
            />
            {errors.cvv && (
              <span className={styles.error}>{errors.cvv}</span>
            )}
          </div>
        </div>

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={loading}
        >
          {loading ? 'Списание денег...' : 'Оплатить заказ'}
        </button>
      </form>
    </div>
  );
};
