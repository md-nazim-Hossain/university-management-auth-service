import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';
import { IFaculty } from '../faculty/faculty.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  // admin?: Types.ObjectId | IAdmin;
};
export type IUserGender = 'male' | 'female' | 'other';
export type IUserBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'O+'
  | 'O-'
  | 'AB+'
  | 'AB-';

export type IGuardian = {
  relation: string;
  name: string;
  phone: string;
  occupation: string;
};
export type UserModel = Model<IUser, Record<string, unknown>>;
