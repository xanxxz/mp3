import React from 'react';
import styles from './ErrorModal.module.css';

interface ErrorModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onClose: () => void;
  actionText?: string;
  onAction?: () => void;
}

export const ErrorModal: React.FC<ErrorModalProps> = ({
  isOpen,
  title = 'Что-то пошло не так',
  message,
  onClose,
  actionText,
  onAction
}) => {
  if (!isOpen) return null;

  const handleAction = () => {
    if (onAction) onAction();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.icon}>⚠️</div>

        <h2 className={styles.title}>{title}</h2>

        <p className={styles.text}>
          {message}
        </p>

        <div className={styles.buttons}>
          <button
            className={styles.secondary}
            onClick={onClose}
          >
            Закрыть
          </button>

          {actionText && onAction && (
            <button
              className={styles.primary}
              onClick={handleAction}
            >
              {actionText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
