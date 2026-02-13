import { Navigate, useParams } from 'react-router-dom';
import { categories } from '../../../__mocks__/categories';
import { Breadcrumbs } from '../../components/UI/Breadcrumbs/Breadcrumbs';
import { FiltersPanel, FiltersState } from '../../components/UI/Filter/FiltersPanel';
import styles from './CategoryPage.module.css';
import { useSearchParams } from 'react-router-dom';
import  products from '../../../__mocks__/products';
import { useEffect, useMemo, useState } from 'react';
import { SortFilter, SortOption } from 'components/UI/Filter/SortFilter';
import ProductList from 'components/UI/ProductCard/ProductCard';

const sortOptions: SortOption[] = [
  { id: 'price-asc', label: 'Цена по возрастанию' },
  { id: 'price-desc', label: 'Цена по убыванию' },
];

export const CategoryPage = () => {
  const { categoryPath } = useParams<{ categoryPath: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedSort, setSelectedSort] = useState<string>(sortOptions[0].id);

  const [currentCategory, setCurrentCategory] = useState(
    categoryPath
      ? categories.find(c => c.path.endsWith(categoryPath)) ?? null
      : null
  );

  // Редирект, если categoryPath задан, но категории нет
  useEffect(() => {
    if (categoryPath && !currentCategory) {
      window.history.replaceState({}, '', '/catalog'); // пушим дефолтный путь
      setCurrentCategory(null); // пустой каталог
    }
  }, [categoryPath, currentCategory]);

  const initialFilters: FiltersState = {
    price: {
      min: searchParams.get('min') ? Number(searchParams.get('min')) : null,
      max: searchParams.get('max') ? Number(searchParams.get('max')) : null,
    },
    categoryIds: searchParams.get('cats')
      ? searchParams.get('cats')!.split(',')
      : currentCategory
        ? [currentCategory.id]
        : [],
    subcategoryIds: searchParams.get('subs')
      ? searchParams.get('subs')!.split(',')
      : [],
    brands: searchParams.get('brands')
      ? searchParams.get('brands')!.split(',')
      : [],
  };

  const handleFiltersChange = (filters: FiltersState) => {
    const params: Record<string, string> = {};

    if (filters.price.min !== null) params.min = String(filters.price.min);
    if (filters.price.max !== null) params.max = String(filters.price.max);
    if (filters.categoryIds.length) params.cats = filters.categoryIds.join(',');
    if (filters.subcategoryIds.length) params.subs = filters.subcategoryIds.join(',');
    if (filters.brands.length) params.brands = filters.brands.join(',');

    setSearchParams(params);

    // обновляем текущую категорию по radio-кнопке
    if (filters.categoryIds.length) {
      const cat = categories.find(c => c.id === filters.categoryIds[0]);
      if (cat) setCurrentCategory(cat);
    }
  };

  const filteredProducts = useMemo(() => {
     const selectedCategoryId = initialFilters.categoryIds[0];

    return products
      .filter(p => {
        const productCategory = categories.find(c => c.id === p.subcategoryId);
        return productCategory?.parentId === selectedCategoryId || p.subcategoryId === selectedCategoryId;
      })
      .filter(p => !initialFilters.price.min || p.price >= initialFilters.price.min!)
      .filter(p => !initialFilters.price.max || p.price <= initialFilters.price.max!)
      .filter(p => !initialFilters.subcategoryIds.length || initialFilters.subcategoryIds.includes(p.subcategoryId))
      .filter(p => !initialFilters.brands.length || initialFilters.brands.includes(p.brandId));
  }, [currentCategory, initialFilters]);


  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (selectedSort) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        default: return 0;
      }
    });
  }, [filteredProducts, selectedSort]);

  return (
    <div className={styles.layout}>
      <div className={styles.breadcrumbs}>
        <Breadcrumbs category={currentCategory} />
      </div>
      <div className={styles.content}>
        <FiltersPanel
          initialFilters={initialFilters}
          onFiltersChange={handleFiltersChange}
        />
        <div className={styles.contentRight}>

          <SortFilter
            options={sortOptions}
            selectedId={selectedSort}
            onChange={setSelectedSort}
          />
          <div className={styles.products}>
            {sortedProducts.length > 0 ? (
              sortedProducts.map(product => (
                <ProductList key={product.id} product={product} inStock={product.inStock}/>
              ))
            ) : (
              <p>Товары не найдены</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
