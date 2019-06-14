import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/styles';
import {Redirect} from 'react-router-dom';

import {adminSignin} from './api-auth';
import auth from './authHelper';

const styles = (theme) => {
  return ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
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
  },
  admin: {
    marginRight: theme.spacing(),
    color: theme.palette.openTitle
  }
})
}

class AdminSignIn extends Component {
  state = {
      name: '',
      password: '',
      error: '',
      redirectToReferrer: false
  }

  clickSubmit = () => {
    const admin = {
      name: this.state.name || undefined,
      password: this.state.password || undefined
    }

    adminSignin(admin).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        auth.authenticate(data, () => {
          this.setState({redirectToReferrer: true})
        })
      }
    })
  }


  handleChange = name => event => {
    this.setState({[name]: event.target.value})
  }

  render() {
    const {classes} = this.props
    const {from} = this.props.location.state || {
      from: {
        pathname: '/access/:adminId'
      }
    }
    const {redirectToReferrer} = this.state
    if (redirectToReferrer) {
      return (<Redirect to={from}/>)
    }

    return (
      <Card className={classes.card}>
        <Typography variant="h2" component="h1">Fenix International Admin</Typography>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            Sign In
          </Typography>
          <TextField id="name" type="name" label="Name" className={classes.textField} value={this.state.name} onChange={this.handleChange('name')} margin="normal"/><br/>
          <TextField id="password" type="password" label="Password" className={classes.textField} value={this.state.password} onChange={this.handleChange('password')} margin="normal"/>
          <br/> {
            this.state.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {this.state.error}
            </Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" onClick={this.clickSubmit} className={classes.submit}>Submit</Button>
        </CardActions>
      </Card>
    )
  }
}


export default withStyles(styles)(AdminSignIn);
