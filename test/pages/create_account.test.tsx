import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from 'jest-fetch-mock';
import CreateAccount from 'src/pages/create_account';

describe('CreateAccount', () => {
  beforeEach(() => {
    fetchMock.enableMocks();
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  test('rendering', () => {
    render(<CreateAccount />);

    const body = {
      username: '',
      password: '',
    };
    fetchMock.mockResponseOnce(JSON.stringify({}));
    userEvent.click(screen.getByText('Create Account'));
    expect(fetchMock).toBeCalledTimes(1);
    expect(fetchMock).toBeCalledWith('/api/create_new_account', {
      body: JSON.stringify(body),
      method: 'POST',
    });
  });

  test('Creates accounts', async () => {
    render(<CreateAccount />);
    userEvent.type(screen.getByLabelText('Username'), 'iAmAValidUsername');

    fetchMock.mockResponseOnce(JSON.stringify({ result: false }));
    userEvent.type(screen.getByLabelText('Password'), '!2IAmAValidPassword2!');

    fetchMock.mockResponseOnce(JSON.stringify({ result: true }));
    userEvent.click(screen.getByText('Create Account'));

    expect(fetchMock).toBeCalledTimes(2);

    const successMessage = await screen.findByText('Account Created!');
    expect(successMessage).toBeTruthy();
  });

  test('Fails to create on improper inputs', async () => {
    render(<CreateAccount />);
    userEvent.type(screen.getByLabelText('Username'), 'tooshort');

    fetchMock.mockResponseOnce(JSON.stringify({ result: false }));
    userEvent.type(screen.getByLabelText('Password'), 'tooshort');

    fetchMock.mockResponseOnce(
      JSON.stringify({
        result: false,
        errors: {
          username: 'Username must be at least 10 characters',
          password: 'Password must be at least 20 characters',
        },
      })
    );
    userEvent.click(screen.getByText('Create Account'));

    expect(fetchMock).toBeCalledTimes(2);

    const successMessage = await screen.findByText('Account Created!');
    expect(successMessage).toBeFalsy();
  });
});
