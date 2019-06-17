import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { MessageBox } from 'element-react'
import ajaxReq from '../../common/ajaxReq'
import './header.scss'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  singOut() {
    MessageBox.confirm('确定注销当前账号？', '提示', {
      type: 'warning'
    })
      .then(() => {
        this.setState({ loading: true })
        ajaxReq
          .call(this, {
            url: '/login/logout',
            params: {}
          })
          .then(() => {
            this.props.history.replace('/login')
            this.props.fn()
          })
      })
      .catch(() => {})
  }
  render() {
    const height = this.props.height
    const fn = this.props.fn
    return (
      <div className="nav">
        <h1 className="nav-title">ivv后台管理系统</h1>
        <ul className="nav-lists">
          <li style={{flex:1}}>
            <a href="http://www.ivvmedia.com">官网</a>
          </li>
        </ul>
        <div className="nav-info" onClick={fn}>
          <img className="avatar" alt="头像" src={require('./default.png')} />
          <span className="me">我的</span>
          <ul className="personal-list" style={{ height: height + 'px' }}>
            <li>< NavLink to = "/index/purview" >权限管理</NavLink></li>
            <li>个人信息</li>
            <li onClick={this.singOut.bind(this)}>注销</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Header
