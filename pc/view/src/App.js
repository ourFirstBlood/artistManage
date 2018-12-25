import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import Header from './component/header/Header'
import Ivvform from './views/Ivvform'
import Route from './Route'
import './App.css';
import history from './history';

class App extends Component {

  componentDidMount() {
  }
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div className="ivv-router">
            <Header />
            <Route history={history} />
            <Ivvform />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
