import nc from 'next-connect';

import { recoveryPassword } from '@server/controllers/user.controller';

const handler = nc().post(recoveryPassword);

export default handler;
