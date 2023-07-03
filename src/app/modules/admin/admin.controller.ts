/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/paginationConst';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IAdmin } from './admin.interfcae';
import { AdminConstant } from './admin.constant';
import { AdminService } from './admin.service';

const getAllAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, AdminConstant.adminFiltersFields);
    const paginationOptions: IPaginationOptions = pick(
      req.query,
      paginationFields
    );
    const result = await AdminService.getAllAdmin(filters, paginationOptions);

    sendResponse<IAdmin[]>(res, {
      success: true,
      message: 'Get All admin retrieved successfully',
      meta: result?.meta,
      data: result?.data,
      statusCode: httpStatus.OK,
    });
  }
);

const getAdminById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AdminService.getAdminById(req.params.id);
    sendResponse<IAdmin>(res, {
      success: true,
      message: 'Get admin by id retrieved successfully',
      data: result,
      statusCode: httpStatus.OK,
    });
  }
);

const updateAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { ...updatedAdminData } = req.body;
    const result = await AdminService.updateAdmin(id, updatedAdminData);

    sendResponse<IAdmin>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Admin updated successfully by id',
      data: result,
    });
  }
);

const deleteAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const result = await AdminService.deleteAdmin(id);

    sendResponse<IAdmin>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Admin deleted successfully',
      data: result,
    });
  }
);

export const AdminController = {
  getAllAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
};
