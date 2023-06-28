import { NextApiRequest, NextApiResponse } from 'next';
import { MD5 } from 'crypto-js';

import initDatabase from '@server/configs/db';
import { Subscriber } from '@server/entities/subscriber.entity';
import SubscribeValidator from '@server/validators/subscribe.validator';
import configEnv from '@server/configs/env';

export const create = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body;

  // 1. Validation
  const { error } = SubscribeValidator.create({ email });

  if (error) {
    return res.status(400).json({
      msg: error.details[0].message,
    });
  }

  try {
    // check if user exists

    const checkRes = await fetch(
      `https://${configEnv.mailchimp.MAILCHIMP_DOMAIN}.api.mailchimp.com/3.0/lists/${configEnv.mailchimp.MAILCHIMP_LIST_ID}/members/${email}`,
      {
        method: 'GET',
        headers: {
          Authorization: `apikey ${configEnv.mailchimp.MAILCHIMP_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (checkRes.status === 200) {
      return res.status(400).json({
        success: false,
        error: 'Email already registered',
      });
    }

    // 2. Save user to mailchimp
    const response = await fetch(
      `https://${configEnv.mailchimp.MAILCHIMP_DOMAIN}.api.mailchimp.com/3.0/lists/${configEnv.mailchimp.MAILCHIMP_LIST_ID}/members/`,
      {
        method: 'POST',
        headers: {
          Authorization: `apikey ${configEnv.mailchimp.MAILCHIMP_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
        }),
      }
    );

    // 3. Save email to postgres database as backup
    const repository = (await initDatabase()).getRepository(Subscriber);
    const subscribers = await repository.save({
      email,
    });

    // Check if the email was successfully added to the MailChimp list
    if (response.status >= 400)
      throw new Error('Unable to subscribe user to mail list');

    // Subscribe the user to the MailChimp list
    res.status(201).json({ success: true, email: subscribers.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error ? error : 'Unable to subscribe user',
    });
  }
};
