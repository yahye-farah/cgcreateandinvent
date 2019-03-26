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
    };

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
                <Tab label="All" />
                <Tab label="Create Todo" />
                <Tab label="Active" />
                <Tab label="Completed" />
            </Tabs>
        </Paper>)
        if(this.state.value === 1) {
            return (
                <div>
                    {Menu}
                    <CreateTodo />
                </div>
            )
        }
        return (
            <div>
                {Menu}
                <Todo />
            </div>
        )

    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard)