import styles from './productPage.module.css';
import { useParams, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import categoriesData from '../../data/categories.json';

import { Breadcrumbs } from '../../components/UI/Breadcrumbs/Breadcrumbs';
import ProductGallery from 'components/UI/ProductGallery/ProductGallery';
import ProductCharacteristics from 'components/UI/ProductCharacteristics/ProductCharacteristics';
import ProductPurchase from 'components/UI/ProductPurchase/ProductPurchase';
import ProductTabs from 'components/UI/ProductTabs/ProductTabs';
import RelatedProducts from 'components/UI/ProductsRelated/RelatedProducts';
import { BuyNowModal } from '../../components/UI/Modal/BuyNowModal';

import {
  FiCreditCard,
  FiList,
  FiBox,
  FiDivideCircle
} from 'react-icons/fi';

import { ProductData, Category } from 'types/types';
import { fetchProductById } from 'shared/api';

export const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();

  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isBuyOpen, setIsBuyOpen] = useState(false);

  useEffect(() => {
    if (!productId) return;

    fetchProductById(productId)
      .then((data) => {
        setProduct(data as ProductData);
      })
      .catch(() => {
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) return null;

  if (!product) return <Navigate to="/catalog" replace />;

  const subcategory: Category | undefined = (categoriesData as Category[]).find(
    c => c.id === product.subcategoryId
  );

  const category: Category | undefined = (categoriesData as Category[]).find(
    c => c.id === subcategory?.parentId
  );

  return (
    <>
      <div className={styles.div}>
        <Breadcrumbs category={subcategory ?? null} productName={product.name} />

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

            <ProductPurchase
              product={product}
              onBuyNow={() => setIsBuyOpen(true)}
            />
          </div>
        </div>

        <ProductTabs product={product} />
        <RelatedProducts currentProductId={product.id} />
      </div>

      <BuyNowModal
        isOpen={isBuyOpen}
        productName={product.name}
        onClose={() => setIsBuyOpen(false)}
      />
    </>
  );
};
