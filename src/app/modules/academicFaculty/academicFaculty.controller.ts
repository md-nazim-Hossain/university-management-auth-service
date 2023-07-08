import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IAcademicFaculty } from './academicFaculty.interface';
import { AcademicFacultyService } from './academicFaculty.service';
import pick from '../../../shared/pick';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationFields } from '../../../constants/paginationConst';
import { AcademicFacultyConstant } from './academicFaculty.constant';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body;
  const result = await AcademicFacultyService.createFaculty(
    academicFacultyData
  );

  sendResponse<IAcademicFaculty>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic faculty created successfully',
    data: result,
  });
});

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(
    req.query,
    AcademicFacultyConstant.academicFacultyFiltersFields
  );
  const paginationOptions: IPaginationOptions = pick(
    req.query,
    paginationFields
  );

  const result = await AcademicFacultyService.getAllFaculty(
    filters,
    paginationOptions
  );

  sendResponse<IAcademicFaculty[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All academic faculty retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getFacultyById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicFacultyService.getFacultyById(id);

  sendResponse<IAcademicFaculty>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic faculty retrieved by id successfully',
    data: result,
  });
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...academicFacultyData } = req.body;
  const result = await AcademicFacultyService.updateFaculty(
    id,
    academicFacultyData
  );

  sendResponse<IAcademicFaculty>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic faculty updated successfully',
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicFacultyService.deleteFaculty(id);
  sendResponse<IAcademicFaculty>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic faculty deleted successfully',
    data: result,
  });
});

export const AcademicFacultyController = {
  createFaculty,
  getAllFaculty,
  getFacultyById,
  updateFaculty,
  deleteFaculty,
};
