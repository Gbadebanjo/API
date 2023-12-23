import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();
const secret = process.env.JWT_SECRET || '';
const expiresIn = process.env.JWT_EXPIRES || '';

export interface Payload {
  user: string;
  admin: boolean;
  verifiedEmail: boolean;
  name: string;
}

interface PayloadReturn extends Payload {
  iat: number;
  exp: number;
}

export const generateToken = (payload: Payload) => {
  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = (token: string) => {
  try {
    const payload = jwt.verify(token, secret) as PayloadReturn;
    return payload ? payload : false;
  } catch (err) {
    return false;
  }
};
