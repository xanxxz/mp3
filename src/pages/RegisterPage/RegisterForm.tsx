import styles from './RegisterPage.module.css';
import { useFormValidation } from '../../hooks/useFormValidation';
import { validateRegister } from '../../utils/validation';

export const RegisterForm = () => {
  const {
    values: form,
    errors,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    shouldShowError,
  } = useFormValidation(
    {
      email: '',
      phone: '',
      name: '',
      region: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false,
      agreePolicy: false,
    },
    validateRegister
  );

  const onSubmit = (data: typeof form) => {
    console.log('REGISTER DATA:', data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.row}>
        <label>
          Email *
          <input
            type="email"
            value={form.email}
            onChange={e => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
          />
          {shouldShowError('email') && (
            <span className={styles.error}>{shouldShowError('email')}</span>
          )}
        </label>

        <label>
          Номер телефона *
          <input
            type="tel"
            value={form.phone}
            onChange={e => handleChange('phone', e.target.value)}
            onBlur={() => handleBlur('phone')}
          />
          {shouldShowError('phone') && (
            <span className={styles.error}>{shouldShowError('phone')}</span>
          )}
        </label>
      </div>

      <label>
        ФИО *
        <input
          type="text"
          value={form.name}
          onChange={e => handleChange('name', e.target.value)}
          onBlur={() => handleBlur('name')}
        />
        {shouldShowError('name') && (
          <span className={styles.error}>{shouldShowError('name')}</span>
        )}
      </label>

      <label>
        Регион *
        <input
          type="text"
          value={form.region}
          onChange={e => handleChange('region', e.target.value)}
          onBlur={() => handleBlur('region')}
        />
        {shouldShowError('region') && (
          <span className={styles.error}>{shouldShowError('region')}</span>
        )}
      </label>

      <label>
        Пароль *
        <input
          type="password"
          value={form.password}
          onChange={e => handleChange('password', e.target.value)}
          onBlur={() => handleBlur('password')}
        />
        {shouldShowError('password') && (
          <span className={styles.error}>{shouldShowError('password')}</span>
        )}
      </label>

      <label>
        Подтвердите пароль *
        <input
          type="password"
          value={form.confirmPassword}
          onChange={e => handleChange('confirmPassword', e.target.value)}
          onBlur={() => handleBlur('confirmPassword')}
        />
        {shouldShowError('confirmPassword') && (
          <span className={styles.error}>{shouldShowError('confirmPassword')}</span>
        )}
      </label>

      <label className={styles.checkbox}>
        <input
          type="checkbox"
          checked={form.agreeTerms}
          onChange={e => handleChange('agreeTerms', e.target.checked)}
          onBlur={() => handleBlur('agreeTerms')}
          className={styles.checkboxInput}
        />
        Согласен с условиями обслуживания
        {shouldShowError('agreeTerms') && (
          <span className={styles.error}>{shouldShowError('agreeTerms')}</span>
        )}
      </label>

      <label className={styles.checkbox}>
        <input
          type="checkbox"
          checked={form.agreePolicy}
          onChange={e => handleChange('agreePolicy', e.target.checked)}
          onBlur={() => handleBlur('agreePolicy')}
          className={styles.checkboxInput}
        />
        Согласен на обработку персональных данных
        {shouldShowError('agreePolicy') && (
          <span className={styles.error}>{shouldShowError('agreePolicy')}</span>
        )}
      </label>

      <button type="submit" className={styles.primaryBtn} disabled={!isValid}>
        ЗАРЕГИСТРИРОВАТЬСЯ
      </button>
    </form>
  );
};
