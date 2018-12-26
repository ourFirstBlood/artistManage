/*
*   登陆页面
*/
import React from 'react'
import './css/login.css'
import {axios_, info} from './js/common'
class Login extends React.Component {
     constructor(props) {
        super(props)
        this.state = {
            user_name:'',
            password:''
        }
        this.login = this.login.bind(this)
        this.userChange = this.userChange.bind(this)
        this.pwChange = this.pwChange.bind(this)
    }
    login(){
        const {user_name,password} = this.state
        const res = axios_({
            url: "/login",
            params: {
                user_name,
                password
            }
        })
        res.then(()=>{
            info('登陆成功')  
            this.props.history.replace('/content/Soncontent') 
        })
        
    }
    userChange(e){
        this.setState({user_name:e.target.value})
    }
    pwChange(e){
         this.setState({password:e.target.value})
    }
    render() {
        return (
            <div className="">
                <div>
                    <span>用户名</span>
                    <input type="text" onChange={this.userChange}/>
                    <span>密码</span>
                    <input type="password" onChange={this.pwChange}/>
                    <button onClick={this.login}>登录</button>
                </div>
            </div>
        )
    }
}
export default Login