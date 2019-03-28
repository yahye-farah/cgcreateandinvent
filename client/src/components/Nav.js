import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Redirect,BrowserRouter,Route, NavLink} from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import '../App.css'

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
  button: {
    textColor: 'white'
  }
};

class Nav extends Component{
  constructor(props) {
    super(props)
  }
   
    logOut = () => {
     this.props.LogOut()
    }
    render() {
  const { classes,isLoggin } = this.props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            TodoList
          </Typography> 
          <NavLink to='/' style={{ textDecoration: 'none' }} ><Button id="button">{isLoggin ? '' : 'Signin' }</Button></NavLink> 
          <NavLink to="/signup" style={{ textDecoration: 'none' }}><Button  id ="button">{isLoggin ? '' : 'Signup' }</Button> </NavLink>
          <NavLink to="/" style={{ textDecoration: 'none' }}><Button  id="button" onClick= {this.logOut}>{isLoggin ? 'Logout' : '' }</Button> </NavLink>
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