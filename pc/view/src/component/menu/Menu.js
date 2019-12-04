import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './menu.scss'

import { connect } from 'react-redux'

class Menu extends Component {
    render () {
        const { is_super } = this.props.userInfo
        return (
            <div className="menu">
                <ul className="menu-lists">
                    <li><NavLink to="/index/artists">艺人管理</NavLink></li>
                    <li><NavLink to="/index/signList">报名列表</NavLink></li>
                    {
                        is_super === '1'
                            ?
                            (
                                <div>
                                    <li><NavLink to="/power/account">账号管理</NavLink></li>
                                    <li><NavLink to="/power/formManage">表单管理</NavLink></li>
                                </div>
                            )
                            : ''
                    }

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

export default connect(mapStateToProps, ()=>{})(Menu)