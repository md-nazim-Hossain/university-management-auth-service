/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IAcademicSemester } from './academicSemester.interface';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/paginationConst';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { AcademicSemesterConstant } from './academicSemester.constant';

const createdSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );

    sendResponse<IAcademicSemester>(res, {
      success: true,
      message: 'Academic semester created successfully',
      data: result,
      statusCode: httpStatus.OK,
    });
  }
);

const getAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(
      req.query,
      AcademicSemesterConstant.academicSemesterFiltersFields
    );
    const paginationOptions: IPaginationOptions = pick(
      req.query,
      paginationFields
    );

    const result = await AcademicSemesterService.getSemesters(
      filters,
      paginationOptions
    );

    sendResponse<IAcademicSemester[]>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic semester retrieved successfully',
      meta: result?.meta,
      data: result?.data,
    });
  }
);

const getSemesterById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await AcademicSemesterService.getSemesterById(id);

    sendResponse<IAcademicSemester>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic semester retrieved successfully by id',
      data: result,
    });
  }
);

const updateSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { ...updateSemesterData } = req.body;

    const result = await AcademicSemesterService.updateSemester(
      id,
      updateSemesterData
    );

    sendResponse<IAcademicSemester>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic semester updated successfully',
      data: result,
    });
  }
);

const deleteSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const result = await AcademicSemesterService.deleteSemester(id);

    sendResponse<IAcademicSemester>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic semester deleted successfully',
      data: result,
    });
  }
);

export const AcademicSemesterController = {
  createdSemesters,
  getAllSemesters,
  getSemesterById,
  updateSemester,
  deleteSemester,
};
