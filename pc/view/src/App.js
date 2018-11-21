import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom'
import Route from './Route'
import Header from './component/Header'
import './App.css';
import FormField from './component/FormField';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
        <div className="ivv">
          <Header/>
          <Route/>
        </div>  
        </BrowserRouter> 
        <FormField/>
      </div>
    );
  }
}

export default App;
