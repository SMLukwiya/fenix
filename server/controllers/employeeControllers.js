// Controllers for Employee
import Employee from '../models/employeeModel.js';
import _ from 'lodash';
import errorHandler from '../errorHelper/databaseErrorHandler'


//Create an employee
const create = (req, res, next) => {
  const employee = new Employee(req.body);
  employee.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.status(200).json({
      message: "successfully entered into the system"
    })
  })
}

//View all emloyees
const list = (req, res, next) => {
  Employee.find((err, employees) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.status(200).json(employees)
  }).select('name email updated created');
}

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

//Remove an employee
const remove = (req, res, next) => {
  let employee = req.profile
  employee.remove((err, deletedEmployee) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    deletedEmployee.hashed_password = undefined;
    deletedEmployee.salt = undefined;
    res.json(deletedEmployee);
  })
}

export default { create, list, employeeById, read, update, remove };
