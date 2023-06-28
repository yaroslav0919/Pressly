import dayjs from 'dayjs';
import { getServerSession } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';

import { authOptions } from '@pages/api/auth/[...nextauth].api';

export const authenticateUser = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  const session = await getServerSession(req, res, authOptions(req, res));
  if (
    !session ||
    !session.user ||
    !session.expires ||
    dayjs().isAfter(dayjs(session.expires))
  ) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  req.body.session = session;
  next();
};
