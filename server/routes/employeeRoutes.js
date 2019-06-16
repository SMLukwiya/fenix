import express from 'express';
import employeeController from '../controllers/employeeControllers';
import authenticateController from '../controllers/authenticateController';

const router = express.Router();


//List all employees and create new employees(Admin Routes)
router.route('/api/admin/employees')
  .get(authenticateController.requireSignin, employeeController.list)
  .post(authenticateController.requireSignin, employeeController.create)

//Update and delete employee(Admin Routes)
router.route('/api/access/')//:employeeId
  .put(authenticateController.requireSignin, authenticateController.hasAuthorization, employeeController.update)
  .delete(authenticateController.requireSignin, authenticateController.hasAuthorization, employeeController.remove);

//Routes accessible by employee
router.route('/api/employee/:uniqueId')
  .get(authenticateController.requireSignin, employeeController.read)
  .put(authenticateController.requireSignin, authenticateController.hasAuthorization, employeeController.update)

router.param('uniqueId', employeeController.employeeById);

export default router;
