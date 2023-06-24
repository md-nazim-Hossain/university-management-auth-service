/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { FacultyConstant } from './faculty.constant';
import { IFaculty, IFacultyFilters } from './faculty.interface';
import { Faculty } from './faculty.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';

const getAllFaculty = async (
  filters: IFacultyFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: FacultyConstant.facultySearchFields.map(field => {
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

  const result = await Faculty.find(whereConditions)
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Faculty.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getFacultyById = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findById(id)
    .populate('academicDepartment')
    .populate('academicFaculty');

  return result;
};

const updateFaculty = async (
  id: string,
  payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
  const isExit = await Faculty.findOne({ id });

  if (!isExit) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found');
  }

  const { name, address, guardian, ...facultyData } = payload;
  const updateFacultyData: Partial<IFaculty> = { ...facultyData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updateFacultyData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  if (address && Object.keys(address).length > 0) {
    Object.keys(address).forEach(key => {
      const addressKey = `address.${key}`;
      (updateFacultyData as any)[addressKey] =
        address[key as keyof typeof address];
    });
  }

  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const guardianKey = `guardian.${key}`;
      (updateFacultyData as any)[guardianKey] =
        guardian[key as keyof typeof guardian];
    });
  }

  const result = await Faculty.findOneAndUpdate({ id }, updateFacultyData, {
    new: true,
  });
  return result;
};

const deleteFaculty = async (id: string): Promise<IFaculty | null> => {
  const session = await mongoose.startSession();
  let deleteData: IFaculty | null = null;
  try {
    session.startTransaction();

    const deleteFaculty = await Faculty.findByIdAndDelete(id, { new: true })
      .populate('academicDepartment')
      .populate('academicFaculty');
    if (!deleteFaculty) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found');
    }

    const deleteUser = await User.findOneAndDelete({ faculty: id });

    if (!deleteUser) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    await session.commitTransaction();
    await session.endSession();
    deleteData = deleteFaculty;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  return deleteData;
};

export const FacultyService = {
  getAllFaculty,
  getFacultyById,
  updateFaculty,
  deleteFaculty,
};
