import React, { Component } from "react"
import Route from "./route/Route"
import { hot } from "react-hot-loader/root"

import { connect } from 'react-redux'
import { setUserInfo } from './store/action'
import ajaxReq from "./common/ajaxReq"

import "./App.scss"


class App extends Component {

  async componentWillMount () {
    if (!this.props.userInfo.id) {
      const res = await ajaxReq
      .call(this, {
        url: "/user/get_user_info",
      })
      this.props.setUserInfo(res.data)
    }
  }

  render () {
    return (
        <div className="App">
          <Route />
        </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userInfo: state
  }
}

const mapDispatchToProps = (
  dispatch,
  ownProps
) => {
  return {
    setUserInfo: (info) => {
      dispatch(setUserInfo(info));
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(hot(App))
