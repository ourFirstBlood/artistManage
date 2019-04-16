import React, { Component } from 'react'
import { Input, Button, Radio } from 'element-react'
import ajaxReq from '../../common/ajaxReq'
import msg from '../../common/msg'
import './account.scss'
import { Loading } from 'element-react'
class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: '',
      isManager: 0,
      name: '',
      loading: false,
      user_list: []
    }
  }
  setManage = isManager => {
    this.setState({ isManager })
  }
  addAccount = () => {
    if (!this.state.user) return msg('请输入新的账户', false)
    if (!this.state.pwd) return msg('请输入密码', false)
    ajaxReq
      .call(this, {
        url: '/login/add_user',
        params: {
          user_name: this.state.user,
          password: this.state.pwd,
          is_super: this.state.isManager,
          name: this.state.name
        }
      })
      .then(() => {
        msg('添加成功')
      })
  }
  componentWillMount() {
    this.setState({ loading: true })
    ajaxReq
      .call(this, {
        url: '/login/get_users',
        params: {
          user_name: this.state.user,
          password: this.state.pwd,
          is_super: this.state.isManager,
          name: this.state.name
        }
      })
      .then(res => {
        this.setState({ user_list: res.data, loading: false })
      })
  }
  render() {
    return (
      <div className="account">
        <Loading loading={this.state.loading}>
          <ul>
            {this.state.user_list.map(function(item, key) {
              return (
                <li key={key}>
                  <div>
                    <span>账号:</span>
                    <span>{item.user_name}</span>
                  </div>
                  <div>
                    <span>昵称:</span>
                    <span>{item.name}</span>
                  </div>
                  <div>
                    <span>是否超管:</span>
                    <span>{Number(item.is_super) ? '是' : '否'}</span>
                  </div>
                </li>
              )
            })}
          </ul>
          {/* <div className="account-layout">
            <h1 className="account-title">添加新的子账户</h1>
            <ul>
              <li>
                <span className="account-name">管理员账户：</span>
                <span className="account-input">
                  <Input
                    value={this.state.user}
                    onChange={user => this.setState({ user })}
                  />
                </span>
              </li>
              <li>
                <span className="account-name">管理员密码：</span>
                <span className="account-input">
                  <Input
                    type="password"
                    value={this.state.pwd}
                    onChange={pwd => this.setState({ pwd })}
                  />
                </span>
              </li>
              <li>
                <span className="account-name">超级管理员：</span>
                <span className="account-input">
                  <Radio
                    value={1}
                    checked={this.state.isManager === 1}
                    onChange={this.setManage.bind(this)}
                  >
                    是
                  </Radio>
                  <Radio
                    value={0}
                    checked={this.state.isManager === 0}
                    onChange={this.setManage.bind(this)}
                  >
                    否
                  </Radio>
                </span>
              </li>
              <li>
                <span className="account-name">管理员姓名：</span>
                <span className="account-input">
                  <Input
                    value={this.state.name}
                    onChange={name => this.setState({ name })}
                  />
                </span>
              </li>
              <li>
                <Button onClick={this.addAccount} type="primary">
                  添加
                </Button>
              </li>
            </ul>
          </div> */}
        </Loading>
      </div>
    )
  }
}

export default Account
