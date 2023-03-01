import { FC, ChangeEvent } from 'react';
import styles from './input.module.css';

type InputProps = {
  type: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  title?: string;
  placeholder?: string;
  isValidField?: boolean;
};

const Input: FC<InputProps> = ({ title, isValidField, ...rest }) => (
  <div className={styles.wrapper}>
    {title && <label className={styles.label}>{title}</label>}
    <input className={`${styles.input} ${isValidField ? styles.error : styles.success}`} {...rest} />
    {isValidField && <span className={styles.errorMessage}>Required</span>}
  </div>
);

export default Input;