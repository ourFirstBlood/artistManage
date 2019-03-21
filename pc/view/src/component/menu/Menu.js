import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import './menu.scss'


class Menu extends Component {
    render() {
        return (
            <div className="menu">
                <ul className="menu-lists">
                    <li><NavLink to="/index/account">账号管理</NavLink></li>
                    <li><NavLink to="/index/form">表单管理</NavLink></li>
                    <li><NavLink to="/index/plus/">新增或修改</NavLink></li>
                </ul>
            </div>
        )
    }
}

export default Menu