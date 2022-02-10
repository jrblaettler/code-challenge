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
  submitErrorMessage: string;
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
      <div className='form-button-container'>
        <p className='form-submit-error'>{props.submitErrorMessage}</p>
        <button className='form-button' type='submit'>
          {props.buttonText || 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default Form;
