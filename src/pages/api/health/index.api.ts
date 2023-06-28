import { NextApiRequest, NextApiResponse } from 'next';

import initDatabase from '@server/configs/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  initDatabase();
  res.send('hello');
};

export default handler;
