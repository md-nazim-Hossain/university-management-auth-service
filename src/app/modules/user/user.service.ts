import config from '../../../config';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generatedUserId } from './user.utils';
import ApiError from '../../../errors/ApiError';

const createUser = async (payload: IUser): Promise<IUser | null> => {
  //auto generated incremented id
  const id = await generatedUserId();
  payload.id = id;

  // default password
  if (!payload.password) {
    payload.password = config.default_user_pass as string;
  }

  const userCreated = await User.create(payload);
  if (!userCreated) {
    throw new ApiError(400, 'Failed to created users');
  }
  return userCreated;
};

export const UserService = {
  createUser,
};
