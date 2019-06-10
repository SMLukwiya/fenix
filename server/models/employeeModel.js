var mongoose = require('mongoose');
import crypto from 'crypto';

//Assuming this is the employee model
const EmployeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required"
    },
    email: {
      type: String,
      trim: true,
      unique: "Email already exists",
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
      required: "Email is required"
    },
    seniority: {
      type: String
    },
    created: {
      type: Date,
      default: Date.now
    },
    updated: Date,
    points: {
      type: Number
    }
  });

//Virtual to handle password encryption
EmployeeSchema.virtual('password').set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function () {
    return this._password;
  })

//Validate password before attempting to save it
EmployeeSchema.path('hashed_password').validate(function (v) {
  if (this._password && this._password.length < 6) {
    this.invalidate('password', "Password must be atleast 6 characters");
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', "Password is required");
  }
}, null);

EmployeeSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return '';
    try {
      return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    }
    catch (err) {
      return '';
    }
  },
  makeSalt: function() {
    return Math.round( (new Date().valueOf() * Math.random()) ) + '';
  }
}


export default mongoose.model('Employee', EmployeeSchema);
