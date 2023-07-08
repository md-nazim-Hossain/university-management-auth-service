import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middleware/auth';
const { ADMIN, FACULTY, SUPER_ADMIN } = ENUM_USER_ROLE;

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(UserValidation.createStudentZodSchema),
  auth(ADMIN, FACULTY, SUPER_ADMIN),
  UserController.createdStudent
);

router.post(
  '/create-faculty',
  validateRequest(UserValidation.createFacultyZodSchema),
  auth(ADMIN, SUPER_ADMIN),
  UserController.createdFaculty
);

router.post(
  '/create-admin',
  validateRequest(UserValidation.createAdminZodSchema),
  auth(ADMIN, SUPER_ADMIN),
  UserController.createdAdmin
);

export const UserRoutes = router;
