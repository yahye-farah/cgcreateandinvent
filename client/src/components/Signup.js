import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';
import {Redirect} from 'react-router-dom'


const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },//
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});


class Singin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName:'',
      lastName: '',
      userName: '',
      password: '',
    }
  }
 
  handleChange = (e) => {
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {firstName,lastName,userName,password} = this.state
    if(firstName === "" || lastName === "" || userName === "" || password === "") {
      alert("Please fill all the forms")
    }else {
      axios.post('/auth/signup ',this.state)
      .then(result => {
        let token = result.data.token
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('userName',result.data.userName)
        this.props.navbar()
      })
    }
    
  }

  render(){
    let token = window.localStorage.getItem('token')
    const { classes, isLoggin } = this.props;
    const SignupForm = (
      <div>
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form}>
          <FormControl margin="normal" required fullWidth>
              <InputLabel >Firstname</InputLabel>
              <Input  name="firstName"  autoFocus onChange={this.handleChange} />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel >Lastname</InputLabel>
              <Input  name="lastName" autoFocus onChange={this.handleChange} />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel >Username</InputLabel>
              <Input name="userName" autoFocus onChange={this.handleChange} />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleChange}/>
            </FormControl>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleSubmit}
            >
              Sign up
            </Button>
            
          </form>
          
        </Paper>
      </main>
    </div>
    )
   if(token !=='' && token !== null) {
    return (
      <Redirect to="/dashboard" />
    )
   }

   if(isLoggin === true) {
    return (
      <Redirect to="/dashboard" />
    )
   }else {
   return (
     <div>
    {SignupForm}
    </div>
   )
   }
   
  };
}


export default withStyles(styles)(Singin);