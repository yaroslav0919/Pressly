import Joi from 'joi';
import { joiPasswordExtendCore } from 'joi-password';
const joiPassword = Joi.extend(joiPasswordExtendCore);

export default class UserValidator {
  validateEmail = Joi.string().email().required();
  validatePassword = joiPassword
    .string()
    .required()
    .min(8)
    .minOfSpecialCharacters(1)
    .minOfUppercase(1);

  validateSignUp(user: any) {
    return Joi.object({
      name: Joi.string().required(),
      email: this.validateEmail,
      password: this.validatePassword,
    }).validate(user);
  }

  validateLogin(obj: any) {
    return Joi.object({
      email: this.validateEmail,
      password: this.validatePassword,
    }).validate(obj);
  }

  validateVerifyEmail(obj: any) {
    return Joi.object({
      token: Joi.string().required(),
    }).validate(obj);
  }

  validateRecoveryPassword(obj: any) {
    return Joi.object({
      email: this.validateEmail,
    }).validate(obj);
  }

  validateResetPassword(obj: any) {
    return Joi.object({
      email: this.validateEmail,
      token: Joi.string().required(),
      'new-password': this.validatePassword,
      'confirm-password': Joi.ref('new-password'),
    }).validate(obj);
  }

  validateSendMail(obj: any) {
    return Joi.object({
      email: this.validateEmail,
    }).validate(obj);
  }
}
