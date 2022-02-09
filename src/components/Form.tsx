import {
  ChangeEvent,
  createContext,
  FormEvent,
  ReactNode,
  useState,
} from 'react';

export type FormValues = Record<string, string>;

interface FormProps {
  children: ReactNode;
  onSubmit(form: FormValues): void;
  initialValues: FormValues;
  buttonText?: string;
}

export const FormContext = createContext({
  form: {},
  handleFormChange: (e: ChangeEvent<HTMLInputElement>) => {},
});

const Form = (props: FormProps) => {
  const [form, setForm] = useState(props.initialValues);

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    props.onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormContext.Provider value={{ form, handleFormChange }}>
        {props.children}
      </FormContext.Provider>
      <button className='form-button' type='submit'>
        {props.buttonText || 'Submit'}
      </button>
    </form>
  );
};

export default Form;
