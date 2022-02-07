import type { NextApiRequest, NextApiResponse } from 'next';

interface CreateNewAccountParameters {
  username: string;
  password: string;
}

interface BooleanResult {
  result: boolean;
  errors?: Record<string, string>;
}

export default async function createNewAccount(
  req: NextApiRequest,
  res: NextApiResponse<BooleanResult>
) {
  try {
    const newUser: CreateNewAccountParameters = JSON.parse(req.body);
    const userParams = new RegExp('^(?=.{10,50}$)');
    const passwordParams = new RegExp(
      '^(?=.{20,50}$)(?=.*[A-Za-z])(?=.*[!@#$%])(?=.*[0-9])'
    );
    const passwordCracked = await checkPasswordCracked(newUser.password);
    if (
      !newUser.username.match(userParams) &&
      !newUser.password.match(passwordParams)
    ) {
      res.status(400).json({
        result: false,
        errors: { username: 'fail', password: 'fail' },
      });
    } else if (!newUser.username.match(userParams)) {
      res.status(400).json({
        result: false,
        errors: { username: 'fail', password: 'pass' },
      });
    } else if (!newUser.password.match(passwordParams)) {
      res.status(400).json({
        result: false,
        errors: { username: 'pass', password: 'fail' },
      });
    } else if (passwordCracked) {
      res.status(400).json({ result: false, errors: { password: 'cracked' } });
    } else {
      res.status(200).json({ result: true });
    }
  } catch (err) {
    console.log(err);
  }
}

export const checkPasswordCracked = async (password: string) => {
  try {
    const response = await fetch('/api/password_exposed', {
      method: 'POST',
      body: JSON.stringify({
        password,
      }),
    });
    const resBody = await response.json();
    return resBody.result;
  } catch (err) {
    console.log(err);
  }
};
