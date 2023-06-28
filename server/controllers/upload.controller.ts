import { NextApiRequest, NextApiResponse } from 'next';

import AWSS3Service from '@server/services/aws-s3.service';

type NextApiRequestFile = NextApiRequest & {
  files: any;
};
const uploadFile = async (req: NextApiRequestFile, res: NextApiResponse) => {
  try {
    const fileLocation = await AWSS3Service.uploadFile(req.files.file);
    return res.json({
      data: fileLocation,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const UploadController = {
  uploadFile,
};

export default UploadController;
