import React, { Component } from 'react'
import ajaxReq from '../../common/ajaxReq'
import msg from '../../common/msg'
import './index.scss'
import {
  Loading,
  Table,
  Button,
  Icon,
  Dialog,
  Input,
  Form,
  MessageBox
} from 'element-react'
class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      page_size: 0,
      params: {
        id: '',
        name: ''
      },
      columns: [
        {
          type: 'index'
        },
        {
          label: '标题',
          prop: 'name',
          render: function(data) {
            return <span>{data.name || '--'}</span>
          }
        },
        {
          label: '发布日期',
          prop: 'time',
          width: 160,
          render: function(data) {
            return (
              <span>
                <Icon name="date" />
                <span style={{ marginLeft: '10px' }}>
                  {new Date(data.time).toLocaleDateString()}
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
                  type="success"
                  size="small"
                  onClick={this.setWage.bind(this, item)}
                >
                  设置工资
                </Button>
                <Button
                  type="primary"
                  size="small"
                  onClick={this.openDialog.bind(this, item)}
                >
                  编辑
                </Button>
                <Button
                  onClick={this.deleteItem.bind(this, item)}
                  type="danger"
                  size="small"
                >
                  删除
                </Button>
              </span>
            )
          }
        }
      ],
      data: [],
      count: 0,
      loading: true,
      dialogVisible: false
    }
  }

  setWage({ id }) {
    this.props.history.push(`/index/notice/wage/${id}`)
  }

  openDialog({ id = 0, name = '' }) {
    const params = {
      id,
      name
    }
    this.setState({ params, dialogVisible: true })
  }

  async deleteItem({ user_name, name, id }) {
    await MessageBox.confirm(`确定要删除？`, '提示', {
      type: 'warning'
    })
    this.setState({ loading: true })
    ajaxReq
      .call(this, {
        url: '/notice/delete',
        params: {
          id: [id]
        }
      })
      .then(() => {
        msg('删除成功')
        this.setState({ dialogVisible: false })
        this.getList()
      })
      .catch(() => {
        this.setState({ dialogVisible: false, loading: false })
      })
  }

  getList() {
    this.setState({ loading: true })
    let { page, page_size } = this.state
    ajaxReq
      .call(this, {
        url: '/notice/get_list',
        params: { page, page_size }
      })
      .then(res => {
        const { list, count } = res.data
        this.setState({
          data: list,
          count,
          loading: false
        })
      })
      .catch(() => {
        this.setState({ dialogVisible: false, loading: false })
      })
  }

  addAccount = () => {
    let { name, id } = this.state.params
    if (!name.trim()) {
      msg('请输入标题', false)
      return
    }
    this.setState({ loading: true })
    ajaxReq
      .call(this, {
        url: '/notice/add',
        params: {
          name,
          id
        }
      })
      .then(() => {
        if (id === '0') {
          msg('成功')
        } else {
          msg('修改成功')
        }
        this.setState({ dialogVisible: false })
        this.getList()
      })
      .catch(() => {
        this.setState({ dialogVisible: false, loading: false })
      })
  }
  componentWillMount() {
    this.getList()
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
            新建公告
          </Button>
          <Table
            style={{ width: '100%' }}
            columns={this.state.columns}
            data={this.state.data}
            border={true}
            highlightCurrentRow={true}
          />
          <Dialog
            title={this.state.params.id ? '修改公告' : '新增公告'}
            visible={this.state.dialogVisible}
            closeOnClickModal={false}
            onCancel={() => this.setState({ dialogVisible: false })}
          >
            <Loading loading={this.state.loading && this.state.dialogVisible}>
              <Dialog.Body>
                <Form labelWidth="80">
                  <Form.Item label="标题">
                    <Input
                      type="textarea"
                      value={this.state.params.name}
                      onChange={value => {
                        this.setState({
                          params: { ...this.state.params, name: value }
                        })
                      }}
                    ></Input>
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
