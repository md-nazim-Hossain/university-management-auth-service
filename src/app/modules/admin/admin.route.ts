import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.validation';

const router = express.Router();

router.get('/:id', AdminController.getAdminById);
router.patch(
  '/:id',
  validateRequest(AdminValidation.updateAdminZodSchema),
  AdminController.updateAdmin
);
router.delete('/:id', AdminController.deleteAdmin);
router.get('/', AdminController.getAllAdmin);

export const AdminRoutes = router;
