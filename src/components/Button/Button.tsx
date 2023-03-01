
import React, { MouseEventHandler } from 'react';
import styles from './button.module.css';

type ButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
};

const Button = ({ onClick, type = 'button', children }: ButtonProps) => {
  return (
    <button className={styles.button} onClick={onClick} type={type}>
      {children}
    </button>
  );
}

export default Button;
