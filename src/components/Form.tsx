import {
  ChangeEvent,
  createContext,
  FormEvent,
  ReactNode,
  useState,
} from 'react';

interface FormProps {
  formClass: string;
  buttonClass: string;
  children: ReactNode;
  onSubmit(e: FormEvent, form: any): void;
  initialValues: any;
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

  return (
    <form className={props.formClass} onSubmit={e => props.onSubmit(e, form)}>
      <FormContext.Provider value={{ form, handleFormChange }}>
        {props.children}
      </FormContext.Provider>
      <button className={props.buttonClass} type='submit'>
        {props.buttonText || 'Submit'}
      </button>
    </form>
  );
};

export default Form;
