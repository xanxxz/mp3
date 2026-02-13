import React, { useState } from 'react';
import styles from './ResetPasswordPage.module.css';
import { Link } from 'react-router';
import { validateReset } from 'utils/validation';

export const ResetPasswordPage = () => {
  const [login, setLogin] = useState('');
  const [error, setError] = useState('');
  const [newPassword, setNewPassword] = useState<string | null>(null);

  const generatePassword = (length = 10) => {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleReset = () => {
    const err = validateReset(login);
    if (err) {
      setError(err);
      return;
    }

    const password = generatePassword();
    setNewPassword(password);
    console.log('Новый пароль:', password);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
    if (error) {
      setError(''); // убираем ошибку при изменении
    }
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Восстановление пароля</h1>

      <div className={styles.card}>
        {!newPassword ? (
          <>
            <div>
              <p className={styles.description}>
                <strong>Забыли свой пароль?</strong> Укажите свой Email или имя
                пользователя. Ссылку на создание нового пароля вы получите по
                электронной почте.
              </p>

              <label className={styles.label}>
                Email или логин <span className={styles.required}>*</span>
              </label>

              <input
                type="text"
                placeholder="Введите данные для авторизации"
                className={styles.input}
                value={login}
                onChange={handleChange}
              />
              {error && <span className={styles.error}>{error}</span>}
            </div>
            <button
              className={styles.button}
              onClick={handleReset}
              disabled={!login.trim() || !!error} // дизейбл если пустое поле или ошибка
            >
              СБРОСИТЬ ПАРОЛЬ
            </button>

          </>
        ) : (
          <>
            <p className={styles.description}>
              Ваш новый пароль:
              <strong className={styles.generatedPassword}> {newPassword}</strong>
            </p>
            <p className={styles.description}>
              Пароль также продублирован на вашу электронную почту. Попробуйте
              теперь его не потерять.
            </p>
            <Link to="/login" className={styles.darkBtn}>
              АВТОРИЗОВАТЬСЯ
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
