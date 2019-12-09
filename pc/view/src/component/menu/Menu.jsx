import React, { Component } from 'react'
import './menu.scss'

import { connect } from 'react-redux'

class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timestamp:''
    }
  }
  get menuList() {
    const list = [
      { path: '/index/notice', name: '通知公告' },
      { path: '/index/artists', name: '艺人管理' },
      { path: '/index/signList', name: '报名列表' },
      { path: '/power/account', name: '账号管理', is_super: true },
      { path: '/power/formManage', name: '表单管理', is_super: true }
    ]
    const { is_super } = this.props.userInfo
    if (is_super === '1') {
      return list
    } else {
      return list.filter(item => !item.is_super)
    }
  }

  activeItem(path) {
    return window.location.pathname.indexOf(path) !== -1 ? 'active' : ''
  }

  goPath (path) {
    this.setState({timestamp:new Date().getTime()})
    this.props.history.replace(path)
  }

  render() {
    return (
      <div className="menu">
        <span className="hide">{this.state.timestamp}</span>
        <ul className="menu-lists">
          {this.menuList.map((item, index) => {
            return (
              <li key={index}>
                <span
                  class={'item ' + this.activeItem(item.path)}
                  onClick={this.goPath.bind(this, item.path)}
                >
                  {item.name}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userInfo: state
  }
}

export default connect(mapStateToProps)(Menu)
