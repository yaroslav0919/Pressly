import { genSalt, hash } from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await genSalt();
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  if (!password || !hashedPassword) return false;
  return await comparePassword(password, hashedPassword);
};
