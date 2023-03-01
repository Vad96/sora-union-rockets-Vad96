import { useState } from 'react';
import styles from './cardCreateForm.module.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Textarea from '../Textarea/Textarea';

type FormValues = {
  title: string;
  name: string;
  description: string;
};

function CardCreateForm() {
  const [formValues, setFormValues] = useState<FormValues>({
    title: '',
    name: '',
    description: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formValues);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input type="text" name="title" value={formValues.title} onChange={handleChange} title="Title" placeholder='Enter title'/>
      <Input type="text" name="name" value={formValues.name} onChange={handleChange} title="Name" placeholder='Enter Rocket name'/>
      <Textarea name="description" value={formValues.description} onChange={handleChange} title="Description" placeholder='Enter description'/>
      <Button type='submit'>Submit</Button>
    </form>
  );
}

export default CardCreateForm;