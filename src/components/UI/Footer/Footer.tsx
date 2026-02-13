import styles from './footer.module.css';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/Logo.svg?react';
import Visa from '../../../assets/visa.svg?react';
import Mastercard from '../../../assets/mastercard.svg?react';
import Sber from '../../../assets/sber.svg?react';
import Mir from '../../../assets/mir.svg?react';
import Halva from '../../../assets/halva.svg?react';
import Tinkoff from '../../../assets/tinkoff.svg?react';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Верхняя часть: логотип и контакты */}
      <div className={styles.top}>
        <div className={styles.logoSection}>
          <Logo />
          <span>ООО «Стройоптторг»</span>
        </div>

        <div className={styles.contacts}>
          <div>
            <span>ИНН: 0901051787</span>
            <span>КПП: 090101001</span>
          </div>
          <div>
            <span>Email:</span>
            <a href="mailto:info@stroiopttorg.ru">info@stroiopttorg.ru</a>
          </div>
          <div>
            <span className={styles.tel}>
              <a className={styles.phone} href="tel:88004440065">
                8 800 444 00 65
              </a>
            </span>
            <span>Ежедневно, с 8:00 до 18:00</span>
          </div>
        </div>
      </div>

      {/* Сетка ссылок */}
      <div className={styles.linksSection}>
        <div className={styles.column}>
          <h4>Информация</h4>
          <div className={styles.grid}>
            <Link to="/about">О компании</Link>
            <Link to="/payment">Оплата</Link>
            <Link to="/delivery">Доставка</Link>
            <Link to="/returns">Возврат</Link>
            <Link to="/reviews">Отзывы</Link>
            <Link to="/login">Вход / Регистрация</Link>
            <Link to="/delivery">Вопрос-ответ</Link>
            <Link to="/returns">Новости</Link>
            <Link to="/reviews">Контакты</Link>
            <Link to="/sale">Все акции</Link>
          </div>
        </div>

        <div className={styles.column}>
          <h4>Каталог</h4>
          <div className={styles.grid}>
            <Link to="/catalog/materials">Общестроительные материалы</Link>
            <Link to="/catalog/sauna">Все для сауны и бани</Link>
            <Link to="/catalog/tools">Инструмент</Link>
            <Link to="/catalog/finishing">Отделочные материалы</Link>
            <Link to="/catalog/home-garden">Товары для дома, сада и огорода</Link>
            <Link to="/catalog/electro">Электротовары</Link>
            <Link to="/catalog/plumbing">Сантехника</Link>
            <Link to="/catalog/carpentry">Столярные изделия</Link>
            <Link to="/catalog/safety">Спецодежда и средства индивидуальной защиты</Link>
            <Link to="/catalog/heating">Водо-газоснабжение, отопление, вентиляция</Link>
          </div>
        </div>
      </div>

      {/* Нижняя часть: платежи и подписка */}
      <div className={styles.bottom}>
        <div className={styles.payment}>
          <span>Мы принимаем к оплате:</span>
          <div className={styles.paymentMethod}>
            <Visa />
            <Mastercard />
            <Sber />
            <Mir />
            <Halva />
            <Tinkoff />
          </div>
        </div>
      </div>

      {/* Мелкий текст */}
      <div className={styles.copy}>
        <span>© 2006-2026 Интернет-магазин ООО «Стройоптторг»</span>
        <span>Разработка сайта: <a href="https://t.me/sssvam2">Даниил Дейнега</a></span>
        <Link to="/privacy">Политика конфиденциальности</Link>
      </div>
    </footer>
  );
};
