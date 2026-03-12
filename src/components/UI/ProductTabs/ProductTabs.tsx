import React, { useState } from 'react';
import styles from './ProductTabs.module.css';
import { ProductData } from 'types/types';
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
        return <ProductCharacteristics characteristics={product.characteristics} />;

      case 'about':
        return (
          <p className={styles.title}>
            О товаре "{product.name}"
            <span className={styles.description}>{product.description}</span>
          </p>
        );

      case 'delivery':
        return (
          <>
            <div>
              <h4 className={styles.deliveryTitle}>Доставка</h4>
              <p className={styles.deliveryText}>
                Мы всегда готовы доставить приобретенный Вами товар в удобное для Вас время.
                <span className={styles.bold}> Стоимость доставки</span> товаров
                определяется исходя из <span className={styles.bold}> веса</span>,
                <span className={styles.bold}> габаритов</span> и
                <span className={styles.bold}> удаленности</span> до места назначения.
              </p>
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

      <div className={styles.content}>{renderContent()}</div>
    </div>
  );
};

export default ProductTabs;
