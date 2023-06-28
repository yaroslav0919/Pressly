import crypto from 'crypto';

export const generateVerifyEmailToken = () => {
  return crypto.randomBytes(16).toString('hex');
};

export const generateResetPasswordToken = () => {
  return crypto.randomBytes(32).toString('hex');
};
