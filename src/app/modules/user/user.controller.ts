/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IUser } from './user.interface';

const createdStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { student, ...userData } = req.body;
    const result = await UserService.createStudent(student, userData);

    sendResponse<IUser>(res, {
      success: true,
      message: 'User created successfully',
      data: result,
      statusCode: httpStatus.OK,
    });
  }
);

const createdFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { faculty, ...userData } = req.body;
    const result = await UserService.createFaculty(faculty, userData);

    sendResponse<IUser>(res, {
      success: true,
      message: 'User created successfully',
      data: result,
      statusCode: httpStatus.OK,
    });
  }
);

export const UserController = {
  createdStudent,
  createdFaculty,
};
