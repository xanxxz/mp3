import React, { useMemo } from 'react';
import styles from './CheckboxFilter.module.css';
import type { ProductData } from 'types/types';

export interface CheckboxOption {
  id: string;
  label: string;
  count?: number;
}

type CheckboxFilterProps = {
  title: string;
  options: CheckboxOption[];
  selectedIds: string[];
  onChange: (next: string[]) => void;
  products: ProductData[]; // все товары, на основе которых считаем count
  getCount?: (optionId: string, products: ProductData[]) => number; // функция подсчёта
};

export const CheckboxFilter: React.FC<CheckboxFilterProps> = ({
  title,
  options,
  selectedIds,
  onChange,
  products,
  getCount = (id, products) => products.filter(p => p.subcategoryId === id).length
}) => {
  const toggle = (id: string) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((x) => x !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  const handleReset = () => onChange([]);

  // динамически считаем count для каждого option
  const optionsWithCounts = useMemo(() => {
    return options.map(opt => ({
      ...opt,
      count: getCount(opt.id, products)
    }));
  }, [options, products, getCount]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        <button type="button" onClick={handleReset} className={styles.reset}>
          Сбросить
        </button>
      </div>

      <div className={styles.list}>
        {optionsWithCounts.map(opt => {
          const checked = selectedIds.includes(opt.id);
          return (
            <label key={opt.id} className={styles.item}>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(opt.id)}
                className={styles.checkbox}
              />
              <span className={`${styles.label} ${checked ? styles.checked : ''}`}>
                {opt.label}
                {typeof opt.count === 'number' && (
                  <span className={styles.count}> ({opt.count})</span>
                )}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};
