import { NextApiRequest, NextApiResponse } from 'next';
import Osascript from 'utils/Osascript';

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  const result = await Osascript('set volume without output muted');
  res.statusCode = result.error ? 500 : 200;
  res.json({ result });
};
