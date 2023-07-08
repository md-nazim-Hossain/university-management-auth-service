import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);
// router.patch(
//   '/:id',
//   validateRequest(FacultyValidation.updateFacultyZodSchema),
//   FacultyController.updateFaculty
// );
// router.delete('/:id', FacultyController.deleteFaculty);
// router.get('/', FacultyController.getAllFaculty);

export const AuthRoutes = router;
