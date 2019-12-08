import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './menu.scss'

import { connect } from 'react-redux'

class Menu extends Component {
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

  render() {
    return (
      <div className="menu">
        <ul className="menu-lists">
          {this.menuList.map((item, index) => {
            return (
              <li key={index}>
                <NavLink to={item.path}>{item.name}</NavLink>
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
