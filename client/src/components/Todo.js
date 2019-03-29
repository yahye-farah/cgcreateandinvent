import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Redirect} from 'react-router-dom'

const styles = {
  card: {
    maxWidth: 345,
  },

};

class Todo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkedB: false,
      redirectUpdate: false
    }
  }

  redirectUpdateComponent = () => {
    console.log('kkkk')
    this.setState({
      redirectUpdate: true
    })
  }
  deleteTodo = (id) => {
    const config = {
      headers: { 'Authorization': "bearer " + window.localStorage.getItem('token') }
    };
    axios.post(`/todo/delete`, { id: id }, config).then(result => {
      console.log('deleted successfuly')
    })
  }
  handleChange = (name, id, todo) => event => {
    const config = {
      headers: { 'Authorization': "bearer " + window.localStorage.getItem('token') }
    };
    this.setState({ [name]: event.target.checked }, () => {
      if (this.state.checkedB === true) {
        this.props.filterOutDeletedOne(id, 'active')
        this.props.filterOutCompletedOne(todo);
        axios.get(`/todo/completed/${id}`, config).then(result => {
          console.log(result);
        })
      }
    })

  };

  render() {
    const { classes, todo, filterOutDeletedOne } = this.props;
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {todo.title}
            </Typography>
            <Typography component="p">
              {todo.description}
            </Typography>
            <Typography component="p">
              {todo.dateandtime ? todo.dateandtime.slice(0, 10) : ''}
            </Typography>
            <Typography component="p">
              {todo.dateandtime ? todo.dateandtime.slice(11) : ''}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.checkedB}
                onChange={this.handleChange('checkedB', todo._id, todo)}
                value="checkedB"
              />
            }
            label="Completed"
          />
          {/* <Button size="small" color="primary">
          Completed
        </Button> */}
          <Button size="small" color="primary" onClick={this.redirectUpdateComponent}>
            {this.state.redirectUpdate ? <Redirect to={{
            pathname: '/updateTodo',
            state: { todo: todo }
        }}
/>: 'update'}
        </Button>
          <Button size="small" color="primary" onClick={() => {
            this.deleteTodo(todo._id)
            filterOutDeletedOne(todo._id, 'active')
          }}>
            Delete
        </Button>
        </CardActions>
      </Card>
    );
  }
}

Todo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Todo);