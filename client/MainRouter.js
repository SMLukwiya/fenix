import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {Switch} from 'react-router-dom';
import Signin from './authenticate/Signin';
import AdminSignIn from './authenticate/AdminSignin';
import Profile from './employee/EmployeeProfile';
import AdminProfile from './admin/AdminProfile';
import CreateAccount from './employee/CreateAccount';

class MainRouter extends Component {

  render () {
    return (
      <div>
        <Switch>
          <Route exact path='/' component = {Signin} />
          <Route path='/employee/:employeeId' component = {Profile} />
          <Route path='/signin' component = {AdminSignIn} />
          <Route path='/access/:adminId' component = {AdminProfile} />
          <Route path='/create' component = {CreateAccount} />
        </Switch>
      </div>
    );
  }
}

export default MainRouter;
