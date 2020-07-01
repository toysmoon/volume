import { NextApiRequest, NextApiResponse } from 'next';
import Osascript from 'utils/Osascript';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { value },
  } = req;

  const result = await Osascript(`set volume output volume ${value} --100%`);
  res.statusCode = result.error ? 500 : 200;
  res.json({ result });
};
