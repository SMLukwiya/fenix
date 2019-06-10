// Controllers for Employee
import Employee from '../models/employeeModel';
import _ from 'lodash';

//Find employee by ID
const employeeById = (req, res, next, id) => {
  Employee.findById(id).exec((err, employee) => {
    if (err || !employee) {
      return res.status('400').json({
        error: "Employee not found"
      })
    }
    req.profile = employee
    next();
  })
}

//Handle GET request for an employee
const read = (req, res) => {
  //Remove password and salt value when returning the user for safety
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
}

//Handle PUT request for an employee
const update = (req, res, next) => {
  let employee = req.profile;
  employee = _.extend(employee, req.body);
  employee.updated = Date.now();
  employee.save((err) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    employee.hashed_password = undefined;
    employee.salt = undefined;
    res.json(employee);
  })
}


export default { employeeById, read, update };
