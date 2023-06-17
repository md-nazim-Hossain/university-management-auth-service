import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IAcademicSemester } from './academicSemester.interface';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/paginationConst';
import { IPaginationOptions } from '../../../interfaces/pagination';

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
    next();
  }
);

const getAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions: IPaginationOptions = pick(
      req.query,
      paginationFields
    );

    const result = await AcademicSemesterService.getSemesters(
      paginationOptions
    );

    sendResponse<IAcademicSemester[]>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic semester retrieved successfully',
      meta: result?.meta,
      data: result?.data,
    });
    next();
  }
);

export const AcademicSemesterController = {
  createdSemesters,
  getAllSemesters,
};
