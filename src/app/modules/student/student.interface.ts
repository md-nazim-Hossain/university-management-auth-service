import { Model, Types } from 'mongoose';
import { IUserBloodGroup, IUserGender } from '../user/user.interface';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface';
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interface';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';

export type IStudent = {
  id: string;
  name: IStudentName;
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
  profileImage?: string;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
  academicDepartment: Types.ObjectId | IAcademicDepartment;
  academicSemester: Types.ObjectId | IAcademicSemester;
};

export type IGuardian = {
  relation: string;
  name: string;
  phone: string;
  occupation: string;
};

export type IStudentName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type IStudentFilters = {
  searchTerm?: string;
  id?: string;
  contactNo?: string;
  email?: string;
  bloodGroup?: string;
};

export type StudentModel = Model<IStudent, Record<string, unknown>>;
