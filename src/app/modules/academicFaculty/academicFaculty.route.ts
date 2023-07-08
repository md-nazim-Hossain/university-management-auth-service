import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middleware/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import auth from '../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const { ADMIN, FACULTY, STUDENT, SUPER_ADMIN } = ENUM_USER_ROLE;

const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  auth(ADMIN, SUPER_ADMIN),
  AcademicFacultyController.createFaculty
);

router.get(
  '/:id',
  auth(ADMIN, FACULTY, SUPER_ADMIN, STUDENT),
  AcademicFacultyController.getFacultyById
);
router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  auth(ADMIN, SUPER_ADMIN),
  AcademicFacultyController.updateFaculty
);

router.delete(
  '/:id',
  auth(ADMIN, SUPER_ADMIN),
  AcademicFacultyController.deleteFaculty
);

router.get(
  '/',
  auth(ADMIN, FACULTY, SUPER_ADMIN, STUDENT),
  AcademicFacultyController.getAllFaculty
);

export const AcademicFacultyRoutes = router;
