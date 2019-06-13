import express from 'express';
import employeeController from '../controllers/employeeControllers';
import authenticateController from '../controllers/authenticateController';

const router = express.Router();

//Routes accessible by employee
router.route('/api/employee/:employeeId')
  .get(authenticateController.requireSignin, employeeController.read)
  .put(authenticateController.requireSignin, authenticateController.hasAuthorization, employeeController.update)

router.param('employeeId', employeeController.employeeById);

export default router;
