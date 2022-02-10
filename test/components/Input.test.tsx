import FormInput from 'src/components/FormInput';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Form Input', () => {
  test('Form Input blur handler works', async () => {
    render(
      <FormInput
        label='Test'
        name='test'
        id='test'
        validate={() => 'test error'}
      />
    );
    const input = screen.getByLabelText('Test');

    userEvent.click(input);
    userEvent.type(input, 'does this work?');

    expect(screen.queryByText('test error')).toBeNull();
    userEvent.click(document.body);
    await screen.findByText('test error');
  });

  test('Form Input change handler works', async () => {
    render(
      <FormInput
        label='Test'
        name='test'
        id='test'
        validate={(testValue: string) => {
          if (testValue.length < 5) return 'onBlur validation fired';
          else if (testValue.length > 5) return 'onChange validation fired';
        }}
      />
    );
    const input = screen.getByLabelText('Test');

    userEvent.click(input);
    userEvent.type(input, 'blur');

    expect(screen.queryByText('onBlur validation fired')).toBeNull();

    userEvent.click(document.body);
    await screen.findByText('onBlur validation fired');

    userEvent.type(input, 'change');
    await screen.findByText('onChange validation fired');
  });
});
