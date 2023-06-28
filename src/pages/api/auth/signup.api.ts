import nc from 'next-connect';

import { signup } from '@server/controllers/user.controller';

const handler = nc().post(signup);

export default handler;
