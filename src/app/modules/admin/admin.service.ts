/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';

import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { IAdmin, IAdminFilters } from './admin.interfcae';
import { AdminConstant } from './admin.constant';
import { Admin } from './admin.model';

const getAllAdmin = async (
  filters: IAdminFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAdmin[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: AdminConstant.adminSearchFields.map(field => {
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

  const result = await Admin.find(whereConditions)
    .populate('managementDepartment')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Admin.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getAdminById = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findById(id).populate('managementDepartment');

  return result;
};

const updateAdmin = async (
  id: string,
  payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
  const isExit = await Admin.findOne({ id });

  if (!isExit) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found');
  }

  const { name, address, guardian, ...AdminData } = payload;
  const updateAdminData: Partial<IAdmin> = { ...AdminData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updateAdminData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  if (address && Object.keys(address).length > 0) {
    Object.keys(address).forEach(key => {
      const addressKey = `address.${key}`;
      (updateAdminData as any)[addressKey] =
        address[key as keyof typeof address];
    });
  }

  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const guardianKey = `guardian.${key}`;
      (updateAdminData as any)[guardianKey] =
        guardian[key as keyof typeof guardian];
    });
  }

  const result = await Admin.findOneAndUpdate({ id }, updateAdminData, {
    new: true,
  });
  return result;
};

const deleteAdmin = async (id: string): Promise<IAdmin | null> => {
  const session = await mongoose.startSession();
  let deleteData: IAdmin | null = null;
  try {
    session.startTransaction();

    const deleteAdmin = await Admin.findByIdAndDelete(id, {
      new: true,
    }).populate('managementDepartment');
    if (!deleteAdmin) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found');
    }

    const deleteUser = await User.findOneAndDelete({ admin: id });

    if (!deleteUser) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    await session.commitTransaction();
    await session.endSession();
    deleteData = deleteAdmin;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  return deleteData;
};

export const AdminService = {
  getAllAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
};
