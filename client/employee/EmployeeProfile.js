import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';
import Person from '@material-ui/icons/Person';
import Divider from '@material-ui/core/Divider';
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';

import auth from '../authenticate/authHelper';
import { read } from './api-employee';

const styles = theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5)
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.protectedTitle
  }
})

class Profile extends Component {
  constructor({match}) {
    super()
    this.state = {
      employee: '',
      redirectToSignin: false
    }
    this.match = match
  }
  init = (employeeId) => {
    const jwt = auth.isAuthenticated();
    read({
      employeeId: employeeId
    },{
      t: jwt.token
    }).then((data) => {
      if (data.error) {
        this.setState({redirectToSignin: true});
      }
      else {
        this.setState({employee: data});
      }
    })
  }

  componentDidMount = () => {
    this.init(this.match.params.employeeId)
  }
  componentWillReceiveProps = (props) => {
    this.init(props.match.params.employeeId)
  }

  render() {
    const {classes} = this.props
    const redirectToSignin = this.state.redirectToSignin

    if (redirectToSignin) {
      return <Redirect to='/' />
    }
    return (
      <div>
        <Paper className={classes.root} elevation={4}>
          <Typography type="title" className={classes.title}> Profile </Typography>
          <List dense>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <Person />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={this.state.employee.name} secondary={this.state.employee.email} />
                <ListItemSecondaryAction>
                  <Link to={"/employee/edit" + this.state.employee.id}>
                    <IconButton aria-label="Edit" color="primary">
                      <Edit />
                    </IconButton>
                  </Link>
                </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary={"TotalPoints:" + this.state.employee.points}/>
            </ListItem>
          </List>
        </Paper>
      </div>
    )
  }
}


export default withStyles(styles)(Profile);
