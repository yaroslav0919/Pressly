import nc from 'next-connect';

import { resetPassword } from '@server/controllers/user.controller';

const handler = nc().post(resetPassword);

export default handler;
