import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom'
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
        <HashRouter>
          <div className="ivv-router">
            <Header />
            <Route history={history} />
            <Ivvform />
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;
