/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';
import { IStudent, IStudentFilters } from './student.interface';
import { Student } from './student.model';
import { StudentConstant } from './student.constant';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const getAllStudents = async (
  filters: IStudentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IStudent[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: StudentConstant.studentSearchFields.map(field => {
        return {
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        };
      }),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => {
        return {
          [field]: value,
        };
      }),
    });
  }

  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Student.find(whereConditions)
    .populate('academicDepartment')
    .populate('academicFaculty')
    .populate('academicSemester')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Student.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getStudentById = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findById(id)
    .populate('academicDepartment')
    .populate('academicFaculty')
    .populate('academicSemester');
  return result;
};

const updateStudent = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {
  const isExit = await Student.findOne({ id });

  if (!isExit) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
  }

  const { name, address, guardian, ...studentData } = payload;
  const updateStudentData: Partial<IStudent> = { ...studentData };
  // (updateStudentData as any)['name'] = { ...name };
  // (updateStudentData as any)['address'] = { ...name };
  // (updateStudentData as any)['guardian'] = { ...name };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updateStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  if (address && Object.keys(address).length > 0) {
    Object.keys(address).forEach(key => {
      const addressKey = `address.${key}`;
      (updateStudentData as any)[addressKey] =
        address[key as keyof typeof address];
    });
  }

  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const guardianKey = `guardian.${key}`;
      (updateStudentData as any)[guardianKey] =
        guardian[key as keyof typeof guardian];
    });
  }

  const result = await Student.findOneAndUpdate({ id }, updateStudentData, {
    new: true,
  });
  return result;
};

const deleteStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findByIdAndDelete(id, { new: true })
    .populate('academicDepartment')
    .populate('academicFaculty')
    .populate('academicSemester');
  return result;
};

export const StudentService = {
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
