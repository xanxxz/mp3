import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import  products  from '../../../../__mocks__/products';
import styles from './ProductList.module.css';

const ProductList: React.FC = () => {
  return (
    <div className={styles.container}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} inStock={product.inStock}/>
      ))}
    </div>
  );
};

export default ProductList;
