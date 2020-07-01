import { NextApiRequest, NextApiResponse } from 'next';
import Osascript from 'utils/Osascript';

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  const { stdout: volume, error: vError } = await Osascript(
    'output volume of (get volume settings)',
  );
  const { stdout: isMuted, error: mError } = await Osascript(
    'output muted of (get volume settings)',
  );
  res.statusCode = vError || mError ? 500 : 200;
  res.json({
    volume: Number(volume.replace('\n', '')),
    isMuted: isMuted.replace('\n', '') === 'true',
  });
};
