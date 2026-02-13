import { Link } from 'react-router-dom';
import styles from './miniCatalog.module.css';
import { categories, type Category } from '../../../../__mocks__/categories';
import img1 from '../../../assets/img1.png';
import img2 from '../../../assets/img2.png';
import img3 from '../../../assets/img3.png';
import img4 from '../../../assets/img4.png';
import img5 from '../../../assets/img5.png';
import img6 from '../../../assets/img6.png';
import img7 from '../../../assets/img7.png';
import img8 from '../../../assets/img8.png';

const categoryImages: Record<string, string> = {
  '2': img3,
  '3': img2,
  '4': img7,
  '5': img6,
  '6': img4,
  '7': img8,
  '8': img5,
};

export const MiniCatalog = () => {
  // Берем только верхние категории (у которых parentId === '1')
  const rootCategories: Category[] = categories
    .filter(cat => cat.parentId === '1')
    .slice(0, 8);

  // Карточка "Перейти в каталог"
  const catalogCard: Category & { img: string } = {
    id: 'catalog',
    name: 'Перейти в каталог',
    path: '/catalog',
    productCount: 0,
    img: img1,
  };

  return (
    <section className={styles.catalogSection}>
      <div className={styles.grid}>
        {/* Карточка "Перейти в каталог" */}
        <Link to={catalogCard.path} key={catalogCard.id} className={styles.card}>
          <img src={catalogCard.img} alt={catalogCard.name} />
          <span>{catalogCard.name}</span>
        </Link>

        {/* Остальные категории */}
        {rootCategories.map(cat => (
          <Link to={cat.path} key={cat.id} className={styles.card}>
            <img src={categoryImages[cat.id] || img1} alt={cat.name} />
            <span>{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};
