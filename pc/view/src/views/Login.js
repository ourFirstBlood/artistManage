/*
*   登陆页面
*/
import React from 'react'
import './css/login.css'
import { Button, Input } from 'element-react'
import { axios_, info } from './js/common'
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user_name: '',
            password: ''
        }
    }
    login() {
        const { user_name, password } = this.state
        const res = axios_.call(this, {
            url: "/login",
            params: {
                user_name,
                password
            }
        })
        res.then(() => {
            info('登陆成功')
            this.props.history.replace('/ivvtable')
        })

    }
    userChange(user_name) {
        this.setState({ user_name })
    }
    pwChange(password) {
        this.setState({ password })
    }
    reset() {
        this.setState({
            user_name: '',
            password: ''
        })
    }
    render() {
        return (
            <div className="ivv-login">
                <div className="login">
                    <label className="login-label">
                        <span className="login-label-name">用户名:</span>
                        <Input className="login-label-input" type="text" value={this.state.user_name} onChange={this.userChange.bind(this)} />
                    </label>
                    <label className="login-label">
                        <span className="login-label-name">密码:</span>
                        <Input className="login-label-input" type="password" value={this.state.password} onChange={this.pwChange.bind(this)} />
                    </label>
                    <span className="login-label">
                        <Button plain={true} type="info" onClick={this.reset.bind(this)}>重置</Button>
                        <Button plain={true} type="success" onClick={this.login.bind(this)}>登录</Button>
                    </span>
                </div>
            </div>
        )
    }
}
export default Login