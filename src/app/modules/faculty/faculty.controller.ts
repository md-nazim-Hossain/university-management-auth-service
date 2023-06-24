/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { FacultyService } from './faculty.service';
import sendResponse from '../../../shared/sendResponse';
import { IFaculty } from './faculty.interface';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { FacultyConstant } from './faculty.constant';
import { paginationFields } from '../../../constants/paginationConst';
import { IPaginationOptions } from '../../../interfaces/pagination';

const getAllFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, FacultyConstant.facultyFiltersFields);
    const paginationOptions: IPaginationOptions = pick(
      req.query,
      paginationFields
    );
    const result = await FacultyService.getAllFaculty(
      filters,
      paginationOptions
    );

    sendResponse<IFaculty[]>(res, {
      success: true,
      message: 'Faculty created successfully',
      meta: result?.meta,
      data: result?.data,
      statusCode: httpStatus.OK,
    });
  }
);

const getFacultyById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await FacultyService.getFacultyById(req.params.id);
    sendResponse<IFaculty>(res, {
      success: true,
      message: 'Faculty created successfully',
      data: result,
      statusCode: httpStatus.OK,
    });
  }
);

const updateFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { ...updatedFacultyData } = req.body;
    const result = await FacultyService.updateFaculty(id, updatedFacultyData);

    sendResponse<IFaculty>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Faculty updated successfully by id',
      data: result,
    });
  }
);

const deleteFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const result = await FacultyService.deleteFaculty(id);

    sendResponse<IFaculty>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Faculty deleted successfully',
      data: result,
    });
  }
);

export const FacultyController = {
  getAllFaculty,
  getFacultyById,
  updateFaculty,
  deleteFaculty,
};
