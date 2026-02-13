import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from 'components/UI/Header/Header';
import About from 'pages/About/About';
import styles from './App.module.css';
import { Footer } from 'components/UI/Footer/Footer';
import Main from 'pages/Main/Main';
import { CategoryPage } from 'pages/CategoryPage/CategoryPage';
import { ProductPage } from 'pages/ProductPage/ProductPage';
import { AuthPage } from 'pages/AuthPage/AuthPage';
import { RegisterPage } from 'pages/RegisterPage/RegisterPage';
import { ResetPasswordPage } from 'pages/ResetPasswordPage/ResetPasswordPage';
import { CartPage } from 'pages/CartPage/CartPage';

export default function App() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={ <Main /> } />
          <Route path="/login" element={ <AuthPage /> } />
          <Route path="/register" element={ <RegisterPage /> } />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/catalog" element={<CategoryPage />} />
          <Route path="/catalog/:categoryPath/*" element={<CategoryPage />} />
          <Route path="/products/:productId" element={<ProductPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/payment" element={<About />} />
          <Route path="/delivery" element={<About />} />
          <Route path="/returns" element={<About />} />
          <Route path="/reviews" element={<About />} />
          <Route path="/faq" element={<About />} />
          <Route path="/news" element={<About />} />
          <Route path="/contacts" element={<About />} />
          <Route path="/sale" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
