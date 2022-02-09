import Form from 'src/components/Form';
import FormInput from 'src/components/FormInput';
import { screen, render, fireEvent } from '@testing-library/react';

describe('Form', () => {
  const testSubmit = (formValues: any) => {
    return formValues;
  };
  const initialValues = {
    test: 'test',
    email: 'test@test.test',
  };

  beforeEach(() => {
    render(
      <Form initialValues={initialValues} onSubmit={testSubmit}>
        <FormInput id='test' name='test' label='test' />
        <FormInput id='email' name='email' label='email' type='email' />
      </Form>
    );
  });
  test('should render children', () => {
    const textInput = screen.getByRole('textbox', { name: /test/i });
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    expect(textInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
  });

  test('should assign formInput value by id', () => {
    const textInput: HTMLInputElement = screen.getByRole('textbox', {
      name: /test/i,
    });
    const emailInput: HTMLInputElement = screen.getByRole('textbox', {
      name: /email/i,
    });
    expect(textInput.value).toEqual(initialValues.test);
    expect(emailInput.value).toEqual(initialValues.email);
  });
});
