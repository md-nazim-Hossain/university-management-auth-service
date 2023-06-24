import { Model, Types } from 'mongoose';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface';
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interface';
import {
  IGuardian,
  IUserBloodGroup,
  IUserGender,
} from '../user/user.interface';

export type IFaculty = {
  id: string;
  name: IFacultyName;
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
  academicFaculty: Types.ObjectId | IAcademicFaculty;
  academicDepartment: Types.ObjectId | IAcademicDepartment;
};

export type IFacultyName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type IFacultyFilters = {
  searchTerm?: string;
  id?: string;
  contactNo?: string;
  email?: string;
  bloodGroup?: string;
};

export type FacultyModel = Model<IFaculty, Record<string, unknown>>;
