import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from './brandCarousel.module.css';

import brand1 from '../../../assets/brand1.png';
import brand2 from '../../../assets/brand2.png';
import brand3 from '../../../assets/brand3.png';
import brand4 from '../../../assets/brand4.png';
import brand5 from '../../../assets/brand5.png';
import brand6 from '../../../assets/brand6.png';
import brand7 from '../../../assets/brand7.png';

const brands = [
  {
    id: 1,
    image: brand1,
  },
  {
    id: 2,
    image: brand2,
  },
  {
    id: 3,
    image: brand3,
  },
    {
    id: 4,
    image: brand4,
  },
    {
    id: 5,
    image: brand5,
  },
    {
    id: 6,
    image: brand6,
  },
    {
    id: 7,
    image: brand7,
  },
];

export const BrandCarousel = () => {
  return (
    <section className={styles.hero}>
      <h2>
        Популярные бренды
      </h2>
      <div className={styles.cards}>
        {brands.map(slide => (
          <div className={styles.div} key={slide.id}>
            <img
              src={slide.image}
              className={styles.slide}
            >
            </img>
          </div>
        ))}
      </div>
    </section>
  );
};
