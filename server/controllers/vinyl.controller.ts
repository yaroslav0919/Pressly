import { NextApiRequest, NextApiResponse } from 'next';
const createVinyl = (req: NextApiRequest, res: NextApiResponse) => {
  return res.json({
    msg: 'API create vinyl',
  });
};

export default createVinyl;
