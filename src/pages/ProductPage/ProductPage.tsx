import styles from './productPage.module.css';
import { useParams, Navigate } from 'react-router-dom';
import products from '../../../__mocks__/products';
import { categories } from '../../../__mocks__/categories';
import { Breadcrumbs } from '../../components/UI/Breadcrumbs/Breadcrumbs';
import ProductGallery from 'components/UI/ProductGallery/ProductGallery';
import ProductCharacteristics from 'components/UI/ProductCharacteristics/ProductCharacteristics';
import {
  FiCreditCard,
  FiList,
  FiBox,
  FiDivideCircle
} from 'react-icons/fi';
import ProductPurchase from 'components/UI/ProductPurchase/ProductPurchase';
import ProductTabs from 'components/UI/ProductTabs/ProductTabs';
import RelatedProducts from 'components/UI/ProductsRelated/RelatedProducts';
import { useState } from 'react';
import { BuyNowModal } from '../../components/UI/Modal/BuyNowModal';


export const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [isBuyOpen, setIsBuyOpen] = useState(false);


  const product = products.find(p => p.id === productId);
  if (!product) return <Navigate to="/catalog" replace />;

  const subcategory = categories.find(c => c.id === product.subcategoryId);
  const category = categories.find(c => c.id === subcategory?.parentId);


  return (
    <>
      <div className={styles.div}>
        <Breadcrumbs category={subcategory ?? null} productName={product?.name} />
        <div className={styles.divFlex}>
          <ProductGallery images={product.images} />
          <div className={styles.right}>
            <div className={styles.characteristics}>
              <ProductCharacteristics characteristics={product.characteristics} />
              <ul className={styles.ulFlex}>
                <li><FiCreditCard /><span>Оплата любым удобным способом</span></li>
                <li><FiList /><span>Большой выбор товаров в каталоге</span></li>
                <li><FiBox /><span>Осуществляем быструю доставку</span></li>
                <li><FiDivideCircle /><span>Делаем скидки на крупные покупки</span></li>
              </ul>
            </div>
            <ProductPurchase product={product} inStock={product.inStock}  onBuyNow={() => setIsBuyOpen(true)}/>
          </div>
        </div>
        <ProductTabs product={product} />
        <RelatedProducts currentProduct={product} allProducts={products} />
      </div>
      <BuyNowModal
        isOpen={isBuyOpen}
        productName={product.name}
        onClose={() => setIsBuyOpen(false)}
      />
    </>
  );
};
