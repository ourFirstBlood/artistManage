import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Header from '../component/header/Header'
import Menu from '../component/menu/Menu'
import List from '../component/list/List'
import Account from '../component/account/Account'
import Form from '../component/form/Form'
import Plus from '../component/plus/Plus'
class RouteView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      height: 0
    }
  }
  extentAvatar(height, e) {
    if (e) {
      e.stopPropagation()
    }
    this.setState({ height })
  }

  render() {
    const height = this.state.height
    return (
      <div className="menu-route" onClick={this.extentAvatar.bind(this, 0)}>
        <Header
          history={this.props.history}
          height={height}
          fn={this.extentAvatar.bind(this, 125)}
        />
        <Menu />
        <Route path="/index/list" key="List" component={List} />
        <Route path="/index/account" key="account" component={Account} />
        <Route path="/index/form" key="form" component={Form} />
        <Route path="/index/plus/:id?" key="plus" component={Plus} />
      </div>
    )
  }
}

export default RouteView
