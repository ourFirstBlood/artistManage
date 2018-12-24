import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import Header from './component/Header'
import Ivvform from './component/Ivvform'
import Route from './Route'
import './App.css';
import axios from 'axios'

class App extends Component {

  componentDidMount() {
    
    axios.post(
      'http://www.ivvmedia.com:8080/login',
      {
        user_name: 'admin',
        password: 'adminpass'
      }
    ).then((res) => {
      console.log(res)
    })
  }
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div className="ivv-router">
            <Header />
            <Route />
            <Ivvform />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
