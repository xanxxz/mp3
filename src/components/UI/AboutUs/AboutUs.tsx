import { Link } from 'react-router-dom';
import styles from './aboutUs.module.css';
import about from '../../../assets/about.png';

export const AboutUs = () => {
  return (
    <section className={styles.section}>
      <div className={styles.textBox}>
        <h3 className={styles.title}>О нашем магазине</h3>
        <p className={styles.firstText}>
          Цель и главная задача компании - создать сервис,
          который не ограничится продажей строительных и отделочных материалов,
          а будет решать задачи и трудности, с которыми сталкиваются люди во время ремонта.
        </p>
        <div>
          <ul className={styles.metrika}>
            <li className={styles.listItem}>
              <span className={styles.span}>17 805,3 м²</span>
              <p className={styles.listItemText}>торговых и складских помещений</p>
            </li>
            <li className={styles.listItem}>
              <span className={styles.span}>50 000+</span>
              <p className={styles.listItemText}>наименований товара</p>
            </li>
            <li className={styles.listItem}>
              <span className={styles.span}>2 500+</span>
              <p className={styles.listItemText}>постоянных клиентов</p>
            </li>
            <li className={styles.listItem}>
              <span className={styles.span}>440</span>
              <p className={styles.listItemText}>опытных сотрудников</p>
            </li>
          </ul>
        </div>
        <p className={styles.secontText}>
          Уже второе десятилетие мы готовы воплотить в реальность Вашу мечту о красивом,
          комфортабельном доме, благоустроенном современном офисе, уютной теплой даче,
          помочь реализовать любые строительные и дизайнерские фантазии и с минимальными затратами времени и денежных средств.
        </p>
        <Link to="/about" className={styles.button}>
          Подробнее о компании
        </Link>
      </div>
      <div className={styles.imgBox}>
        <img src={about} className={styles.img}/>
      </div>
    </section>
  );
};
