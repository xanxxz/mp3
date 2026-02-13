import React from 'react';
import styles from './radioFilter.module.css';

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
};

export const RadioFilter: React.FC<RadioFilterProps> = ({
  title,
  options,
  selectedId,
  onChange,
}) => {
  const handleChange = (id: string) => {
    onChange(id);
  };

  const handleReset = () => {
    onChange('');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span>{title}</span>
      </div>

      <div className={styles.list}>
        {options.map(opt => (
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
