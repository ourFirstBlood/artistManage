import React from 'react'
import {NavLink} from 'react-router-dom'
class Menusider extends React.Component {
    render() {
        return (
            <div className="ivv-menusider">
                <ul>
                    <li>账号管理</li>
                    <li>权限管理</li>
                    <li><NavLink to="/content/Soncontent">表单管理</NavLink></li>
                </ul>
            </div>  
        )
    }
}

export default Menusider