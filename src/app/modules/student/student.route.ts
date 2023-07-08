import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middleware/validateRequest';
import { StudentValidation } from './student.validation';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middleware/auth';
const { ADMIN, FACULTY, STUDENT, SUPER_ADMIN } = ENUM_USER_ROLE;
const router = express.Router();

router.get(
  '/:id',
  auth(ADMIN, FACULTY, SUPER_ADMIN, STUDENT),
  StudentController.getStudentById
);
router.patch(
  '/:id',
  validateRequest(StudentValidation.updateStudentZodSchema),
  auth(ADMIN, FACULTY, SUPER_ADMIN),
  StudentController.updateStudent
);
router.delete(
  '/:id',
  auth(ADMIN, FACULTY, SUPER_ADMIN),
  StudentController.deleteStudent
);
router.get(
  '/',
  auth(ADMIN, FACULTY, SUPER_ADMIN, STUDENT),
  StudentController.getAllStudents
);

export const StudentRoutes = router;
