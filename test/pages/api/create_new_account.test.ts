import { expect } from '@jest/globals';
import createNewAccount from 'src/pages/api/create_new_account';
import { mockRequest } from 'test/utils';
import fetchMock from 'jest-fetch-mock';

describe('/api/create_new_account', () => {
  beforeEach(() => {
    fetchMock.enableMocks();
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  test('returns true', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {
        username: 'testusername',
        password: '1!testingsomepassword',
      },
    });

    fetchMock.mockResponseOnce(JSON.stringify({ result: false }));
    await createNewAccount(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      result: true,
    });
  });

  test('returns true', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {
        username: '',
        password: '',
      },
    });

    fetchMock.mockResponseOnce(JSON.stringify({ result: false }));
    await createNewAccount(req, res);
    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toEqual({
      result: false,
      errors: {
        username: 'Username must be at least 10 characters',
        password: 'Password must be at least 20 characters',
      },
    });
  });
});
