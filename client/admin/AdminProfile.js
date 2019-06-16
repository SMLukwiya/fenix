import React, { Component } from 'react';
import { Router, Route, Link, Redirect } from 'react-router-dom';
import {withStyles} from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import {ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from '@material-ui/core';
import ArrowForward from '@material-ui/icons/ArrowForward'
import Person from '@material-ui/icons/Person'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';

import {list} from '../employee/api-employee.js';
import { adminSignout } from '../authenticate/api-auth';
import auth from '../authenticate/authHelper';
import { read } from './api-admin';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1
  },
  button: {
    color:'#ffffff'
  },
  rootList: theme.mixins.gutters({
    padding: theme.spacing(),
    margin: theme.spacing(5)
  }),
  titleList: {
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
  },
  flexContainer: {
  display: 'flex',
  flexDirection: 'row'
  }
})

class AdminProfile extends Component {
  state = {
    admin: '',
    employees: []
  }

  componentDidMount() {
    const jwt = auth.isAuthenticated();

    list({t: jwt.token}).then((data) => {
      if (data.error) {
        console.log(data.error);
      }
      else {
        this.setState({ employees: data});
      }
    })
  }

  logout() {
    adminSignout();
    history.push('/signin');
  }

    render() {
      const {classes} = this.props
        const employees = this.state.employees
        return (
          <div className={classes.root}>
            <AppBar position="static">
              <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  Welcome Admin
                </Typography>
                <Link to='/create'>
                  <Button className={classes.button}>Create New Employee</Button>
                </Link>
                <Link to='/pending'>
                  <Button className={classes.button}>Employee Requests</Button>
                </Link>
                <Button color="inherit" onClick={() => {
                    auth.signout(() => this.props.history.push('/'))}}>Logout</Button>
              </Toolbar>
            </AppBar>
            <Paper className={classes.rootList} elevation={4}>
              <Typography type="title" className={classes.titleList}>
                All Employees
              </Typography>
              <List dense>
               {employees.map((employee, i) => {
                return <Link to={"/employee/" + employee._id} key={i}>
                          <ListItem className={classes.flexContainer} button>
                            <ListItemAvatar>
                              <Avatar>
                                <Person/>
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={employee.name}/>
                            Points Acccumulated:&nbsp;&nbsp;<ListItemText primary={employee.points}/>
                            Seniority Level:&nbsp;&nbsp;<ListItemText primary={employee.seniority}/>
                            <ListItemSecondaryAction>
                              <IconButton>
                                  <ArrowForward/>
                              </IconButton>
                              <IconButton>
                                <DeleteRoundedIcon />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                       </Link>
                     })
                   }
              </List>
            </Paper>
          </div>
        );
    }
}

export default withStyles(styles)(AdminProfile);
