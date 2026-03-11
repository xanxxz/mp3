import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './breadcrumbs.module.css';
import categoriesData from '../../../data/categories.json'; // JSON вместо моков
import { Category } from 'types/types';

type BreadcrumbsProps = {
  category: Category | null;
  productName?: string;
  totalProducts?: number;
};

type BreadcrumbItem = {
  id: string;
  name: string;
  path?: string;
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ category, productName, totalProducts }) => {
  // приводим JSON к типу Category[]
  const categories: Category[] = categoriesData;

  const breadcrumbs = useMemo((): BreadcrumbItem[] => {
    const base: BreadcrumbItem[] = [{ id: 'catalog', name: 'Каталог', path: '/catalog' }];

    if (!category) {
      return productName ? [...base, { id: 'product', name: productName }] : base;
    }

    const currentCategory: BreadcrumbItem = {
      id: category.id,
      name: category.name,
      path: category.path
    };

    return productName ? [...base, currentCategory, { id: 'product', name: productName }] : [...base, currentCategory];
  }, [category, productName]);

  const title = productName ? productName : (category ? category.name : 'Все товары');
  const count = productName ? undefined : (category ? category.productCount : undefined);

  return (
    <div className={styles.div}>
      <nav className={styles.breadcrumbs}>
        {breadcrumbs.map((c, idx) => {
          const isLast = idx === breadcrumbs.length - 1;
          return (
            <div key={c.id + idx} className={styles.breadcrumbItem}>
              {!isLast && c.path ? (
                <NavLink to={c.path} className={styles.breadcrumbName}>
                  {c.name}
                </NavLink>
              ) : (
                <span className={styles.breadcrumbName}>{c.name}</span>
              )}
              {!isLast && <span className={styles.breadcrumbSeparator}>/</span>}
            </div>
          );
        })}
      </nav>

      <div className={styles.divFlex}>
        <h2 className={styles.title}>{title}</h2>
        {count !== undefined && <p className={styles.count}>{count} товаров</p>}
      </div>
    </div>
  );
};
