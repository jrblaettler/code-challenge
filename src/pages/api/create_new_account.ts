import type { NextApiRequest, NextApiResponse } from 'next';
import { checkUsernameValid, checkPasswordValid } from 'src/utils';

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
    const usernameError = checkUsernameValid(newUser.username);
    const passwordError = await checkPasswordValid(newUser.password);
    if (usernameError || passwordError) {
      res.status(400).json({
        result: false,
        errors: {
          username: usernameError || 'valid',
          password: passwordError || 'valid',
        },
      });
    } else {
      res.status(200).json({ result: true });
    }
  } catch (err) {
    console.log(err);
  }
}
