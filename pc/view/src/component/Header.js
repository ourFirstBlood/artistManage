import React from 'react'
import {Menu} from 'element-react'
import './css/Header.css'

class Header extends React.Component {
    onSelect() {

    }
    render() {
        return (
            <div className="header">
                <div className="ivv-header">
                    <h3 className="ivv-header-tit">艺人管理系统</h3>
                    <div>
                        <Menu defaultActive="1" className="el-menu-demo" mode="horizontal">
                            <Menu.Item index="1">主页</Menu.Item>
                            <Menu.Item index="2">权限管理</Menu.Item>
                            <Menu.SubMenu index="3" title="我的">
                                <Menu.Item index="3-1">个人详情</Menu.Item>
                                <Menu.Item index="3-3">退出</Menu.Item>
                            </Menu.SubMenu>
                        </Menu>
                    </div>
                </div>  
            </div> 
        )
    }
}

export default Header