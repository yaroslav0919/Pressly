import { randomUUID } from 'crypto';
import { v4 as uuidv4 } from 'uuid';

const generateFallbackUUID = () => {
  const randomValues = new Array(16);
  for (let i = 0; i < 16; i++) {
    randomValues[i] = Math.floor(Math.random() * 256);
  }
  randomValues[6] &= 0x0f; // Clear version
  randomValues[6] |= 0x40; // Set version 4
  randomValues[8] &= 0x3f; // Clear variant
  randomValues[8] |= 0x80; // Set variant 10x

  let key = '';
  for (let i = 0; i < 16; i++) {
    key += randomValues[i].toString(16).padStart(2, '0');
    if (i === 3 || i === 5 || i === 7 || i === 9) {
      key += '-';
    }
  }

  return key;
};

export const generateSessionTokenKey = () => {
  const uuid = uuidv4() || randomUUID?.();
  if (uuid) return uuid;

  return generateFallbackUUID();
};

export const calculateSessionCookieExpiry = (
  time: number,
  date = Date.now()
) => {
  return new Date(date + time * 1000);
};
