import styles from './modal.module.css';

type InputConfig = {
  name: string;
  placeholder?: string;
  type?: 'text' | 'password' | 'email';
  value: string;
  onChange: (value: string) => void;
};

type ModalProps = {
  isOpen: boolean;
  title: string;
  inputs?: InputConfig[];
  checkbox?: {
    label: string;
    checked: boolean;
    onChange: (value: boolean) => void;
  };
  buttonText: string;
  onSubmit: () => void;
  onClose: () => void;
  children?: React.ReactNode; // ← добавить
};


export function Modal({
  isOpen,
  title,
  inputs = [],
  checkbox,
  buttonText,
  onSubmit,
  onClose,
  children
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.content}>
          {children}

          {inputs.slice(0, 6).map((input) => (
            <input
              key={input.name}
              className={styles.input}
              type={input.type ?? 'text'}
              placeholder={input.placeholder}
              value={input.value}
              onChange={(e) => input.onChange(e.target.value)}
            />
          ))}

          {checkbox && (
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={checkbox.checked}
                onChange={(e) => checkbox.onChange(e.target.checked)}
              />
              <span>{checkbox.label}</span>
            </label>
          )}
        </div>

        <div className={styles.actions}>
          <button onClick={onSubmit} className={styles.button}>{buttonText}</button>
        </div>
      </div>
    </div>
  );
}
