import React from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import Login from '../page/login/Login'
import Index from '../page/index/Index'

import history from './history'

export default function() {
  return (
    <BrowserRouter basename="/">
      <div className="route">
        <Route
          path="/"
          key="/"
          exact
          render={() => <Redirect to="/index/list" />}
        />
        <Route history={history} path="/index" key="index" component={Index} />
        <Route path="/login" key="login" component={Login} />
      </div>
    </BrowserRouter>
  )
}
