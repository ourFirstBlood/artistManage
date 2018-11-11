import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Header from '../components/header'
import Route from './router/router'


import 'element-theme-default';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
