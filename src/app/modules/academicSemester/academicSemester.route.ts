import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { AcademicSemesterController } from './academicSemester.controller';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middleware/auth';
const { ADMIN, FACULTY, STUDENT, SUPER_ADMIN } = ENUM_USER_ROLE;

const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  auth(ADMIN, FACULTY, SUPER_ADMIN),
  AcademicSemesterController.createdSemesters
);
router.get(
  '/:id',
  auth(ADMIN, FACULTY, SUPER_ADMIN, STUDENT),
  AcademicSemesterController.getSemesterById
);
router.patch(
  '/:id',
  validateRequest(AcademicSemesterValidation.updateSemesterZodSchema),
  auth(ADMIN, FACULTY, SUPER_ADMIN),
  AcademicSemesterController.updateSemester
);
router.delete(
  '/:id',
  auth(ADMIN, FACULTY, SUPER_ADMIN),
  AcademicSemesterController.deleteSemester
);
router.get(
  '/',
  auth(ADMIN, FACULTY, SUPER_ADMIN, STUDENT),
  AcademicSemesterController.getAllSemesters
);

export const AcademicSemesterRoutes = router;
