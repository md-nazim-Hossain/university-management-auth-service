import { User } from './users.model';

export const findUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .limit(1)
    .lean();

  return lastUser?.id;
};
export const generatedUserId = async () => {
  const currentUserId = (await findUserId()) || 0;
  const incrementedId = (+currentUserId + 1).toString().padStart(6, '0');
  return incrementedId;
};
