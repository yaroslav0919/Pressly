import email from '@sendgrid/mail';

import configEnv from '@server/configs/env';
import { resetPasswordTemplate } from '@server/templates/resetPassword';
import { signupTemplate } from '@server/templates/signup';

email.setApiKey(configEnv.sendgrid.API_KEY as string);

const senderEmail = configEnv.sendgrid.SENDER_EMAIL as string;
const marketplaceName = configEnv.app.NEXT_PUBLIC_MARKETPLACE_NAME as string;
const canonicalRootUrl = configEnv.app.NEXT_PUBLIC_CANONICAL_ROOT_URL as string;

export const sendEmailAfterSignUp = async (
  userName: string,
  userEmail: string,
  emailVerificationToken: string
) => {
  try {
    const msg = {
      from: senderEmail,
      to: userEmail,
      categories: [marketplaceName.toLowerCase()],
      subject: `Email verification instructions for ${marketplaceName}`,
      html: signupTemplate(
        canonicalRootUrl,
        marketplaceName,
        userName,
        `${canonicalRootUrl}/verify-email?t=${emailVerificationToken}`
      ),
    };
    await email.send(msg);
  } catch (error: any) {
    console.error(
      'send-email-after-sign-up-error: ',
      error?.response?.body?.errors?.[0] || error
    );
  }
};

export const sendEmailToResetPassword = async (
  userName: string,
  userEmail: string,
  resetPasswordToken: string
) => {
  try {
    const msg = {
      from: senderEmail,
      to: userEmail,
      categories: [marketplaceName.toLowerCase()],
      subject: `Password reset instructions for ${marketplaceName}`,
      html: resetPasswordTemplate(
        canonicalRootUrl,
        marketplaceName,
        userName,
        `${canonicalRootUrl}/reset-password?t=${resetPasswordToken}&e=${encodeURIComponent(
          userEmail
        )}`
      ),
    };
    await email.send(msg);
  } catch (error: any) {
    console.error(
      'send-email-after-sign-up-error: ',
      error?.response?.body?.errors?.[0] || error
    );
  }
};
