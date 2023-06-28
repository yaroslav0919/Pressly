import Joi from 'joi';

const ArtistValidator = {
  create: (vinyl: any) =>
    Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phoneNumber: Joi.string().required(),
      avatar: Joi.string().required(),
      artistName: Joi.string().required(),
      artistBio: Joi.string().max(300),
    }).validate(vinyl),
};

export default ArtistValidator;
