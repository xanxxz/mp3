import styles from './header.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../utils/store';
import {
  FiSearch,
  FiUser,
  FiShoppingCart,
  FiMenu,
  FiX
} from 'react-icons/fi';
import Logo from '../../../assets/Logo.svg?react';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { CatalogMenu } from '../CatalogMenu/CatalogMenu';
import { useNavigate } from 'react-router-dom';
import products from '../../../../__mocks__/products';


export const Header = () => {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(products);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleChange = (value: string) => {
    setQuery(value);

    if (!value.trim()) {
      setShowResults(false);
      return;
    }

    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(value.toLowerCase())
    );

    setResults(filtered);
    setShowResults(true);
  };

  const handleSelect = (id: string) => {
    setShowResults(false);
    setQuery('');
    navigate(`/products/${id}`);
  };


  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <nav className={styles.nav}>
          <NavLink to="/about"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            О компании
          </NavLink>
          <NavLink to="/payment"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Оплата
          </NavLink>
          <NavLink to="/delivery"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Доставка
          </NavLink>
          <NavLink to="/returns"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Возврат
          </NavLink>
          <NavLink to="/reviews"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Отзывы
          </NavLink>
          <NavLink to="/faq"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Вопрос-ответ
          </NavLink>
          <NavLink to="/news"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Новости
          </NavLink>
          <NavLink to="/contacts"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Контакты
          </NavLink>
        </nav>

        <div className={styles.contacts}>
          <span>Ежедневно, с 8:00 до 20:00</span>
          <a className={styles.phone} href="tel:88004440065">
            8 800 444 00 65
          </a>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.logo}>
          <Link to="/">
            <Logo />
          </Link>
        </div>

        <button
          className={`${styles.catalog} ${
            isCatalogOpen ? styles.catalogOpen : ''
          }`}
          onClick={() => setIsCatalogOpen(prev => !prev)}
        >
          {isCatalogOpen ? <FiX /> : <FiMenu />}
          Каталог
        </button>

        <div className={styles.search}>
          <input
            type="text"
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Найти товар. Например: Дрель Bosch"
          />
          <button>
            <FiSearch />
          </button>

          {showResults && results.length > 0 && (
            <div className={styles.searchResults}>
              {results.slice(0, 5).map(product => (
                <div
                  key={product.id}
                  className={styles.searchItem}
                  onClick={() => handleSelect(product.id)}
                >
                  <img src={product.images?.[0]} alt={product.name} />
                  <span>{product.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.actions}>
          <NavLink to="/login"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.activeG}` : styles.link
            }
          >
            <div className={styles.actionItem}>
              <FiUser />
              <span>Войти</span>
            </div>
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.activeG}` : styles.link
            }
          >
            <div className={styles.actionItemCart}>
              <FiShoppingCart className={styles.linkCart} />
              {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
              <span>Корзина</span>
            </div>
          </NavLink>

        </div>
      </div>
      {isCatalogOpen && (
        <CatalogMenu isOpen={isCatalogOpen} onClose={() => setIsCatalogOpen(false)} />
      )}
    </header>
  );
};
