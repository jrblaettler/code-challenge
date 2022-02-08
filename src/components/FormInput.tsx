import { ChangeEvent, useContext } from 'react';
import { FormContext } from './Form';

interface FormInputProps {
  id: string;
  label: string;
  name: string;
  type?: string;
  onChange?(e: ChangeEvent<HTMLInputElement>): void;
}

const FormInput = (props: FormInputProps) => {
  const { form, handleFormChange } = useContext(FormContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFormChange(e);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <div className='form-input-container'>
      <label className='form-input-label' htmlFor={props.id}>
        {props.label}
      </label>
      <input
        className='form-input'
        type={props.type || 'text'}
        name={props.name}
        id={props.id}
        value={form[props.id]}
        onChange={handleChange}
      />
    </div>
  );
};

export default FormInput;
