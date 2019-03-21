import React, {Component} from 'react'
import { Input, Button, Radio} from 'element-react';
import ajaxReq from '../../common/ajaxReq'
import msg from '../../common/msg'
import './account.scss'


class Account extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            pwd: '',
            isManager: 0,
            name: ''
        }
    }
    setManage = isManager=>{
        this.setState({isManager})
    }
    addAccount = () => {
        if(!this.state.user) return msg('请输入新的账户', false)
        if(!this.state.pwd) return msg('请输入密码', false)
        ajaxReq.call(this, {
            url: '',
            params: {
                user_name: this.state.user,
                password: this.state.pwd,
                is_super: this.state.isManager,
                name: this.state.name
            }
        }).then(()=>{
            msg('添加成功')
        })
    }
    render() {
        return (
            <div className="account"> 
                <div className="account-layout">
                    <h1 className="account-title">添加新的子账户</h1>
                    <ul>
                        <li>
                            <span className="account-name">管理员账户：</span>
                            <span className="account-input">
                                <Input value={this.state.user} onChange={user=>this.setState({user})}/>
                            </span>
                        </li>
                        <li>
                            <span className="account-name">管理员密码：</span>
                            <span className="account-input">
                                <Input type="password" value={this.state.pwd} onChange={pwd=>this.setState({pwd})}/>
                            </span>
                        </li>
                        <li>
                            <span className="account-name">超级管理员：</span>
                            <span className="account-input">
                                <Radio value={1} checked={this.state.isManager===1} onChange={this.setManage.bind(this)}>是</Radio>
                                <Radio value={0} checked={this.state.isManager===0} onChange={this.setManage.bind(this)}>否</Radio>
                            </span>
                        </li>
                        <li>
                            <span className="account-name">管理员姓名：</span>
                            <span className="account-input">
                                <Input value={this.state.name} onChange={name=>this.setState({name})}/>
                            </span>
                        </li>
                        <li>
                            <Button onClick={this.addAccount} type="primary">添加</Button>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Account