import { NavLink } from 'react-router-dom';
import styles from './catalogMenu.module.css';
import { useEffect } from 'react';
import categoriesData from '../../../data/categories.json';
import { Category } from 'types/types';

type CatalogMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CatalogMenu = ({ isOpen, onClose }: CatalogMenuProps) => {
  const categories: Category[] = categoriesData;

  // Формируем структуру с детьми
  const catalogRoot: (Category & { children: Category[] }) | null = (() => {
    const root = categories.find(c => c.id === '1');
    if (!root) return null;
    const children = categories.filter(c => c.parentId === root.id);
    return { ...root, children };
  })();

  // Блокируем скролл страницы при открытом меню
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className={styles.wrapper} onClick={onClose}>
      <div
        className={`${styles.menu} ${isOpen ? styles.menuOpen : ''}`}
        onClick={e => e.stopPropagation()}
      >
        <div className={styles.grid}>
          {catalogRoot && catalogRoot.children.length ? (
            <ul className={styles.categoryList}>
              {catalogRoot.children.map(category => (
                <li key={category.id} className={styles.columnTitle}>
                  <NavLink
                    to={category.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      [styles.link, isActive ? styles.active : ''].join(' ')
                    }
                  >
                    {category.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>Категории не найдены</p>
          )}
        </div>
      </div>
    </div>
  );
};
