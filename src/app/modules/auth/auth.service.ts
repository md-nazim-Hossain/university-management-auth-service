/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtTokenHelpers } from '../../../helpers/jwtHelpers';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;
  const user = new User();
  const isUserExit = await user.isUserExist(id);

  if (!isUserExit) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  //compare password
  const isPasswordMatch = await user.isPasswordMatch(
    password,
    isUserExit.password
  );

  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  ///access token & refresh token
  const accessToken = jwtTokenHelpers.createToken(
    isUserExit,
    config.jwt.secret as Secret,
    config.jwt.secret_expire_in as string
  );

  const refreshToken = jwtTokenHelpers.createToken(
    isUserExit,
    config.jwt.refresh as Secret,
    config.jwt.refresh_expire_in as string
  );

  return {
    accessToken,
    refreshToken,
    status: isUserExit?.status,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifyToken = null;
  try {
    verifyToken = jwtTokenHelpers.verifyToken(
      token,
      config.jwt.refresh as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid token');
  }

  const { userId }: any = verifyToken;

  const user = new User();
  const isUserExist = await user.isUserExist(userId);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  //generate new access token
  const newAccessToken = jwtTokenHelpers.createToken(
    isUserExist,
    config.jwt.secret as Secret,
    config.jwt.secret_expire_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};
