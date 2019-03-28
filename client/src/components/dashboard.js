import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Todos from './Todos';
import CreateTodo from './createTodo'
import { Redirect, NavLink } from 'react-router-dom'
import axios from 'axios';

const styles = {
    root: {
        flexGrow: 1,
    },
};

class Dashboard extends Component {
    state = {
        value: 0,
        isOpen: false,
        todos: [],
        completed: []
    };

    componentDidMount() {
        const config = {
            headers: { 'Authorization': "bearer " + window.localStorage.getItem('token') }
        };
        axios.get(`/todo/active/${window.localStorage.userName}`, config)
            .then(result => {
                if (result.data === "authfailed") {
                    return window.localStorage.setItem('token', '')
                    window.location.reload()
                }
                this.setState({
                    todos: result.data
                })
            })

        axios.get(`/todo/complete/${window.localStorage.userName}`, config)
            .then(result => {
                if (result.data === "authfailed") {
                    return window.localStorage.setItem('token', '')
                    window.location.reload()
                }
                this.setState({
                    completed: result.data
                })
            })
    }

    filterOutCompletedOne = (todo) => {
        todo.completed = true;
        this.state.completed.unshift(todo);
    }
    filterOutDeletedOne = (id, active) => {
        if (active === 'active') {
            let filteredTodos = this.state.todos.filter(todo => {
                if (todo._id !== id) {
                    return todo;
                }
            })
            this.setState({
                todos: filteredTodos
            })
        } else {
            let filteredTodos = this.state.completed.filter(todo => {
                if (todo._id !== id) {
                    return todo;
                }
            })
            this.setState({
                completed: filteredTodos
            })
        }

    }


    handleClose = () => {
        this.setState({
            isOpen: false
        })
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };
    render() {
        const { classes } = this.props
        const Menu = (<Paper className={classes.root}>
            <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="Active" />
                <Tab label="Completed" />
                <Tab label="Create Todo" />
            </Tabs>
        </Paper>)

        if (this.state.value === 2) {
            return (
                <Redirect to="/create" />
            )
        }
        if (this.state.value === 1) {
            return (
                <div>
                    {Menu}
                    <Todos todos={this.state.completed}
                        filterOutDeletedOne={this.filterOutDeletedOne}
                    />
                </div>
            )
        }
        if (window.localStorage.getItem('token') !== '' && this.state.value === 0) {
            return (
                <div>
                    {Menu}
                    <Todos todos={this.state.todos}
                        filterOutDeletedOne={this.filterOutDeletedOne}
                        filterOutCompletedOne={this.filterOutCompletedOne}
                    />
                </div>
            )
        }
        return (
            <Redirect to="/" />
        )

    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard)