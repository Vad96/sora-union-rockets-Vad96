import React, { ChangeEvent } from "react";
import styles from "./textarea.module.css";

interface TextareaProps {
  title?: string;
  value: string;
  placeholder?: string;
  name: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const Textarea: React.FC<TextareaProps> = ({
  title,
  ...rest
}: TextareaProps) => {
  return (
    <div className={styles.wrapper}>
      {title && <label className={styles.label}>{title}</label>}
      <textarea maxLength={100} className={styles.textarea} {...rest} />
    </div>
  );
};

export default Textarea;
