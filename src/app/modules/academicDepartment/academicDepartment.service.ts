import { SortOrder } from 'mongoose';
import { IPaginationOptions } from '../../../interfaces/pagination';
import {
  IAcademicDepartment,
  IAcademicDepartmentFilters,
} from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { AcademicDepartmentConstant } from './academicDepartment.constant';
import { IGenericResponse } from '../../../interfaces/common';

const createAcademicDepartment = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment | null> => {
  const result = (await AcademicDepartment.create(payload)).populate(
    'academicFaculty'
  );
  return result;
};

const getAllAcademicDepartment = async (
  filters: IAcademicDepartmentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicDepartment[]> | null> => {
  const { searchTerm, ...filter } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: AcademicDepartmentConstant.academicDepartmentSearchFields.map(
        field => ({
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        })
      ),
    });
  }

  if (Object.keys(filter).length > 0) {
    andConditions.push({
      $and: Object.entries(filter).map(([field, value]) => {
        return {
          [field]: value,
        };
      }),
    });
  }

  const sortOptions: { [key: string]: SortOrder } = {};
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  if (sortBy && sortOrder) {
    sortOptions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicDepartment.find(whereConditions)
    .sort(sortOptions)
    .skip(skip)
    .limit(limit)
    .populate('academicFaculty');

  const total = await AcademicDepartment.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getAcademicDepartmentById = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findById(id).populate(
    'academicFaculty'
  );
  return result;
};

const updateAcademicDepartment = async (
  id: string,
  payload: IAcademicDepartment
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate('academicFaculty');
  return result;
};

const deleteAcademicDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndDelete(id);
  return result;
};

export const AcademicDepartmentService = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getAcademicDepartmentById,
  updateAcademicDepartment,
  deleteAcademicDepartment,
};
