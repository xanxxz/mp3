import React from 'react';
import styles from './RelatedProducts.module.css';
import { ProductData } from 'types/types';
import ProductCard from '../ProductCard/ProductCard';
import productsData from '../../../data/products.json';

interface RelatedProductsProps {
  currentProductId: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ currentProductId }) => {
  const allProducts = productsData as ProductData[];
  const currentProduct = allProducts.find(p => p.id === currentProductId);
  if (!currentProduct) return null;

  const related = allProducts
    .filter(p => p.id !== currentProduct.id && p.subcategoryId === currentProduct.subcategoryId)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Похожие товары</h2>

      <div className={styles.grid}>
        {related.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
