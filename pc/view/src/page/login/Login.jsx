import React, { Component } from 'react'

import { Input, Button, Loading } from 'element-react'
import ajaxReq from '../../common/ajaxReq'
import './login.scss'

import { connect } from 'react-redux'
import { setUserInfo } from '../../store/action'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userVal: '',
      pwd: '',
      loading: false
    }
  }
  //重置
  reset = () => {
    this.setState({
      userVal: '',
      pwd: ''
    })
  }
  //登陆
  login = () => {
    this.setState({ loading: true })
    ajaxReq({
      url: 'login',
      params: {
        user_name: this.state.userVal,
        password: this.state.pwd
      }
    })
      .then(async () => {
        const res = await ajaxReq.call(this, {
          url: '/user/get_user_info'
        })
        this.props.setUserInfo(res.data)
        this.props.history.replace('/')
      })
      .catch(() => {
        this.setState({ loading: false })
      })
  }

  render() {
    const bg = {
      background: `url(${require('./bg.jpg')})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }
    return (
      <div style={bg} className="login">
        <Loading loading={this.state.loading}>
          <div className="login-form">
            <label className="login-user">
              用户名:
              <Input
                onChange={userVal => this.setState({ userVal })}
                value={this.state.userVal}
                className="login-password"
                placeholder="请输入用户名..."
              />
            </label>
            <label className="login-user">
              密码:
              <Input
                type="password"
                onChange={pwd => this.setState({ pwd })}
                value={this.state.pwd}
                className="login-password"
                placeholder="请输入密码..."
              />
            </label>
            <div className="login-btn">
              <Button onClick={this.reset.bind(this)} className="reset">
                重置
              </Button>
              <Button
                type="primary"
                onClick={this.login.bind(this)}
                className="primary"
              >
                登陆
              </Button>
            </div>
          </div>
        </Loading>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userInfo: state
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setUserInfo: info => {
      dispatch(setUserInfo(info))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
