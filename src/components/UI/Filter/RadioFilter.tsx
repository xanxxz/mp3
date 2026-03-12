import React, { useMemo } from 'react';
import styles from './radioFilter.module.css';
import type { ProductData } from 'types/types';

export interface RadioOption {
  id: string;
  label: string;
  count?: number;
}

type RadioFilterProps = {
  title: string;
  options: RadioOption[];
  selectedId: string | null;
  onChange: (id: string) => void;
  products: ProductData[]; // список товаров для подсчёта
  getCount?: (optionId: string, products: ProductData[]) => number; // кастомная функция подсчёта
};

export const RadioFilter: React.FC<RadioFilterProps> = ({
  title,
  options,
  selectedId,
  onChange,
  products,
  getCount = (id, products) => products.filter(p => p.subcategoryId === id).length
}) => {
  const handleChange = (id: string) => {
    onChange(id);
  };

  const optionsWithCounts = useMemo(() => {
    return options.map(opt => ({
      ...opt,
      count: getCount(opt.id, products)
    }));
  }, [options, products, getCount]);

  const handleReset = () => {
    onChange('');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span>{title}</span>
        <button type="button" onClick={handleReset} className={styles.reset}>
          Сбросить
        </button>
      </div>

      <div className={styles.list}>
        {optionsWithCounts.map(opt => (
          <label key={opt.id} className={styles.item}>
            <input
              type="radio"
              name={title}
              checked={selectedId === opt.id}
              onChange={() => handleChange(opt.id)}
            />
            <span className={styles.label}>
              {opt.label}
              {typeof opt.count === 'number' && (
                <span className={styles.count}> ({opt.count})</span>
              )}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};
