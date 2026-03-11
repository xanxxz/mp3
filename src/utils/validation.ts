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

export interface CheckoutFormValues {
  name: string;
  phone: string;
  address: string;
  comment: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export const isCardNumber = (value: string) =>
  /^\d{16}$/.test(value.replace(/\s/g, ''));

export const isExpiry = (value: string) =>
  /^(0[1-9]|1[0-2])\/\d{2}$/.test(value);

export const isCVV = (value: string) =>
  /^\d{3}$/.test(value);

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


export function validateCheckout(
  form: CheckoutFormValues
): ValidationErrors<CheckoutFormValues> {
  const errors: ValidationErrors<CheckoutFormValues> = {};

  if (form.name.trim().length < 2) {
    errors.name = 'Введите имя';
  }

  if (!form.phone.trim()) {
    errors.phone = 'Введите телефон';
  } else if (!isPhone(form.phone)) {
    errors.phone = 'Некорректный номер телефона';
  }

  if (!form.address.trim()) {
    errors.address = 'Введите адрес доставки';
  }

  if (!form.cardNumber.trim()) {
    errors.cardNumber = 'Введите номер карты';
  } else if (!isCardNumber(form.cardNumber)) {
    errors.cardNumber = 'Номер карты должен содержать 16 цифр';
  }

  if (!form.expiry.trim()) {
    errors.expiry = 'Введите срок действия';
  } else if (!isExpiry(form.expiry)) {
    errors.expiry = 'Формат MM/YY';
  }

  if (!form.cvv.trim()) {
    errors.cvv = 'Введите CVV';
  } else if (!isCVV(form.cvv)) {
    errors.cvv = 'CVV должен содержать 3 цифры';
  }

  return errors;
}
