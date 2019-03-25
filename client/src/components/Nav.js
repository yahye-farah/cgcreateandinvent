import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Redirect,BrowserRouter,Route, NavLink} from 'react-router-dom';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class Nav extends Component{
    state = {
        signin: false,
        signup: false
    }
    
    clickHandle = () => {
        return (
            <Redirect to='/' />
        )
    }
    render() {
  const { classes } = this.props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            TodoList
          </Typography> 
          <NavLink to='/' style={{ textDecoration: 'none' }} ><Button color="white">Signin</Button></NavLink> 
          <NavLink to="/signup" style={{ textDecoration: 'none' }}><Button  color="white">Signup</Button> </NavLink>
        </Toolbar>
      </AppBar>
    </div>
  );
    }
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Nav);