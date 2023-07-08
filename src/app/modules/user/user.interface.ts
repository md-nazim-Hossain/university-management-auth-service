/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';
import { IFaculty } from '../faculty/faculty.interface';
import { IAdmin } from '../admin/admin.interfcae';

export type IUser = {
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  admin?: Types.ObjectId | IAdmin;
  status: boolean;
  passwordChangeAt?: Date;
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

export type IUserMethods = {
  isPasswordMatch: (
    givenPass: string,
    savePassword: string
  ) => Promise<boolean>;
  isUserExist: (
    id: string
  ) => Promise<Pick<IUser, 'id' | 'password' | 'status' | 'role'> | null>;
};
export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
