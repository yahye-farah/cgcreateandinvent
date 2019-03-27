import React, { Component } from 'react';
import Todo from './Todo';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CompletedTodos from './completedTodos'

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class FullWidthGrid extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { classes, filterOutDeletedOne } = this.props;
        const Todos = (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    {this.props.todos.map(todo => {
                        console.log('lll',todo.completed)
                        if(todo.completed === 'false') {
                            console.log('active', todo)
                            return (
                        <Grid item xs={12} sm={3} >
                            <Todo
                                todo={todo}
                                filterOutDeletedOne= {filterOutDeletedOne}
                            />

                        </Grid>
                      )}else {
                          console.log('compeleted',todo)
                          return (
                            <Grid item xs={12} sm={3} >
                            <CompletedTodos
                                todo={todo}
                                filterOutDeletedOne= {filterOutDeletedOne}
                            />

                        </Grid>
                          )
                      }
                      
                      
                      })}
                </Grid>
            </div>
        )
        if (this.props.todos.length > 1) {
            return (
                <div>
                    {Todos}
                </div>
            )
        }
        return (
            <h3>You don't have any todo yet</h3>
        )
    }
}

FullWidthGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullWidthGrid);