import Form from 'src/components/Form';
import FormInput from 'src/components/FormInput';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Form', () => {
  test('Form works', () => {
    const onSubmit = jest.fn();
    render(
      <Form
        initialValues={{ test: '' }}
        onSubmit={onSubmit}
        submitErrorMessage={'test error message'}
      >
        <FormInput label='Test' name='test' id='test' />
      </Form>
    );

    const input = screen.getByLabelText('Test');
    userEvent.type(input, 'test');
    userEvent.click(screen.getByText('Submit'));
    expect(onSubmit).toBeCalledTimes(1);
    expect(onSubmit).toBeCalledWith({ test: 'test' });
    screen.getByText('test error message');
  });
});
