import Joi from 'joi';

const SubscribeValidator = {
  create: (record: any) =>
    Joi.object({
      email: Joi.string().email().required(),
    }).validate(record),
};

export default SubscribeValidator;
