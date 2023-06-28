import dayjs from 'dayjs';
import { NextApiRequest, NextApiResponse } from 'next';

import initDatabase from '@server/configs/db';
import { UserEntity as User } from '@server/entities/user.entity';
import {
  sendEmailAfterSignUp,
  sendEmailToResetPassword,
} from '@server/services/email.service';
import { comparePassword, hashPassword } from '@server/utils/password.util';
import {
  generateResetPasswordToken,
  generateVerifyEmailToken,
} from '@server/utils/token.util';
import UserValidator from '@server/validators/user.validator';

const userValidator = new UserValidator();

export const signup = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, name, password } = req.body || {};
    const { error: validationError } = userValidator.validateSignUp(req.body);
    if (validationError)
      return res
        .status(400)
        .json({ message: validationError.details[0].message });

    const userRepository = (await initDatabase()).getRepository(User);

    const user = await userRepository.findOne({
      where: { email },
    });
    if (user) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await hashPassword(password);
    const emailVerificationToken = generateVerifyEmailToken();

    const newUser = new User();
    newUser.email = email;
    newUser.password = hashedPassword;
    newUser.name = name;
    newUser.emailVerificationToken = emailVerificationToken;
    newUser.emailVerificationTokenExpires = dayjs()
      .add(1, 'day')
      .valueOf()
      .toString();

    await userRepository.save(newUser);
    await sendEmailAfterSignUp(name, email, emailVerificationToken);
    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('signup-error: ', error);
    throw new Error('Something wrongs');
  }
};

export const loginWithEmailPassword = async (
  email: string,
  password: string
) => {
  try {
    const userRepository = (await initDatabase()).getRepository(User);
    const user = await userRepository.findOne({ where: { email } });
    if (!user || !(await comparePassword(password, user.password))) return null;

    return user;
  } catch (error) {
    console.error('login-with-email-password-error: ', error);
    throw new Error('Something wrongs');
  }
};

export const verifyEmail = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { token, session } = req.body || {};
    const { error: validationError } = userValidator.validateVerifyEmail({
      token,
    });
    if (validationError)
      return res
        .status(400)
        .json({ message: validationError.details[0].message });

    const userId = session?.user?.id;

    const userRepository = (await initDatabase()).getRepository(User);
    const user = await userRepository.findOne({
      where: { id: userId },
    });
    if (!user) return res.status(400).json({ message: 'User does not exist.' });

    if (user.emailVerified)
      return res
        .status(200)
        .json({ message: 'Email has been verified already' });

    if (
      !user.emailVerificationToken ||
      !user.emailVerificationTokenExpires ||
      dayjs().isAfter(dayjs(user.emailVerificationTokenExpires))
    )
      return res.status(400).json({
        message: 'Token is expired. Please request a new verify email link.',
      });

    if (user.emailVerificationToken !== token)
      return res.status(400).json({
        message:
          'Token is invalid. Please visit this page by the link provided in your email.',
      });

    user.emailVerified = dayjs().valueOf().toString();
    user.emailVerificationToken = null;
    user.emailVerificationTokenExpires = null;
    await userRepository.save(user);
    return res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('verify-email-error: ', error);
    throw new Error('Something wrongs');
  }
};

export const recoveryPassword = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { email } = req.body || {};
    const { error: validationError } = userValidator.validateRecoveryPassword(
      req.body
    );
    if (validationError)
      return res
        .status(400)
        .json({ message: validationError.details[0].message });

    const userRepository = (await initDatabase()).getRepository(User);
    const user = await userRepository.findOne({
      where: { email },
    });
    if (!user) return res.status(400).json({ message: 'User does not exist.' });

    if (
      user.resetPasswordTokenExpires &&
      dayjs().isBefore(dayjs(user.resetPasswordTokenExpires))
    )
      return res.status(200).json({
        message:
          'A recovery password link has been sent to your email. Please check your email.',
      });

    const resetPasswordToken = generateResetPasswordToken();
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordTokenExpires = dayjs()
      .add(1, 'hour')
      .valueOf()
      .toString();
    await userRepository.save(user);
    await sendEmailToResetPassword(user.name, user.email, resetPasswordToken);
    return res.status(200).json({
      message:
        'A recovery password link has been sent to your email. Please check your email.',
    });
  } catch (error) {
    console.error('recovery-password-error: ', error);
    throw new Error('Something wrongs');
  }
};

export const resetPassword = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { token, email, 'new-password': newPassword } = req.body || {};
    const { error: validationError } = userValidator.validateResetPassword(
      req.body
    );
    if (validationError)
      return res
        .status(400)
        .json({ message: validationError.details[0].message });

    const userRepository = (await initDatabase()).getRepository(User);
    const user = await userRepository.findOne({
      where: { email },
    });
    if (!user) return res.status(400).json({ message: 'User does not exist.' });

    if (
      !user.resetPasswordToken ||
      !user.resetPasswordTokenExpires ||
      dayjs().isAfter(dayjs(user.resetPasswordTokenExpires))
    )
      return res.status(400).json({
        message: 'Token is expired. Please request a new password reset link.',
      });

    if (user.resetPasswordToken !== token)
      return res.status(400).json({
        message:
          'Token is invalid. Please visit this page by the link provided in your email.',
      });

    user.password = await hashPassword(newPassword);
    user.resetPasswordToken = null;
    user.resetPasswordTokenExpires = null;
    await userRepository.save(user);
    return res.status(200).json({ message: 'Reset password successfully' });
  } catch (error) {
    console.error('reset-password-error: ', error);
    throw new Error('Something wrongs');
  }
};
