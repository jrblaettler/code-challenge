import { expect } from '@jest/globals';
import fetchMock from 'jest-fetch-mock';
import { checkPasswordValid, checkUsernameValid } from 'src/utils';

describe('Password Validation', () => {
  beforeEach(() => {
    fetchMock.enableMocks();
  });
  afterEach(() => {
    fetchMock.enableMocks();
  });

  test('password validation works', async () => {
    expect(await checkPasswordValid('tooshort')).toEqual(
      'Password must be at least 20 characters'
    );
    expect(
      await checkPasswordValid(
        'toolongtoolongtoolongtoolongtoolongtoolongtoolongtoolong'
      )
    ).toEqual('Password must be at most 50 characters');
    expect(await checkPasswordValid('12345678901234567890')).toEqual(
      'Password must contain 1 letter'
    );
    expect(await checkPasswordValid('imatestpassworddddddd')).toEqual(
      'Password must contain at least 1 number'
    );
    expect(await checkPasswordValid('imatestpasswordddddd1')).toEqual(
      'Password must contain at least 1 symbol'
    );

    fetchMock.mockResponseOnce(JSON.stringify({ result: true }));
    expect(await checkPasswordValid('!2IAmAValidButCrackedPassword')).toEqual(
      'This password has been hacked elsewhere, choose a different one.'
    );
    fetchMock.mockResponseOnce(JSON.stringify({ result: false }));
    expect(await checkPasswordValid('!2IAmAValidPassword2!')).toEqual(
      undefined
    );
  });
});

describe('Username Validation', () => {
  test('Username Validation Works', () => {
    expect(checkUsernameValid('tooshort')).toEqual(
      'Username must be greater than 10 characters'
    );
    expect(
      checkUsernameValid(
        'toolongtoolongtoolongtoolongtoolongtoolongtoolongtoolong'
      )
    ).toEqual('Username must be less than 50 characters');
    expect(checkUsernameValid('iAmAValidUsername')).toEqual(undefined);
  });
});
