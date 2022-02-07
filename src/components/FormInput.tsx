import { useContext } from 'react';
import { FormContext } from './Form';

interface FormInputProps {
  id: string;
  label: string;
  name?: string;
  type?: string;
}

const FormInput = (props: FormInputProps) => {
  const { form, handleFormChange } = useContext(FormContext);
  return (
    <div className='form-input-container'>
      <label className='form-input-label' htmlFor={props.id}>
        {props.label}
      </label>
      <input
        className='form-input'
        type={props.type || 'text'}
        name={props.name || props.id}
        id={props.id}
        value={form[props.name]}
        onChange={handleFormChange}
      />
    </div>
  );
};

export default FormInput;
