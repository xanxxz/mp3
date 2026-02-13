import React from 'react';
import styles from './sortFilter.module.css';

export type SortOption = {
  id: string;
  label: string;
};

type SortFilterProps = {
  options: SortOption[];
  selectedId: string;
  onChange: (id: string) => void;
};

export const SortFilter: React.FC<SortFilterProps> = ({
  options,
  selectedId,
  onChange,
}) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>Сортировка:</span>
      <div className={styles.options}>
        {options.map((opt) => (
          <button
            key={opt.id}
            className={`${styles.option} ${selectedId === opt.id ? styles.active : ''}`}
            onClick={() => onChange(opt.id)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};
