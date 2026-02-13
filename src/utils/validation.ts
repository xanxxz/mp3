export type ValidationErrors<T> = Partial<Record<keyof T, string>>;

export interface RegisterFormValues {
  email: string;
  phone: string;
  name: string;
  region: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
  agreePolicy: boolean;
}

export interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

// Твои функции проверки
export const isEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const isPhone = (value: string) =>
  /^\+?\d{10,15}$/.test(value.replace(/\D/g, ''));

export const isStrongPassword = (value: string) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);

// Валидация регистрации
export function validateRegister(
  form: RegisterFormValues
): ValidationErrors<RegisterFormValues> {
  const errors: ValidationErrors<RegisterFormValues> = {};

  if (!form.email.trim()) {
    errors.email = 'Введите email';
  } else if (!isEmail(form.email)) {
    errors.email = 'Введите корректный email';
  }

  if (!form.phone.trim()) {
    errors.phone = 'Введите номер телефона';
  } else if (!isPhone(form.phone)) {
    errors.phone = 'Введите корректный номер телефона';
  }

  if (form.name.trim().length < 3) errors.name = 'Введите полное имя';
  if (!form.region.trim()) errors.region = 'Укажите регион';

  if (!form.password.trim()) {
    errors.password = 'Введите пароль';
  } else if (!isStrongPassword(form.password)) {
    errors.password =
      'Пароль минимум 8 символов, с заглавной буквой и цифрой';
  }

  if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Пароли не совпадают';
  }

  if (!form.agreeTerms) errors.agreeTerms = 'Необходимо согласие с условиями';
  if (!form.agreePolicy)
    errors.agreePolicy = 'Требуется согласие на обработку данных';

  return errors;
}

// Валидация логина
export function validateLogin(
  form: LoginFormValues
): ValidationErrors<LoginFormValues> {
  const errors: ValidationErrors<LoginFormValues> = {};

  if (!form.email.trim()) {
    errors.email = 'Введите email или логин';
  } else if (!isEmail(form.email)) {
    errors.email = 'Введите корректный email';
  }

  if (!form.password.trim()) {
    errors.password = 'Введите пароль';
  } else if (!isStrongPassword(form.password)) {
    errors.password =
      'Пароль минимум 8 символов, с заглавной буквой и цифрой';
  }

  return errors;
}

// Валидация сброса пароля
export function validateReset(value: string): string {
  if (!value.trim()) return 'Введите email или логин';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Введите корректный email';
  return '';
}

