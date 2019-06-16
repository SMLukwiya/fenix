import express from 'express';
import authenticateController from '../controllers/authenticateController';
import adminController from '../controllers/adminControllers';

const router = express.Router();

router.route('/api/admin/employee')
  .get(authenticateController.requireSignin, adminController.read)


export default router;
