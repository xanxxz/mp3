import styles from './RelatedProducts.module.css';
import { ProductData } from '../../../../__mocks__/products';
import ProductCard from '../ProductCard/ProductCard';

interface RelatedProductsProps {
  currentProduct: ProductData;
  allProducts: ProductData[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ currentProduct, allProducts }) => {
  const related = allProducts
    .filter(
      p =>
        p.id !== currentProduct.id &&
        p.subcategoryId === currentProduct.subcategoryId
    )
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
