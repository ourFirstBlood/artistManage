import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Header from '../component/header/Header'
import Menu from '../component/menu/Menu'
import Artists from '../page/artist/Artists'
import Account from '../page/account/Account'
import FormManage from '../component/form/FormManage'
import Mine from '../page/mine/Mine'
import Plus from '../page/plus/Plus'
import SignList from '../page/signList/SignList'


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
          fn={this.extentAvatar.bind(this, 83)}
        />
        <Menu/>
        <Route path="/index/artists" key="List" component={Artists} exact />
        <Route path="/index/artists/plus/:id?" key="plus" component={Plus} />
        <Route path="/index/signList" key="signList" component={SignList} />
        <Route path="/power/account" key="account" component={Account} />
        <Route path="/power/formManage" key="form" component={FormManage} />
        <Route path="/power/mine" key="mine" component={Mine} />
      </div>
    )
  }
}

export default RouteView
