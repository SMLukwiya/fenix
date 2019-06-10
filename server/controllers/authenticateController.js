import Employee from '../models/employeeModel';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import config from '../../config/config';

//Handle Signin from employee and authenticate a user.
const signin = (req, res) => {
  User.findOne({"email": req.body.email}, (err, employee) => {
    if (err || !employee) {
      return res.status('401').json({
        error: "Employee not found"
      })
    }
    if (!employee.authenticate(req.body.password)) {
      return res.status('401').send({
        error: "Email and password don't match"
      })
    }
    const token = jwt.sign({ _id: employee._id }, config.jwtSecret);
    res.cookie("t", token, { expire: new Date() + 9999 });

    return res.json({
      token,
      employee: { _id: employee._id, name: employee.name, email: employee.email }
    });
  })
}

//Handle Signout by employee and remove token from session storage
const signout = (req, res) => {
  res.clearCookie("t");
  return res.status(200).json({
    message: "Signed out"
  })
}

//check authorization
const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: 'auth'
})

//Grant access if authorized
const hasAuthorization = (req, res) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!(authorized)) {
    return res.status('403').json({
      error: "Employee is not authorized"
    })
  }
  next();
}

export default { signin, signout, requireSignin, hasAuthorization };
