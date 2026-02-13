import { useState } from 'react';
import { Modal } from '../Modal/Modal';

type BuyNowModalProps = {
  isOpen: boolean;
  productName: string;
  onClose: () => void;
};

export const BuyNowModal: React.FC<BuyNowModalProps> = ({
  isOpen,
  productName,
  onClose,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'cod'>('online');

  // Онлайн оплата
  const [phone, setPhone] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardDate, setCardDate] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Оплата при получении
  const [address, setAddress] = useState('');

  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  const handleSubmit = () => {
  if (!phone) return;

    if (paymentMethod === 'online') {
      if (!cardNumber || !cardDate || !cardCvv) return;
      console.log('💳 Деньги успешно списаны (в воображении)');
    } else {
      if (!address) return;
      console.log('🚚 Заказ оформлен с оплатой при получении');
    }

    const fakeOrder = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(fakeOrder);
    setStep('success');
  };

  const handleClose = () => {
    setStep('form');
    setPhone('');
    setCardNumber('');
    setCardDate('');
    setCardCvv('');
    setAddress('');
    setOrderNumber(null);
    onClose();
  };

  if (step === 'success') {
    return (
      <Modal
        isOpen={isOpen}
        title="Заказ оформлен"
        buttonText="Закрыть"
        onSubmit={handleClose}
        onClose={handleClose}
        inputs={[]}
      >
        <p>Спасибо за покупку товара «{productName}»</p>
        <p>Номер вашего заказа: <b>{orderNumber}</b></p>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      title={`Покупка товара «${productName}»`}
      buttonText="Купить"
      onSubmit={handleSubmit}
      onClose={handleClose}
      inputs={
        paymentMethod === 'online'
          ? [
              {
                name: 'phone',
                placeholder: 'Номер телефона',
                value: phone,
                onChange: setPhone,
              },
              {
                name: 'address',
                placeholder: 'Адрес доставки',
                value: address,
                onChange: setAddress,
              },
              {
                name: 'cardNumber',
                placeholder: 'Номер карты',
                value: cardNumber,
                onChange: setCardNumber,
              },
              {
                name: 'cardDate',
                placeholder: 'Срок действия MM/YY',
                value: cardDate,
                onChange: setCardDate,
              },
              {
                name: 'cardCvv',
                placeholder: 'CVV',
                type: 'password',
                value: cardCvv,
                onChange: setCardCvv,
              },
            ]
          : [
              {
                name: 'phone',
                placeholder: 'Номер телефона',
                value: phone,
                onChange: setPhone,
              },
              {
                name: 'address',
                placeholder: 'Введите адрес доставки',
                value: address,
                onChange: setAddress,
              },
            ]
      }
    >
      <div style={{ marginBottom: 12 }}>
        <label>
          <input
            type="radio"
            checked={paymentMethod === 'online'}
            onChange={() => setPaymentMethod('online')}
          />
          Онлайн оплата
        </label>

        <label style={{ marginLeft: 12 }}>
          <input
            type="radio"
            checked={paymentMethod === 'cod'}
            onChange={() => setPaymentMethod('cod')}
          />
          Оплата при получении
        </label>
      </div>
    </Modal>
  );
};
