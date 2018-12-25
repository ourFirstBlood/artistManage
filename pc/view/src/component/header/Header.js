import React from 'react'
import './header.css'
import {NavLink} from 'react-router-dom'
import logo from './logo.png'

class Header extends React.Component {
    render() {
        return (
            <div className="ivv-header">
                <div className="header">
                    <div className="ivv-logo">
                        <img className="logo" src={logo} alt="..."/>
                        <h1 className="logo-letter">艺人管理系统</h1>
                    </div>
                    <ul className="ivv-nav">
                        <li><NavLink to="/ivvtable">主页</NavLink></li>
                        <li><NavLink to="/content/Soncontent">权限管理</NavLink></li>
                        <li>
                            我的
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default Header