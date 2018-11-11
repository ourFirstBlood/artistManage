import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import PowerManage from './powerManage'
import Index from './index'
import Mine from './mine'

export default () => {
  return [
    <Route
      path="/"
      key="normal"
      exact
      render={() => <Redirect to="/index" />}
    />,
    <Route path="/index" key="index" component={Index} />,
    <Route path="/mine" key="mine" component={Mine} />,
    <Route path="/powerManage" key="powerManage" component={PowerManage} />
  ]
}
