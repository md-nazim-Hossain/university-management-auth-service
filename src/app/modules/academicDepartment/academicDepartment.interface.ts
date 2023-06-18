import { Model, Types } from 'mongoose';

export type IAcademicDepartment = {
  title: string;
  academicFaculty: Types.ObjectId;
};

export type IAcademicDepartmentModel = Model<
  IAcademicDepartment,
  Record<string, unknown>
>;

export type IAcademicDepartmentFilters = {
  searchTerm?: string;
};
