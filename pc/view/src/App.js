import React, { Component } from 'react';
import Route from './route/Route'
import { hot } from 'react-hot-loader/root'
import './App.scss';

class App extends Component {
  render() {
    return (
        <div className="App">
          <Route/>
        </div>
    );
  }
}

export default hot(App)
