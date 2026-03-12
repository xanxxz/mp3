import React, { useEffect, useState, useMemo } from 'react';
import styles from './FiltersPanel.module.css';
import { PriceFilter } from './PriceFilter';
import { CheckboxFilter } from './CheckboxFilter';
import { RadioFilter } from './RadioFilter';
import productsData from '../../../data/products.json';
import brandsData from '../../../data/brands.json';
import categoriesData from '../../../data/categories.json';
import { ProductData, Brand, Category } from 'types/types';

export interface FiltersState {
  price: { min: number | null; max: number | null };
  categoryIds: string[];
  subcategoryIds: string[];
  brands: string[];
}

type FiltersPanelProps = {
  initialFilters: FiltersState;
  onFiltersChange?: (filters: FiltersState) => void;
  products: ProductData[];
  categories: Category[];
};

export const FiltersPanel: React.FC<FiltersPanelProps> = ({
  initialFilters,
  onFiltersChange,
  products,
  categories
}) => {
  const [filters, setFilters] = useState<FiltersState>(initialFilters);

  useEffect(() => setFilters(initialFilters), [initialFilters]);

  const topCategories = categories.filter(c => c.parentId === '1' && c.id !== '1');
  const subCategories = categories.filter(c => c.parentId === filters.categoryIds[0]);

  // бренды остаются локальные
  const brandOptions = useMemo(() => {
    const selectedCatId = filters.categoryIds[0];
    const selectedSubIds = filters.subcategoryIds;

    const filteredProducts: ProductData[] = products.filter(p => {
      if (selectedSubIds.length) return selectedSubIds.includes(p.subcategoryId);
      if (selectedCatId) {
        const subCat = categories.find(c => c.id === p.subcategoryId);
        return subCat?.parentId === selectedCatId;
      }
      return true;
    });

    const map: Record<string, { label: string; count: number }> = {};
    filteredProducts.forEach(p => {
      const brand = brandsData.find(b => b.id === p.brandId);
      if (!brand) return;
      if (!map[p.brandId]) map[p.brandId] = { label: brand.name, count: 1 };
      else map[p.brandId].count += 1;
    });

    return Object.entries(map).map(([id, { label, count }]) => ({ id, label, count }));
  }, [filters.categoryIds, filters.subcategoryIds, products, categories]);

  const updateFilters = (next: FiltersState) => {
    setFilters(next);
    onFiltersChange?.(next);
  };

  return (
    <aside className={styles.panel}>
      <PriceFilter
        min={0}
        max={50000}
        valueMin={filters.price.min}
        valueMax={filters.price.max}
        onChange={(min, max) => updateFilters({ ...filters, price: { min, max } })}
      />

      <RadioFilter
        title="Категории"
        options={topCategories.map(c => ({ id: c.id, label: c.name }))}
        selectedId={filters.categoryIds[0] || ''}
        onChange={id => updateFilters({ ...filters, categoryIds: id ? [id] : [], subcategoryIds: [] })}
        products={products} // серверные продукты
        getCount={(id, products) =>
          products.filter(p => {
            const subCat = categories.find(c => c.id === p.subcategoryId); // серверные категории
            return p.subcategoryId === id || subCat?.parentId === id;
          }).length
        }
      />

      <CheckboxFilter
        title="Подкатегории"
        options={subCategories.map(c => ({ id: c.id, label: c.name }))}
        selectedIds={filters.subcategoryIds}
        onChange={ids => updateFilters({ ...filters, subcategoryIds: ids })}
        products={products} // серверные продукты
        getCount={(id, products) => products.filter(p => p.subcategoryId === id).length}
      />

      <CheckboxFilter
        title="Бренды"
        options={brandOptions.map(b => ({ id: b.id, label: b.label }))}
        selectedIds={filters.brands}
        onChange={ids => updateFilters({ ...filters, brands: ids })}
        products={products.filter(p => {
          if (filters.subcategoryIds.length) return filters.subcategoryIds.includes(p.subcategoryId);
          if (filters.categoryIds.length) {
            const subCat = categories.find(c => c.id === p.subcategoryId);
            return subCat?.parentId === filters.categoryIds[0];
          }
          return true;
        })} // серверные продукты
        getCount={(id, products) => products.filter(p => p.brandId === id).length}
      />
    </aside>
  );
};
