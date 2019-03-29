import React, { Component } from 'react';
import Nav from './components/Nav';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import Singin from './components/Signin';
import Singup from './components/Signup';
import Dashboard from './components/dashboard'
import CreateTodo from './components/createTodo'
import UpdateTodo from '../src/components/updateTodo'


class App extends Component {
  state = {
    isLoggin: false
  }
  componentDidMount() {
    if (window.localStorage.getItem('token')) {
      this.setState({
        isLoggin: true
      })
    }
  }
  navbar = () => {
    this.setState({
      isLoggin: true
    })
  }
  LogOut = () => {
    window.localStorage.setItem('token', '');
    this.setState({
      isLoggin: false
    })
  }
  render() {
    return (
      <div className="App">

        <BrowserRouter>
          <Nav isLoggin={this.state.isLoggin} LogOut={this.LogOut} />
          <Route path='/' exact render={() => {
            return (

              <Singin navbar={this.navbar} />
            )
          }}
          />
          <Route path='/signup' exact render={() => {
            return (

              <Singup navbar={this.navbar} isLoggin={this.isLoggin} />
            )
          }}
          />
          <Route path='/dashboard' exact component={Dashboard} />
          <Route path='/create' exact component={CreateTodo} />
          <Route path='/updateTodo' exact component={UpdateTodo} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
