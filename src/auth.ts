import jwt from 'jsonwebtoken';

const secretKey = 'random-secret-key';

export const generateToken = (email: string): string => {
  const payload = { email };
  return jwt.sign(payload, secretKey, { expiresIn: '1d' });
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
};
