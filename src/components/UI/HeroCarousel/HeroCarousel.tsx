import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from './heroCarousel.module.css';
import slide1 from '../../../assets/one.png';
import slide2 from '../../../assets/two.png';

import {
  FiDivideCircle,
  FiCreditCard,
  FiList,
  FiBox
} from 'react-icons/fi';
import { Link } from 'react-router';

const slides = [
  {
    id: 1,
    title: 'Инструменты для дома и профи',
    text: 'Более 50 000 товаров в наличии',
    image: slide1,
  },
  {
    id: 2,
    title: 'Скидки до 40%',
    text: 'На популярные бренды',
    image: slide2,
  },
  {
    id: 3,
    title: 'Быстрая доставка',
    text: 'По всей России от 1 дня',
    image: slide1,
  },
];

export const HeroCarousel = () => {
  return (
    <section className={styles.hero}>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className={styles.swiper}
      >
        {slides.map(slide => (
          <SwiperSlide key={slide.id}>
            <div
              className={styles.slide}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className={styles.content}>
                <h1>{slide.title}</h1>
                <p>{slide.text}</p>
                  <Link to="/catalog" className={styles.catalogButton}>
                    Перейти в каталог
                  </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.stroke}>
        <div className={styles.strokeItem}>
          <FiCreditCard className={styles.icon}/>
          <span>Оплата любым удобным способом</span>
        </div>
        <div className={styles.strokeItem}>
          <FiList className={styles.icon}/>
          <span>Большой выбор товаров в каталоге</span>
        </div>
        <div className={styles.strokeItem}>
          <FiBox className={styles.icon}/>
          <span>Осуществляем быструю доставку</span>
        </div>
        <div className={styles.strokeItem}>
          <FiDivideCircle className={styles.icon}/>
          <span>Делаем скидки на крупные покупки</span>
        </div>
      </div>
    </section>
  );
};
