import { NextApiRequest, NextApiResponse } from 'next';

import initDatabase from '@server/configs/db';
import { Artist } from '@server/entities/artist.entity';
import ArtistValidator from '@server/validators/artistInfo.validator';

const findAll = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const connection = (await initDatabase()).getRepository(Artist);
    const records = await connection.find();

    return res.json({ data: records });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  const { error } = ArtistValidator.create(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  try {
    const connection = (await initDatabase()).getRepository(Artist);
    const response = await connection.save(req.body);
    return res.json({
      data: response,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const remove = async (req: NextApiRequest, res: NextApiResponse) => {
  const connection = (await initDatabase()).getRepository(Artist);
  try {
    const id = req.query.id;
    const response = await connection.delete(id as string);

    return res.json({
      data: response,
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const findById = async (req: NextApiRequest, res: NextApiResponse) => {
  const connection = (await initDatabase()).getRepository(Artist);
  try {
    const id = req.query.id as string;
    const response = await connection.findOne({ where: { id } });

    return res.json({
      data: response,
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const ArtistController = {
  findAll,
  findById,
  create,
  remove,
};

export default ArtistController;
