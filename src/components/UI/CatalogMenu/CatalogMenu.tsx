import { NavLink } from 'react-router-dom';
import styles from './catalogMenu.module.css';
import { useEffect, useState } from 'react';
import { RawCategory as Category, fetchAllCategories } from '../../../shared/api'; // твой файл с fetch
import Loader from '../Loader/Loader';

type CatalogMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CatalogMenu = ({ isOpen, onClose }: CatalogMenuProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Получаем категории с сервера
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const data = await fetchAllCategories();
        setCategories(data);
      } catch (err: any) {
        setError(err.message || 'Ошибка загрузки категорий');
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

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

  if (loading) return <Loader fullscreen />;
  if (error) return <p>{error}</p>;

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
