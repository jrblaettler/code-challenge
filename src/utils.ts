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

export const checkUsernameValid = (username: string) => {
  if (!RegExp('^(?=.{10,}$)').test(username)) {
    return 'Username must be at least 10 characters';
  } else if (RegExp('^(?=.{50,}$)').test(username)) {
    return 'Username must be at most 50 characters';
  } else {
    return;
  }
};

export const checkPasswordValid = async (password: string) => {
  if (!RegExp('^(?=.{20,}$)').test(password)) {
    return 'Password must be at least 20 characters';
  } else if (RegExp('^(?=.{50,}$)').test(password)) {
    return 'Password must be at most 50 characters';
  } else if (!RegExp('^(?=.*[A-Za-z])').test(password)) {
    return 'Password must contain 1 letter';
  } else if (!RegExp('^(?=.*[0-9])').test(password)) {
    return 'Password must contain at least 1 number';
  } else if (!RegExp('^(?=.*[!@#$%^&*])').test(password)) {
    return 'Password must contain at least 1 symbol';
  } else if (await checkPasswordCracked(password)) {
    return 'This password has been hacked elsewhere, choose a different one.';
  } else {
    return;
  }
};
