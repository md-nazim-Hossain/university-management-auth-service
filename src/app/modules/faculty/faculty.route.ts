import express from 'express';
import { FacultyController } from './faculty.controller';
import validateRequest from '../../middleware/validateRequest';
import { FacultyValidation } from './faculty.validation';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middleware/auth';
const { ADMIN, FACULTY, SUPER_ADMIN } = ENUM_USER_ROLE;
const router = express.Router();

router.get(
  '/:id',
  auth(ADMIN, FACULTY, SUPER_ADMIN),
  FacultyController.getFacultyById
);
router.patch(
  '/:id',
  validateRequest(FacultyValidation.updateFacultyZodSchema),
  auth(ADMIN, SUPER_ADMIN),
  FacultyController.updateFaculty
);
router.delete(
  '/:id',
  auth(ADMIN, SUPER_ADMIN),
  FacultyController.deleteFaculty
);
router.get(
  '/',
  auth(ADMIN, FACULTY, SUPER_ADMIN),
  FacultyController.getAllFaculty
);

export const FacultyRoutes = router;
