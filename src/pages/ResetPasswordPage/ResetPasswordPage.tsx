import React, { useState } from 'react';
import styles from './ResetPasswordPage.module.css';
import { Link } from 'react-router';
import { validateReset } from 'utils/validation';
import { resetPassword } from 'shared/api';

export const ResetPasswordPage = () => {
  const [login, setLogin] = useState('');
  const [error, setError] = useState('');
  const [newPassword, setNewPassword] = useState<string | null>(null);

  function generatePassword(length = 8): string {
      const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const lower = 'abcdefghijklmnopqrstuvwxyz';
      const digits = '0123456789';
      const all = upper + lower + digits;

      let password = '';
      // гарантируем хотя бы одну заглавную и одну цифру
      password += upper[Math.floor(Math.random() * upper.length)];
      password += digits[Math.floor(Math.random() * digits.length)];

      for (let i = 2; i < length; i++) {
          password += all[Math.floor(Math.random() * all.length)];
      }

      // перемешиваем, чтобы первые символы не были всегда заглавная + цифра
      password = password.split('').sort(() => 0.5 - Math.random()).join('');

      return password;
  }

  const newPasswordD = generatePassword(10);

  const handleReset = async () => {
    try {
      await resetPassword(login);
      alert('Пароль сброшен, проверьте email');
      setNewPassword(newPasswordD); // можно убрать, если хочешь показывать реальный
    } catch (err: any) {
      console.error('Ошибка сброса пароля:', err.message);
      setError(err.message);
    }
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
