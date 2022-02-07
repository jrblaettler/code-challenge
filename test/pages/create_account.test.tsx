import { render, screen, fireEvent, act } from '@testing-library/react';
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
      password: '',
    };
    fetchMock.mockResponseOnce(JSON.stringify({}));
    userEvent.click(screen.getByText('Create Account'));
    expect(fetchMock).toBeCalledTimes(1);
    expect(fetchMock).toBeCalledWith('/api/password_exposed', {
      body: JSON.stringify(body),
      method: 'POST',
    });
  });

  test('renders validation warnings', async () => {
    render(<CreateAccount />);

    fetchMock.mockResponseOnce(
      JSON.stringify({
        result: false,
      })
    );
    fetchMock.mockResponseOnce(
      JSON.stringify({
        result: false,
        errors: { username: 'fail', password: 'fail' },
      })
    );
    const button = screen.getByText('Create Account');
    fireEvent.click(button);
    const usernameWarning = await screen.findByText(
      'Username must be between 10 and 50 characters'
    );
    const passwordWarning = await screen.findByText(
      'Username must be between 10 and 50 characters'
    );
    expect(usernameWarning).toBeTruthy();
    expect(passwordWarning).toBeTruthy();
  });

  test('renders cracked password warning', async () => {
    render(<CreateAccount />);

    fetchMock.mockResponseOnce(
      JSON.stringify({
        result: true,
      })
    );
    const button = screen.getByText('Create Account');
    fireEvent.click(button);
    const crackedWarning = await screen.findByText(
      'This password has been hacked elsewhere, choose a different one'
    );
    expect(crackedWarning).toBeTruthy();
  });
});
