import type { NextApiRequest, NextApiResponse } from 'next';
import {
  checkPasswordCracked,
  checkUsernameValid,
  checkPasswordValid,
} from 'src/utils';

export interface CreateNewAccountParameters {
  username: string;
  password: string;
}

export interface BooleanResult {
  result: boolean;
  errors?: Record<string, string>;
}

export default async function createNewAccount(
  req: NextApiRequest,
  res: NextApiResponse<BooleanResult>
) {
  try {
    const newUser: CreateNewAccountParameters = JSON.parse(req.body);
    const passwordParams = new RegExp(
      '^(?=.{20,50}$)(?=.*[A-Za-z])(?=.*[!@#$%])(?=.*[0-9])'
    );
    const passwordCracked = await checkPasswordCracked(newUser.password);
    const isUsernameValid = checkUsernameValid(newUser.username);
    const isPasswordValid = checkPasswordValid(newUser.password).password;

    if (!isUsernameValid && !isPasswordValid) {
      res.status(400).json({
        result: false,
        errors: { username: 'fail', password: 'fail' },
      });
    } else if (!isUsernameValid) {
      res.status(400).json({
        result: false,
        errors: { username: 'fail', password: 'pass' },
      });
    } else if (!isPasswordValid) {
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
