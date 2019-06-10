import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {Switch} from 'react-router-dom';
import Home from './Core/Home';
import Signin from './auth/Signin';
import Profile from './employee/EmployeeProfile';

class MainRouter extends Component {

  render () {
    return (
      <div>
        <Switch>
          <Route exact path='/' component = {Home} />
          <Route path='/signin' component = {Signin} />
          <Route path='/employee/:employeeId' component = {Profile} />
        </Switch>
      </div>
    );
  }
}

export default MainRouter;
