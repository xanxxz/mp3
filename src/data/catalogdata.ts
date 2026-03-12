import categoriesData from './categories.json'; // JSON-файл
import productsData from './products.json';
import type { Category, ProductData } from '../types/types';

interface CatalogColumn {
  items: {
    title: string;
    path: string;
    productCount: number;
  }[];
}

const categories: Category[] = categoriesData;
const products: ProductData[] = productsData;

const getProductCount = (categoryId: string) => {
  const childIds = categories
    .filter(c => c.parentId === categoryId)
    .map(c => c.id);

  return products.filter(
    p =>
      p.subcategoryId === categoryId ||
      childIds.includes(p.subcategoryId)
  ).length;
};

const categoriesWithCounts: Category[] = categories.map(cat => ({
  ...cat,
  productCount: getProductCount(cat.id)
}));

export const catalogData: CatalogColumn[] = categoriesWithCounts
  .filter(cat => !cat.parentId)
  .map(parent => {

    const subItems = categoriesWithCounts
      .filter(cat => cat.parentId === parent.id)
      .map(sub => ({
        title: sub.name,
        path: sub.path,
        productCount: sub.productCount
      }));

    return {
      items: subItems.length
        ? subItems
        : [{
            title: parent.name,
            path: parent.path,
            productCount: parent.productCount
          }],
    };
  });
