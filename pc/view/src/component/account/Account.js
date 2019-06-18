import React, { Component } from 'react'
import ajaxReq from '../../common/ajaxReq'
import msg from '../../common/msg'
import './account.scss'
import { Loading,Table, Button, Icon } from 'element-react'
class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
       columns: [
      {
        type: 'index'
      },
      {
        label: "账号",
        prop: "date",
        width: 150,
        render: function(data){
          return (
          <span>
            <span>{data.user_name}</span>
          </span>)
        }
      },
      {
        label: "昵称",
        prop: "name",
        width: 160,
        render: function(data){
          return <span>{data.name || '--'}</span>
        }
      },
      {
        label: "是否超管",
        prop: "name",
        width: 160,
        render: function(data){
          return (
            <span>
                <Icon name={data.is_super === '1'?'check':'close'} />
                <span style={{marginLeft:'10px'}}>{data.is_super === '1' ? '是': '否' }</span>
            </span>
          )
        }
      },
      {
        label: "操作",
        prop: "address",
        render: function(){
          return (
            <span>
             <Button plain={true} type="info" size="small">编辑</Button>
             <Button type="danger" size="small">删除</Button>
            </span>
          )
        }
      }
    ],
    userList: [],
      loading: true

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
        this.setState({
          userList: res.data,
          loading: false
        })
      })
  }
  render() {
    return (
      <div className="account">
        <Loading loading={this.state.loading}>
          <Button type="primary" className="add-btn" icon="edit">新建管理员</Button>
          <Table
            style={{width: '100%'}}
            columns={this.state.columns}
            data={this.state.userList}
            border={true}
            height={250}
            highlightCurrentRow={true}
            onCurrentChange={item=>{console.log(item)}}
            />
        </Loading>
      </div>
    )
  }
}

export default Account
