import { useState } from 'react';
import { ValidationErrors } from 'utils/validation';

export function useFormValidation<T extends Record<string, any>>(
  initialState: T,
  validate: (values: T) => ValidationErrors<T>
) {
  const [values, setValues] = useState<T>(initialState);
  const [errors, setErrors] = useState<ValidationErrors<T>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const runValidation = (vals: T) => {
    const validationErrors = validate(vals);
    setErrors(validationErrors);
    return validationErrors;
  };

  const handleChange = (key: keyof T, value: any) => {
    setValues(prev => {
      const newValues = { ...prev, [key]: value };
      runValidation(newValues); // валидируем "на лету"
      return newValues;
    });
  };

  const handleBlur = (key: keyof T) => {
    setTouched(prev => ({ ...prev, [key]: true }));
    runValidation(values);
  };

  const handleSubmit =
  (onSuccess: (vals: T) => void) => (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    // валидируем по текущим значениям
    const validationErrors = validate(values);
    setErrors(validationErrors);

    // помечаем все поля как touched
    const allTouched: Partial<Record<keyof T, boolean>> = {};
    Object.keys(values).forEach(k => (allTouched[k as keyof T] = true));
    setTouched(allTouched);

    // сабмитим, только если нет ошибок
    if (Object.keys(validationErrors).length === 0) {
      onSuccess(values);
    }
  };


  const shouldShowError = (key: keyof T) =>
    (touched[key] || isSubmitted) ? errors[key] : undefined;

  const hasEmptyRequired = Object.entries(values).some(([_, val]) => {
    if (typeof val === 'boolean') return false;
    return String(val).trim() === '';
  });

  const isValid = Object.keys(errors).length === 0 && !hasEmptyRequired;

  return {
    values,
    errors,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    shouldShowError,
  };
}
