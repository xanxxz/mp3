import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../utils/store';
import { FiSearch, FiUser, FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import Logo from '../../../assets/Logo.svg?react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { CatalogMenu } from '../CatalogMenu/CatalogMenu';
import styles from './header.module.css';
import { fetchAllProducts, Product } from 'shared/api';
import Loader from '../Loader/Loader';

export const Header = () => {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    setLoading(true);
    fetchAllProducts()
      .then(data => {
        setProducts(data);
      })
      .catch(err => console.error('Ошибка загрузки продуктов:', err))
      .finally(() => setLoading(false));
  }, []);

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
        {/* навигация */}
      </div>

      <div className={styles.bottom}>
        <div className={styles.logo}>
          <Link to="/"><Logo /></Link>
        </div>

        <button
          className={`${styles.catalog} ${isCatalogOpen ? styles.catalogOpen : ''}`}
          onClick={() => setIsCatalogOpen(prev => !prev)}
        >
          {isCatalogOpen ? <FiX /> : <FiMenu />} Каталог
        </button>

        <div className={styles.search}>
          <input
            type="text"
            value={query}
            onChange={e => handleChange(e.target.value)}
            placeholder="Найти товар. Например: Дрель Bosch"
          />
          <button><FiSearch /></button>

          {loading ? ( // показываем лоадер пока продукты загружаются
            <div className={styles.loaderWrapper}>
              <Loader size={30} color="#4f46e5" />
            </div>
          ) : (
            showResults && results.length > 0 && (
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
            )
          )}
        </div>

        <div className={styles.actions}>
          {localStorage.getItem('token') ? (
            <NavLink to="/profile" className={({ isActive }) => isActive ? `${styles.link} ${styles.activeG}` : styles.link}>
              <div className={styles.actionItem}><FiUser /><span>Профиль</span></div>
            </NavLink>
          ) : (
            <NavLink to="/login" className={({ isActive }) => isActive ? `${styles.link} ${styles.activeG}` : styles.link}>
              <div className={styles.actionItem}><FiUser /><span>Войти</span></div>
            </NavLink>
          )}

          <NavLink to="/cart" className={({ isActive }) => isActive ? `${styles.link} ${styles.activeG}` : styles.link}>
            <div className={styles.actionItemCart}>
              <FiShoppingCart className={styles.linkCart} />
              {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
              <span>Корзина</span>
            </div>
          </NavLink>
        </div>
      </div>

      {isCatalogOpen && <CatalogMenu isOpen={isCatalogOpen} onClose={() => setIsCatalogOpen(false)} />}
    </header>
  );
};
