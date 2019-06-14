import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import {CardActions, CardContent} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
//import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import {DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import {Link} from 'react-router-dom';

import {create} from './api-employee.js';

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(5)
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  },
  textField: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  }
})

class CreateAccount extends Component {
  state = {
      name: '',
      password: '',
      email: '',
      points: '',
      seniority: '',
      open: false,
      error: ''
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value})
  }

  clickSubmit = () => {
    const employee = {
      name: this.state.name || undefined,
      email: this.state.email || undefined,
      password: this.state.password || undefined,
      points: this.state.points || undefined,
      seniority: this.state.points
    }
    create(employee).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({error: '', open: true})
      }
    })
  }

  render() {
    const {classes} = this.props
    return (<div>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            Create New Employee Account
          </Typography>
          <TextField id="name" label="Name" className={classes.textField} value={this.state.name} onChange={this.handleChange('name')} margin="normal"/><br/>
          <TextField id="email" type="email" label="Email" className={classes.textField} value={this.state.email} onChange={this.handleChange('email')} margin="normal"/><br/>
          <TextField id="password" type="password" label="Password" className={classes.textField} value={this.state.password} onChange={this.handleChange('password')} margin="normal"/>
          <TextField id="points" type="password" label="Points" className={classes.textField} value={this.state.points} onChange={this.handleChange('points')} margin="normal"/>
          <TextField id="seniority" type="password" label="Seniority" className={classes.textField} value={this.state.seniority} onChange={this.handleChange('seniority')} margin="normal"/>
          <br/> {
            this.state.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {this.state.error}</Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" onClick={this.clickSubmit} className={classes.submit}>Create</Button>
        </CardActions>
      </Card>
      <Dialog open={this.state.open} disableBackdropClick={true}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>)
  }
}

export default withStyles(styles)(CreateAccount)
