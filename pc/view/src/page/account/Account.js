import React, { Component } from 'react'
import ajaxReq from '../../common/ajaxReq'
import msg from '../../common/msg'
import './account.scss'
import {
  Loading,
  Table,
  Button,
  Icon,
  Dialog,
  Input,
  Form,
  Switch
} from 'element-react'
class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: [
        {
          type: 'index'
        },
        {
          label: '账号',
          prop: 'date',
          width: 150,
          render: function(data) {
            return (
              <span>
                <span>{data.user_name}</span>
              </span>
            )
          }
        },
        {
          label: '昵称',
          prop: 'name',
          width: 160,
          render: function(data) {
            return <span>{data.name || '--'}</span>
          }
        },
        {
          label: '是否超管',
          prop: 'name',
          width: 160,
          render: function(data) {
            return (
              <span>
                <Icon name={data.is_super === '1' ? 'check' : 'close'} />
                <span style={{ marginLeft: '10px' }}>
                  {data.is_super === '1' ? '是' : '否'}
                </span>
              </span>
            )
          }
        },
        {
          label: '操作',
          prop: 'address',
          render: item => {
            return (
              <span>
                <Button
                  type="primary"
                  size="small"
                  onClick={this.openDialog.bind(this, item)}
                >
                  编辑
                </Button>
                <Button
                  type="success"
                  size="small"
                  onClick={this.openDialog.bind(this, item)}
                >
                  重置密码
                </Button>
                <Button type="danger" size="small">
                  删除
                </Button>
              </span>
            )
          }
        }
      ],
      userList: [],
      loading: true,
      dialogVisible: false,
      params: {
        user_name: '',
        password: '',
        is_super: 0,
        name: ''
      }
    }
  }

  openDialog(data) {
    const params = data
      ? {
          id: data.id,
          user_name: data.user_name,
          is_super: data.is_super,
          name: data.name
        }
      : {
          user_name: '',
          password: '',
          is_super: 0,
          name: ''
        }
    this.setState({ params, dialogVisible: true })
  }

  getUserList() {
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

  addAccount = () => {
    let { user_name, password, is_super, name } = this.state.params
    if (!user_name.trim()) {
      msg('请输入用户名', false)
      return
    }
    if (!/^\w*[0-9]*$/.test(user_name)) {
      msg('用户名必须为英文加数字的组合', false)
      return
    }
    if (!password.trim()) {
      msg('请输入密码', false)
      return
    }
    if (password.trim().length < 6 || password.trim().length > 16) {
      msg('密码应该在 6 ~ 16位之间', false, 3000)
      return
    }
    if (!name.trim()) {
      msg('请输入昵称', false)
      return
    }
    this.setState({ loading: true })
    ajaxReq
      .call(this, {
        url: '/login/add_user',
        params: {
          user_name,
          password,
          is_super,
          name
        }
      })
      .then(() => {
        msg('添加成功')
        this.setState({ dialogVisible: false })
        this.getUserList()
      })
  }
  componentWillMount() {
    this.getUserList()
  }
  render() {
    return (
      <div className="account">
        <Loading loading={this.state.loading}>
          <Button
            type="primary"
            className="add-btn"
            icon="edit"
            onClick={this.openDialog.bind(this)}
          >
            新建管理员
          </Button>
          <Table
            style={{ width: '100%' }}
            columns={this.state.columns}
            data={this.state.userList}
            border={true}
            highlightCurrentRow={true}
          />
          <Dialog
            title={this.state.params.id ? '修改管理员' : '新增管理员'}
            visible={this.state.dialogVisible}
            closeOnClickModal={false}
            onCancel={() => this.setState({ dialogVisible: false })}
          >
            <Loading loading={this.state.loading && this.state.dialogVisible}>
              <Dialog.Body>
                <Form labelWidth="80">
                  <Form.Item label="用户名">
                    <Input
                      value={this.state.params.user_name}
                      onChange={value => {
                        this.setState({
                          params: { ...this.state.params, user_name: value }
                        })
                      }}
                    ></Input>
                  </Form.Item>
                  {!this.state.params.id ? (
                    <Form.Item label="密码">
                      <Input
                        value={this.state.params.password}
                        type="password"
                        onChange={value => {
                          this.setState({
                            params: { ...this.state.params, password: value }
                          })
                        }}
                      ></Input>
                    </Form.Item>
                  ) : null}
                  <Form.Item label="昵称">
                    <Input
                      value={this.state.params.name}
                      onChange={value => {
                        this.setState({
                          params: { ...this.state.params, name: value }
                        })
                      }}
                    ></Input>
                  </Form.Item>
                  <Form.Item label="是否超管">
                    <Switch
                      onText="是"
                      offText="否"
                      value={this.state.params.is_super}
                      onValue={1}
                      offValue={0}
                      onChange={value => {
                        this.setState({
                          params: {
                            ...this.state.params,
                            is_super: value ? 0 : 1
                          }
                        })
                      }}
                    />
                  </Form.Item>
                </Form>
              </Dialog.Body>

              <Dialog.Footer className="dialog-footer">
                <Button onClick={() => this.setState({ dialogVisible: false })}>
                  取 消
                </Button>
                <Button type="primary" onClick={this.addAccount.bind(this)}>
                  确 定
                </Button>
              </Dialog.Footer>
            </Loading>
          </Dialog>
        </Loading>
      </div>
    )
  }
}

export default Account
