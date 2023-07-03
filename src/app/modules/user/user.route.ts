import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(UserValidation.createStudentZodSchema),
  UserController.createdStudent
);

router.post(
  '/create-faculty',
  validateRequest(UserValidation.createFacultyZodSchema),
  UserController.createdFaculty
);

router.post(
  '/create-admin',
  validateRequest(UserValidation.createAdminZodSchema),
  UserController.createdAdmin
);

export const UserRoutes = router;
