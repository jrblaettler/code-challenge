import type { NextApiRequest, NextApiResponse } from 'next';

interface CreateNewAccountParameters {
  username: string;
  password: string;
}

interface BooleanResult {
  result: boolean;
  errors?: Record<string, string>;
}

export default function createNewAccount(
  req: NextApiRequest,
  res: NextApiResponse<BooleanResult>
) {
  const newUser: CreateNewAccountParameters = JSON.parse(req.body);
  const userParams = new RegExp('^(?=.{10,50})');
  const passwordParams = new RegExp(
    '^(?=.{20,50})(?=.*[A-Za-z])(?=.*[!@#$%])(?=.*[0-9])'
  );
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
  } else {
    res.status(200).json({ result: true });
  }
}
