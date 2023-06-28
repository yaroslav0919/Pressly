import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import { nextConnectOptions } from '@server/configs/nc';
import { create } from '@server/controllers/subscribe.controller';

const handler = nc<NextApiRequest, NextApiResponse>(nextConnectOptions).post(
  create
);

export default handler;
