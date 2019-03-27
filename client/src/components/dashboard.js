import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Todo from './Todo';
import CreateTodo from './createTodo'
import { Redirect, NavLink } from 'react-router-dom'

const styles = {
    root: {
        flexGrow: 1,
    },
};

class Dashboard extends Component {
    state = {
        value: 0,
        isOpen: false,
        todos: []
    };

    componentDidMount() {
        
    }

    handleClose = () => {
        this.setState({
            isOpen: false
        })
    }

    handleChange = (event, value) => {
        console.log('value', value)
        this.setState({ value });
        if (value === 1) {
            return (
                <Redirect to="/create" />  
            )
                         
        }
    };
    render() {
        const { classes } = this.props
        const Menu = (   <Paper className={classes.root}>
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
        if(this.state.value === 2) {
            return (
                    <Redirect to="/create" />
            )
        }
        if(window.localStorage.getItem('token') !== '') {
        return (
            <div>
                {Menu}
                <Todo />
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