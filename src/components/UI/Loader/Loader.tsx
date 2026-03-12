import React from 'react';
import styles from './Loader.module.css';

interface LoaderProps {
  size?: number;
  color?: string;
  fullscreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ size = 50, color = '#4f46e5', fullscreen = false }) => {
  return (
    <div className={fullscreen ? styles.overlay : undefined}>
      <div
        className={styles.loader}
        style={{
          width: size,
          height: size,
          borderColor: `${color} transparent transparent transparent`,
        }}
      />
    </div>
  );
};

export default Loader;
