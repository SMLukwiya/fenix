import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {Switch} from 'react-router-dom';
import Signin from './authenticate/Signin';
import AdminSignIn from './authenticate/AdminSignin';
import Profile from './employee/EmployeeProfile';

class MainRouter extends Component {

  render () {
    return (
      <div>
        <Switch>
          <Route path='/' component = {Signin} />
          <Route path='/employee/:employeeId' component = {Profile} />
          <Route path='/auth/Admin' component = {AdminSignIn} />
        </Switch>
      </div>
    );
  }
}

export default MainRouter;
