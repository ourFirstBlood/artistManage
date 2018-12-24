import React from 'react'
import './login.css'
import axios from 'axios'
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
        let {user_name,password} = this.state
        axios.post(
            '/login',
            {
                user_name,
                password
            }
        ).then((res) => {
            console.log(res)
            if(res.data.code===0){
                this.props.history.replace('/content/Soncontent')
            }
            else{
                 alert(res.data.msg)
            }
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