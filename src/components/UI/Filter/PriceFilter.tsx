import React from 'react';
import styles from './PriceFilter.module.css';

type PriceFilterProps = {
  min: number;
  max: number;
  valueMin: number | null;
  valueMax: number | null;
  onChange: (nextMin: number | null, nextMax: number | null) => void;
};

export const PriceFilter: React.FC<PriceFilterProps> = ({
  min,
  max,
  valueMin,
  valueMax,
  onChange,
}) => {
  const currentMin = valueMin ?? min;
  const currentMax = valueMax ?? max;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(e.target.value);
    if (newMin <= currentMax) onChange(newMin, valueMax);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value);
    if (newMax >= currentMin) onChange(valueMin, newMax);
  };

  const handleReset = () => {
    onChange(null, null);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.title}>Цена, ₽</span>
        <button type="button" onClick={handleReset} className={styles.reset}>
          Сбросить
        </button>
      </div>

      <div className={styles.values}>
        <span className={styles.value}>от {currentMin.toLocaleString()}</span>
        <span className={styles.value}>до {currentMax.toLocaleString()}</span>
      </div>

      <div className={styles.sliderWrapper}>
        <input
          type="range"
          min={min}
          max={max}
          value={currentMin}
          onChange={handleMinChange}
          className={`${styles.slider} ${styles.sliderMin}`}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={currentMax}
          onChange={handleMaxChange}
          className={`${styles.slider} ${styles.sliderMax}`}
        />
        <div
          className={styles.rangeTrack}
          style={{
            left: `${((currentMin - min) / (max - min)) * 100}%`,
            right: `${100 - ((currentMax - min) / (max - min)) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};
