import express from 'express';
import { AcademicDepartmentController } from './academicDepartment.controller';
import validateRequest from '../../middleware/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middleware/auth';
const { ADMIN, FACULTY, STUDENT, SUPER_ADMIN } = ENUM_USER_ROLE;

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema
  ),
  auth(ADMIN, FACULTY, SUPER_ADMIN),
  AcademicDepartmentController.createAcademicDepartment
);

router.get(
  '/:id',
  auth(ADMIN, FACULTY, SUPER_ADMIN, STUDENT),
  AcademicDepartmentController.getAcademicDepartmentById
);
router.patch(
  '/:id',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentZodSchema
  ),
  auth(ADMIN, FACULTY, SUPER_ADMIN),
  AcademicDepartmentController.updateAcademicDepartment
);

router.delete(
  '/:id',
  auth(ADMIN, FACULTY, SUPER_ADMIN),
  AcademicDepartmentController.deleteAcademicDepartment
);
router.get(
  '/',
  auth(ADMIN, FACULTY, SUPER_ADMIN, STUDENT),
  AcademicDepartmentController.getAllAcademicDepartment
);

export const AcademicDepartmentRoutes = router;
