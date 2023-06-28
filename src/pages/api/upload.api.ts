import nc from 'next-connect';
import fileUpload from 'express-fileupload';

import { nextConnectOptions } from '@server/configs/nc';
import UploadController from '@server/controllers/upload.controller';

const handler = nc(nextConnectOptions)
  .use(fileUpload())
  .post(UploadController.uploadFile);

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
