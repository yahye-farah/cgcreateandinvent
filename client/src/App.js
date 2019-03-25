import React, { Component } from 'react';
import Nav from './components/Nav';
import './App.css';
import {BrowserRouter,Route} from 'react-router-dom'
import Singin from './components/Signin';
import Singup from './components/Signup';
import Dashboard from './components/dashboard'


class App extends Component {
  render() {
    return (
      <div className="App">
        
        <BrowserRouter>
        <Nav />
        <Route path='/' exact component={Singin} />
        <Route path='/signup' exact component={Singup} />
        <Route path='/dashboard' exact component={Dashboard} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
