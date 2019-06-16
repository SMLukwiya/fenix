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
import Divider from '@material-ui/core/Divider';
import {Redirect, Link} from 'react-router-dom';

import {signin} from './api-auth';
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

class Signin extends Component {
  state = {
      email: '',
      password: '',
      error: '',
      link: '',
      open: false
  }

  clickSubmit = () => {
    const employee = {
      name: this.state.name || undefined,
      password: this.state.password || undefined
    }

    signin(employee).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        auth.authenticate(data, () => {
          this.setState({open: true,link: data})
        })
      }
    })
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value})
  }

  render() {
    const {classes} = this.props

    if (this.state.open) {
      return <Redirect to={"/employee/"+this.state.link.employee._id}/>
    }


    return (
      <Card className={classes.card}>
        <Typography variant="h2" component="h1">Fenix International</Typography>
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
        <Link to="/signin">
          <Button color="primary" onClick={this.clickAdmin} className={classes.admin}>Admin</Button>
        </Link>
      </Card>
    )
  }
}


export default withStyles(styles)(Signin);
