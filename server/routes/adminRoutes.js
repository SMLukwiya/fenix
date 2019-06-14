import express from 'express';
import adminController from '../controllers/adminControllers';
import authenticateController from '../controllers/authenticateController';
import employeeController from '../controllers/employeeControllers';

const router = express.Router();

router.route('/api/admin/:adminId')
  .get(authenticateController.requireSignin, authenticateController.hasAuthorization, adminController.read, employeeController.list)

//Create employee and get all employee list
router.route('/api/admin/employees')
  .post(authenticateController.requireSignin, authenticateController.hasAuthorization, employeeController.create)

//Update and delete employee
router.route('/api/admin/:employeeId')
  .put(authenticateController.requireSignin, authenticateController.hasAuthorization, employeeController.update)
  .delete(authenticateController.requireSignin, authenticateController.hasAuthorization, employeeController.remove);

router.param('employeeId', employeeController.employeeById);

export default router;
