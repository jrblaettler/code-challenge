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

  test('returns false if username.length < 10', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {
        username: 'jake',
        password: '1!testingsomepassword',
      },
    });

    fetchMock.mockResponseOnce(JSON.stringify({ result: false }));
    await createNewAccount(req, res);
    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toEqual({
      result: false,
      errors: { username: 'fail', password: 'pass' },
    });
  });

  test('returns false if username.length > 50', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {
        username:
          'usernameusernameusernameusernameusernameusernameusernameusernameusernameusernameusernameusername',
        password: '1!testingsomepassword',
      },
    });

    fetchMock.mockResponseOnce(JSON.stringify({ result: false }));
    await createNewAccount(req, res);
    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toEqual({
      result: false,
      errors: { username: 'fail', password: 'pass' },
    });
  });

  test('returns false if password.length > 50', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {
        username: 'testusername',
        password:
          '1!testsword1!testsword1!testsword1!testsword1!testsword1!testsword1!testsword1!testsword1!testsword1!testsword1!testsword',
      },
    });

    fetchMock.mockResponseOnce(JSON.stringify({ result: false }));
    await createNewAccount(req, res);
    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toEqual({
      result: false,
      errors: { username: 'pass', password: 'fail' },
    });
  });

  test('returns false if password doesnt contain a number', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {
        username: 'testusername',
        password: '!!!!testingsomepassword',
      },
    });

    fetchMock.mockResponseOnce(JSON.stringify({ result: false }));
    await createNewAccount(req, res);
    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toEqual({
      result: false,
      errors: { username: 'pass', password: 'fail' },
    });
  });

  test('returns false if password doesnt contain a symbol', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {
        username: 'testusername',
        password: '111111testingsomepassword',
      },
    });

    fetchMock.mockResponseOnce(JSON.stringify({ result: false }));
    await createNewAccount(req, res);
    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toEqual({
      result: false,
      errors: { username: 'pass', password: 'fail' },
    });
  });

  test('tests if the password is exposed', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {
        username: 'testusername',
        password: '11111!!!!1testingsomepassword',
      },
    });

    fetchMock.mockResponseOnce(JSON.stringify({ result: true }));
    await createNewAccount(req, res);
    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toEqual({
      result: false,
      errors: { password: 'cracked' },
    });
  });
});
