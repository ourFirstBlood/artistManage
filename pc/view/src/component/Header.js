import React from "react"
import {Link} from 'react-router-dom'
import './css/header.css'


class Header extends React.Component {
    render()　{
        return (
            <div className="ivv-header">
                <h2><Link to="/index">艺人管理系统</Link></h2>
                <ul className="ivv-nav">
                    <li><Link to="/index">主页</Link></li>
                    <li><Link to="/jurisdiction">权限管理</Link></li>
                    <li>
                        我的
                        <i className="el-icon-caret-bottom ivv-angle"></i>
                        <div className="ivv-pos-nav">
                            <span>退出</span>
                            <span>退出</span>
                            <span>退出</span>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}
export default Header