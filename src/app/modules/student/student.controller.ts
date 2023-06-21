/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IStudent } from './student.interface';
import { StudentService } from './student.service';
import pick from '../../../shared/pick';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationFields } from '../../../constants/paginationConst';
import { StudentConstant } from './student.constant';

const getAllStudents = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, StudentConstant.studentFiltersFields);
    const paginationOptions: IPaginationOptions = pick(
      req.query,
      paginationFields
    );
    const result = await StudentService.getAllStudents(
      filters,
      paginationOptions
    );

    sendResponse<IStudent[]>(res, {
      success: true,
      message: 'All Students retrieve successfully',
      meta: result.meta,
      data: result.data,
      statusCode: httpStatus.OK,
    });
  }
);

const getStudentById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await StudentService.getStudentById(id);

    sendResponse<IStudent>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Student retrieved successfully by id',
      data: result,
    });
  }
);

const updateStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { ...updatedStudentData } = req.body;
    const result = await StudentService.updateStudent(id, updatedStudentData);

    sendResponse<IStudent>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Student updated successfully by id',
      data: result,
    });
  }
);

const deleteStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const result = await StudentService.deleteStudent(id);

    sendResponse<IStudent>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Student deleted successfully',
      data: result,
    });
  }
);

export const StudentController = {
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
