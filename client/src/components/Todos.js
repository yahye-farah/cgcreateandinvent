import React, { Component } from 'react';
import Todo from './Todo';

// class Todos extends Component {
//     constructor(props){
//         super(props);
//     }

//     render() {
//         console.log('',this.props.todos)
//         if(this.props.todos.length > 0) {
//             return (
//                 <div>
//                 {this.props.todos.map(todo => (
//                     <Todo 
//                     todo = {todo}
//                     />
//                   ))}
//                   </div>
//             )
//         }else {
//             return (
//             <h3>Loading.....</h3>
//             )
//         }

//     }
// }

//export default Todos;

//import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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
        const { classes } = this.props;
        const Todos = (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    {this.props.todos.map(todo => (
                        <Grid item xs={6} sm={3}>
                            <Todo
                                todo={todo}
                            />

                        </Grid>
                    ))}
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
            <h3>You don't have todo yet</h3>
        )
        //   return ;
    }
}

FullWidthGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullWidthGrid);