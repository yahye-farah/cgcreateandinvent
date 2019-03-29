import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Background from '../image/event-management.jpg';
import { Redirect } from 'react-router-dom';
import axios from 'axios'

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 600,
      height: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    //marginTop: theme.spacing.unit * 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    //margin: theme.spacing.unit,
    //backgroundColor: theme.palette.primary.main,
    backgroundImage: "url(" + Background + ")"
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 1,
    marginRight: theme.spacing.unit * 2
  },
  inputfield: {
    //width: 300,
    height: 100
    // margin: 100,
  },
  Input: {
    marginRight: theme.spacing.unit * 2
  }
});


class UpdateTodo extends Component {
  constructor(props) {
    super(props)
    if (props.location.state !== undefined) {
      this.state = {
        id: props.location.state.todo._id,
        title: props.location.state.todo.title,
        description: props.location.state.todo.description,
        redirectToDashboard: false,
        dayandtime: ''
      }
    } else {
      this.state = {
        title: "unauthorized"
      }
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleBack = (e) => {
    e.preventDefault();
    this.setState({
      redirectToDashboard: true
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let todo = {
      id: this.state.id,
      title: this.state.title,
      description: this.state.description,
      userId: window.localStorage.getItem('userName'),
      dateandtime: this.state.dayandtime
    }
    if (todo.title === '' || todo.description === '') {
      return alert("Please enter title and description")
    }
    const config = {
      headers: { 'Authorization': "bearer " + window.localStorage.getItem('token') }
    };
    axios.post('/todo/update', todo, config)
      .then(result => {
        if (result.data === "authfailed") {
          return window.localStorage.setItem('token', '')
          window.location.reload()
        }

        this.setState({
          redirectToDashboard: true
        })
      })

  }

  render() {
    const { classes } = this.props
    const UpdateForm = (
      <div className={classes.avatar}>
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
              Update Todo
            </Typography>
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel >Title</InputLabel>
                <Input name="title" autoFocus onChange={this.handleChange} value={this.state.title} />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel color="primary">Description</InputLabel>
                <Input name="description" type="text" className={classes.inputfield} onChange={this.handleChange} value={this.state.description} />
              </FormControl>
              <label>Date and Time</label><input type="datetime-local" name="dayandtime" onChange={this.handleChange} className={classes.Input}></input>
              <Button
                //fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.handleBack}
              >
                Back
              </Button>
              <Button
                //fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.handleSubmit}
              >
                Submit
              </Button>

            </form>

          </Paper>
        </main>
      </div>
    )
    if (window.localStorage.getItem('token') !== '' && this.state.redirectToDashboard === false && this.state.title !== 'unauthorized') {
      return (
        <div>
          {UpdateForm}
        </div>
      )
    }
    if (this.state.redirectToDashboard) {
      return (
        <Redirect to="/" />
      )
    }
    return (
      <Redirect to="/" />
    )
  };
}


export default withStyles(styles)(UpdateTodo);