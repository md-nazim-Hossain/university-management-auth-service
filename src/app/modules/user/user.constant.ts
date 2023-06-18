import { IUserBloodGroup, IUserGender } from './user.interface';

const gender: IUserGender[] = ['male', 'female', 'other'];
const bloodGroup: IUserBloodGroup[] = [
  'A+',
  'A-',
  'B+',
  'B-',
  'O+',
  'O-',
  'AB+',
  'AB-',
];

export const UserConstant = {
  gender,
  bloodGroup,
};
