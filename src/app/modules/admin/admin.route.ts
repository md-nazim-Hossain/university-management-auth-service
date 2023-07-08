import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.validation';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middleware/auth';
const { ADMIN, SUPER_ADMIN } = ENUM_USER_ROLE;

const router = express.Router();

router.get('/:id', auth(ADMIN, SUPER_ADMIN), AdminController.getAdminById);
router.patch(
  '/:id',
  validateRequest(AdminValidation.updateAdminZodSchema),
  auth(ADMIN, SUPER_ADMIN),
  AdminController.updateAdmin
);
router.delete('/:id', auth(ADMIN, SUPER_ADMIN), AdminController.deleteAdmin);
router.get('/', auth(ADMIN, SUPER_ADMIN), AdminController.getAllAdmin);

export const AdminRoutes = router;
