import React, { useState } from 'react';
import styles from './ProductTabs.module.css';
import { ProductData } from '../../../../__mocks__/products';
import ProductCharacteristics from '../ProductCharacteristics/ProductCharacteristics';

interface ProductTabsProps {
  product: ProductData;
}

type Tab = 'characteristics' | 'about' | 'delivery';

const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState<Tab>('characteristics');

  const renderContent = () => {
    switch (activeTab) {
      case 'characteristics':
        return <ProductCharacteristics characteristics={product.characteristics} />
      case 'about':
        return <p className={styles.title}>О товаре "{product.name}"<span className={styles.description}>{product.description}</span></p>
      case 'delivery':
        return (
          <>
            <div>
              <h4 className={styles.deliveryTitle}>Доставка</h4>
              <p className={styles.deliveryText}>
                Мы всегда готовы доставить приобретенный Вами товар в удобное для Вас время.
                <span className={styles.bold}> Стоимость доставки</span> товаров
                определяется исходя из <span className={styles.bold}> веса</span>,
                <span className={styles.bold}> габаритов</span> и <span className={styles.bold}> удаленности</span> до места назначения.
                Доставка осуществляется до подъезда дома, офиса.
                Наш интернет-магазин предлагает несколько вариантов получения товара:
              </p>
              <ul className={styles.ul}>
                <li className={styles.li}>Самовывоз с территории компании.</li>
                <li className={styles.li}>Быстрая доставка по Саратовской области.</li>
                <li className={styles.li}>Доставка транспортной компанией.</li>
                <li className={styles.li}>Почтой России.</li>
              </ul>
            </div>
            <div>
              <h4 className={styles.deliveryTitle}>Оплата</h4>
              <p className={styles.deliveryText}>Оплатить свои покупки вы можете:</p>
              <h5>1. Банковской картой с помощью платежной системы на сайте</h5>
              <ul className={styles.ul}>
                <li className={styles.li}>МИР</li>
                <li className={styles.li}>VISA International</li>
                <li className={styles.li}>Mastercard Worldwide</li>
                <li className={styles.li}>JCB</li>
              </ul>
              <h5>2. Наличными водителю при получение заказа</h5>
              <ul className={styles.ul}>
                <li className={styles.li}>Банковской картой с помощью платежной системы на сайте или на кассе при получении заказа.</li>
                <li className={styles.li}>Наличными на кассе при получении заказа.</li>
              </ul>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.tabs}>
      <div className={styles.buttons}>
        <button
          className={activeTab === 'characteristics' ? styles.active : ''}
          onClick={() => setActiveTab('characteristics')}
        >
          Характеристики
        </button>
        <button
          className={activeTab === 'about' ? styles.active : ''}
          onClick={() => setActiveTab('about')}
        >
          О товаре
        </button>
        <button
          className={activeTab === 'delivery' ? styles.active : ''}
          onClick={() => setActiveTab('delivery')}
        >
          Доставка и оплата
        </button>
      </div>
      <div className={styles.content}>
        {renderContent()}
      </div>
    </div>
  );
};

export default ProductTabs;
