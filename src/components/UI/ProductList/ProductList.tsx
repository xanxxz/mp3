import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import productsData from '../../../data/products.json';
import { ProductData } from 'types/types';
import styles from './ProductList.module.css';

const ProductList: React.FC = () => {
  const products: ProductData[] = productsData;

  return (
    <div className={styles.container}>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          inStock={product.inStock}
        />
      ))}
    </div>
  );
};

export default ProductList;
