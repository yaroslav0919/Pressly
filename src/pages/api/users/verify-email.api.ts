import nc from 'next-connect';

import { verifyEmail } from '@server/controllers/user.controller';
import { authenticateUser } from '@server/middleware/auth.middleware';

const handler = nc().use(authenticateUser).post(verifyEmail);

export default handler;
