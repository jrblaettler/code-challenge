import { BooleanResult } from './pages/api/create_new_account';

export const checkPasswordCracked = async (password: string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/password_exposed`, {
      method: 'POST',
      body: JSON.stringify({
        password,
      }),
    });
    const resBody: BooleanResult = await response.json();
    return resBody.result;
  } catch (err) {
    console.log(err);
  }
};

export const checkUsernameValid = (username: string): boolean => {
  const userParams = RegExp('^(?=.{10,50}$)');
  return userParams.test(username);
};

export const checkPasswordValid = (password: string) => {
  return {
    password: RegExp(
      '^(?=.{20,50}$)(?=.*[A-Za-z])(?=.*[!@#$%])(?=.*[0-9])'
    ).test(password),
    length: RegExp('(?=.{20,50}$)').test(password),
    character: RegExp('(?=.*[A-Za-z])').test(password),
    number: RegExp('(?=.*[0-9])').test(password),
    symbol: RegExp('(?=.*[!@#$%])').test(password),
  };
};
