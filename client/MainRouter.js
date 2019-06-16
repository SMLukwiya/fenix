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
          <Route path='/signin' component = {AdminSignIn} />
          <Route path='/access/admin' component = {AdminProfile} />
          <Route path='/create' component = {CreateAccount} />
          <Route path='/employee/:uniqueId' component = {Profile} />
        </Switch>
      </div>
    );
  }
}

export default MainRouter;
