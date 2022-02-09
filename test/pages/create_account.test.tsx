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

  test('validates username', () => {
    render(<CreateAccount />);
    userEvent.type(screen.getByLabelText('Username'), 'test');
    expect(
      screen.queryByText('Username must be between 10 and 50 characters')
    ).toBeNull();
    userEvent.click(document.body);
    screen.getByText('Username must be between 10 and 50 characters');
  });
});
