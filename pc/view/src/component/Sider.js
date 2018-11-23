import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './css/sider.css'

class Sider extends Component {
    render() {
        return (
            <ul className="ivv-side">
                <li><Link to="#">账号管理</Link></li>
                <li><Link to="#">权限管理</Link></li>
                <li><Link to="#">表单管理</Link></li>
            </ul>
        )
    }
}

export default Sider