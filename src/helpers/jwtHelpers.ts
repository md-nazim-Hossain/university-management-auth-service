import jwt, { Secret } from 'jsonwebtoken';
import { IUser } from '../app/modules/user/user.interface';

const createToken = (
  payload: Pick<IUser, 'id' | 'role'>,
  secret: Secret,
  expiredTime: string
): string => {
  return jwt.sign(
    {
      userId: payload.id,
      role: payload.role,
    },
    secret,
    {
      expiresIn: expiredTime,
    }
  );
};

const verifyToken = (token: string, secret: Secret): jwt.JwtPayload => {
  return jwt.verify(token, secret) as jwt.JwtPayload;
};

export const jwtTokenHelpers = {
  createToken,
  verifyToken,
};
