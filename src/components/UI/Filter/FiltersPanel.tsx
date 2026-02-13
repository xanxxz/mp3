import React, { useEffect, useState, useMemo } from 'react';
import styles from './FiltersPanel.module.css';
import { PriceFilter } from './PriceFilter';
import { CheckboxFilter } from './CheckboxFilter';
import { RadioFilter } from './RadioFilter';
import { RawCategory } from '../../../shared/api';
import productsMock, { ProductData } from '../../../../__mocks__/products';
import { brands as brandsMock } from '../../../../__mocks__/brands';
import { categories as categoriesMock } from '../../../../__mocks__/categories';

export interface FiltersState {
  price: { min: number | null; max: number | null };
  categoryIds: string[];
  subcategoryIds: string[];
  brands: string[];
}

type FiltersPanelProps = {
  initialFilters: FiltersState;
  onFiltersChange?: (filters: FiltersState) => void;
};

export const FiltersPanel: React.FC<FiltersPanelProps> = ({
  initialFilters,
  onFiltersChange,
}) => {
  const [filters, setFilters] = useState<FiltersState>(initialFilters);

  useEffect(() => setFilters(initialFilters), [initialFilters]);

  const topCategories = categoriesMock.filter(c => c.parentId === '1' && c.id !== '1');
  const subCategories = categoriesMock.filter(c => c.parentId === filters.categoryIds[0]);

  // Бренды фильтруются по выбранной категории/подкатегории и мокам продуктов
  const brandOptions = useMemo(() => {
    const selectedCatId = filters.categoryIds[0];
    const selectedSubIds = filters.subcategoryIds;

    const filteredProducts: ProductData[] = productsMock.filter(p => {
      if (selectedSubIds.length) return selectedSubIds.includes(p.subcategoryId);
      if (selectedCatId) {
        const subCat = categoriesMock.find(c => c.id === p.subcategoryId);
        return subCat?.parentId === selectedCatId;
      }
      return true;
    });

    // считаем бренды и количество товаров
    const map: Record<string, { label: string; count: number }> = {};
    filteredProducts.forEach(p => {
      const brand = brandsMock.find(b => b.id === p.brandId);
      if (!brand) return;
      if (!map[p.brandId]) map[p.brandId] = { label: brand.name, count: 1 };
      else map[p.brandId].count += 1;
    });

    return Object.entries(map).map(([id, { label, count }]) => ({ id, label, count }));
  }, [filters.categoryIds, filters.subcategoryIds]);

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
        options={topCategories.map(c => ({
          id: c.id,
          label: c.name,
          count: c.productCount,
        }))}
        selectedId={filters.categoryIds[0] || ''}
        onChange={id => updateFilters({ ...filters, categoryIds: id ? [id] : [], subcategoryIds: [] })}
      />

      {subCategories.length > 0 && (
        <CheckboxFilter
          title="Подкатегории"
          options={subCategories.map(c => ({
            id: c.id,
            label: c.name,
            count: c.productCount,
          }))}
          selectedIds={filters.subcategoryIds}
          onChange={ids => updateFilters({ ...filters, subcategoryIds: ids })}
        />
      )}

      {brandOptions.length > 0 && (
        <CheckboxFilter
          title="Бренды"
          options={brandOptions}
          selectedIds={filters.brands}
          onChange={ids => updateFilters({ ...filters, brands: ids })}
        />
      )}
    </aside>
  );
};
