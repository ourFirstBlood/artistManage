import React, {Component} from 'react'
import {Input, Button} from 'element-react'
import ajaxReq from '../../common/ajaxReq'
import './login.scss'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userVal: '',
            pwd: ''
        }
    }
    //重置
    reset = () => {
        this.setState({
            userVal: '',
            pwd: ''
        })
    }
    //登陆
    login = () => {
        ajaxReq({
            url: 'login',
            params: {
                user_name: this.state.userVal,
                password: this.state.pwd
            }
        }).then(()=>{
            this.props.history.replace('/')
        })
    }
    render() {
        const bg = {
            background: `url(${require('./bg.jpg')})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
        }
        return (
            <div style={bg} className="login">
                <div className="login-form">
                    <label className="login-user">
                    用户名: <Input onChange={userVal=>this.setState({userVal})} value={this.state.userVal} className="login-password" placeholder="请输入用户名..." />
                    </label>
                    <label className="login-user">
                    密码: <Input type="password" onChange={pwd=>this.setState({pwd})} value={this.state.pwd} className="login-password" placeholder="请输入密码..." />
                    </label>
                    <div className="login-btn">
                        <Button onClick={this.reset.bind(this)} className="reset">重置</Button>
                        <Button type="primary" onClick={this.login.bind(this)} className="primary">登陆</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login