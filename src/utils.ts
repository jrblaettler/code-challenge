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

export const handleUsernameValidation = (username: string) => {
  const userParams = new RegExp('^(?=.{10,50}$)');
  return username.match(userParams) ? true : false;
};
