import React from 'react'
import { Input, Radio, Button } from 'element-react'
import {axios_, info} from './js/common'
import './css/accounts.css'

class Accounts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user_name: '',
            password: '',
            is_super: "1",
            name: ''
        }
    }
    setAccount(user_name) {
        this.setState({user_name})
    }
    setPasswd(password) {
        this.setState({password})
    }
    setName(name) {
        this.setState({name})
    }
    setSuper(is_super) {
        this.setState({is_super})
    }
    submit() {
        if(this.state.user_name === '') return info('请填写管理员账号', 'error')
        if(this.state.password === '') return info('请填写管理员密码', 'error')
        if(this.state.name === '') return info('请填写管理员姓名', 'error')
        const res = axios_.call(this, {
            url: '/login/add_user',
            params: {
                user_name: this.state.user_name,
                password: this.state.password,
                is_super: this.state.is_super,
                name: this.state.name
            }
        })
        res.then(()=>{
            info('添加超管成功')
        })
    }
    render() {
        return (
            <div className="accounts">
                <ul className="accounts-layout">
                    <li>
                        <span className="accounts-name">管理员账号：</span>
                        <Input value={this.state.user_name} onChange={this.setAccount.bind(this)} className="accounts-input" placeholder="请输入账号..." />
                    </li>
                    <li>
                        <span className="accounts-name">管理员密码：</span>
                        <Input value={this.state.password} onChange={this.setPasswd.bind(this)} className="accounts-input" placeholder="请输入密码..." />
                    </li>
                    <li>
                        <span className="accounts-name">超级管理员：</span>
                        <div className="accounts-input">
                            <Radio value="1" onChange={this.setSuper.bind(this)} checked={this.state.is_super === "1"} >是</Radio>
                            <Radio value="0" onChange={this.setSuper.bind(this)} checked={this.state.is_super === "0"} >否</Radio>
                        </div>
                    </li>
                    <li>
                        <span className="accounts-name">管理员姓名：</span>
                        <Input value={this.state.name} onChange={this.setName.bind(this)} className="accounts-input" placeholder="请输入管理员姓名..." />
                    </li>
                    <li>
                        <Button onClick={this.submit.bind(this)}>提交</Button>
                    </li>
                </ul>
            </div>
        )
    }
}
export default Accounts