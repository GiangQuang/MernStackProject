import axios from 'axios';
import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import MyProvider from './contexts/MyProvider';
import Login from './components/LoginComponent';
import Main from './components/MainComponent';
axios.defaults.baseURL= "https://mern-stack-project-1z4i.onrender.com"

class App extends Component {
  render() {
    return (
      <MyProvider>
        <Login />
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </MyProvider>
    );
  }
}

export default App;

