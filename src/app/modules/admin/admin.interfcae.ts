import { Model, Types } from 'mongoose';
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interface';
import {
  IGuardian,
  IUserBloodGroup,
  IUserGender,
} from '../user/user.interface';

export type IAdmin = {
  id: string;
  name: IAdminName;
  dateOfBirth: string;
  gender: IUserGender;
  bloodGroup?: IUserBloodGroup;
  phone: string;
  email: string;
  password?: string;
  address: {
    presentAddress: string;
    permanentAddress: string;
  };
  contact: string;
  emergencyContact: string;
  guardian: IGuardian;
  designation: string;
  profileImage?: string;
  managementDepartment: Types.ObjectId | IAcademicDepartment;
};

export type IAdminName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type IAdminFilters = {
  searchTerm?: string;
  id?: string;
  contactNo?: string;
  email?: string;
  bloodGroup?: string;
};

export type AdminModel = Model<IAdmin, Record<string, unknown>>;
