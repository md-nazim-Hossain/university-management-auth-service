import config from '../../../config/index';
import { IUser } from './users.interface';
import { User } from './users.model';
import { generatedUserId } from './users.utils';

const createUser = async (data: IUser): Promise<IUser | null> => {
  //auto generated incremented id
  const id = await generatedUserId();
  data.id = id;

  // default password
  if (!data.password) {
    data.password = config.default_user_pass as string;
  }

  const userCreated = await User.create(data);
  if (!userCreated) {
    throw new Error('Failed toi created users');
  }
  return userCreated;
};

export default {
  createUser,
};
