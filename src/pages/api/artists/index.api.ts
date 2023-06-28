import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import { nextConnectOptions } from '@server/configs/nc';
import ArtistController from '@controllers/artist.controller';

const router = nc<NextApiRequest, NextApiResponse>(nextConnectOptions);

router.get(ArtistController.findAll);
router.post(ArtistController.create);

export default router;
