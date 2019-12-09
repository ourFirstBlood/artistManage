import React, { Component } from 'react'
import { Route, Redirect, BrowserRouter } from 'react-router-dom'
import Login from '../page/login/Login.jsx'
import Index from '../page/index/Index'

export default class myRoute extends Component {
  render() {
    return (
      <BrowserRouter path="/">
        <div className="route">
          <Route
            path="/"
            key="/"
            exact
            render={() => <Redirect to="/index/notice" />}
          />
          <Route
            history={this.props.history}
            path="/index/"
            key="index"
            component={Index}
          />
          <Route
            history={this.props.history}
            path="/power"
            key="power"
            component={Index}
          />
          <Route path="/login" key="login" component={Login} />
        </div>
      </BrowserRouter>
    )
  }
}
