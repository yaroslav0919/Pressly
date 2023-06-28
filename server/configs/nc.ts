import { NextApiResponse } from 'next';
/**
 * Config next-connect options
 */
import { NextApiRequest } from 'next';
import { Options } from 'next-connect';

export const nextConnectOptions: Options<NextApiRequest, NextApiResponse> = {
  onError(err, req, res) {
    console.error(err);
    const resStatusCode =
      err.status && err.status >= 100 && err.status < 600 ? err.status : 500;
    return res.status(resStatusCode).json({ message: err.message });
  },
};
