import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import './header.scss'

class Header extends Component {
    
    render() {
        return (
            <div className="nav">
                <h1 className="nav-title">ivv后台管理系统</h1>
                <ul className="nav-lists">
                    <li><NavLink to="/index/list">主页</NavLink></li>
                    <li><NavLink to="/index/purview">权限管理</NavLink></li>
                </ul>
                <div className="nav-info">
                    <img className="avatar" alt="头像" src={require('./title.jpg')}/>
                    <span className="me">我的</span>
                </div>
            </div>
        )
    }
}

export default Header