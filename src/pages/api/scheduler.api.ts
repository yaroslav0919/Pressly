import nc from 'next-connect';

import { startCleanupSchedular } from '@server/controllers/schedular.controller';

const handler = nc().get(startCleanupSchedular);

export default handler;
