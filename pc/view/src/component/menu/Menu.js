import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './menu.scss'


class Menu extends Component {
    render() {
        return (
            <div className="menu">
                <ul className="menu-lists">
                    <li><NavLink to="/artists">艺人管理</NavLink></li>
                    <li><NavLink to="/power/account">账号管理</NavLink></li>
                    <li><NavLink to="/power/formManage">表单管理</NavLink></li>
                </ul>
            </div>
        )
    }
}

export default Menu