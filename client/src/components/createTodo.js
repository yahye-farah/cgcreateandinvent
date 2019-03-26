import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Background from '../image/event-management.jpg'

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 600,
      height:800,
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
    //backgroundImage:require('../image/planning.png')
    backgroundImage: "url(" + Background + ")"
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },//
  submit: {
    marginTop: theme.spacing.unit * 1,
  },
  inputfield : {
    //width: 300,
    height:100
    // margin: 100,
  }
});


class Singin extends Component {
 
  render(){
    const { classes } = this.props;
    return (
      <div className={classes.avatar}>
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
              Create Todo
            </Typography>
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel >Title</InputLabel>
                <Input id="email" name="email"  autoFocus onChange={this.handleChange} />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel color="primary">Description</InputLabel>
                <Input name="password" type="text"  className={classes.inputfield} autoComplete="current-password" onChange={this.handleChange}/>
              </FormControl>
              <Button
                fullWidth
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
    };
}


export default withStyles(styles)(Singin);