import React, { Component } from 'react'
import { Table, Button, Pagination, Loading, MessageBox } from 'element-react'
import ajaxReq from '../../common/ajaxReq'
import msg from '../../common/msg'
import Box from '../box/Box'
import './list.scss'

class List extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pageSizes: 10,
      info: [],
      isShow: false,
      loading: true,
      page: 1,
      total: 0,
      columns: [],
      data: []
    }
  }
  // 获取列表
  getList = (page, page_size) => {
    this.setState({ loading: true })
    ajaxReq
      .call(this, {
        url: '/artist/get_artistsList',
        params: { page, page_size }
      })
      .then(res => {
        this.handleForm(res.data.list)
        this.setState({
          total: res.data.count,
          loading: false
        })
      })
  }
  //处理表单
  handleForm = data => {
    const list = data.reduce(function(arr, vals, key) {
      arr[key] = vals.info.fixed.reduce(function(obj, val) {
        obj[val.name] = val.value
        return obj
      }, {})
      arr[key].id = vals.id
      return arr
    }, [])
    this.setState({ data: list })
  }
  //详情
  showInfo = row => {
    this.setState({ loading: true })
    ajaxReq
      .call(this, {
        url: '/artist/detail',
        params: {
          id: row.id
        }
      })
      .then(res => {
        this.setState({
          info: res.data,
          isShow: true,
          loading: false
        })
      })
  }
  //删除
  delInfo = row => {
    MessageBox.msgbox({
      title: '警告',
      message: '您确定删除该条信息么',
      showCancelButton: true
    }).then(action => {
      if (action === 'cancel') {
        msg('删除失败，可能是您取消了删除', false)
      } else {
        this.setState({ loading: true })
        ajaxReq
          .call(this, {
            url: '/artist/detele_artists',
            params: {
              id: row.id
            }
          })
          .then(() => {
            msg('删除成功')
          })
        this.getList(this.state.page, this.state.pageSizes)
      }
    })
  }
  //切换页
  changePage = page => {
    this.setState({ page })
    this.getList(page, this.state.pageSizes)
  }
  //修改跳转
  update = row => {
    this.props.history.push(`/index/plus/${row.id}`)
  }
  //初始化获取表单结构
  componentDidMount() {
    this.setState({ loading: true })
    ajaxReq
      .call(this, {
        url: '/power/form/get_form'
      })
      .then(res => {
        const data = res.data
        const fixed = data.fixed.map(function(val) {
          return {
            label: val.name,
            prop: val.name,
            minWidth: 180
          }
        })
        fixed.push({
          label: '操作',
          minWidth: 190,
          prop: 'address',
          render: row => {
            return (
              <span>
                <Button
                  onClick={this.showInfo.bind(this, row)}
                  plain={true}
                  type="info"
                  size="small"
                >
                  详情
                </Button>
                <Button
                  onClick={this.update.bind(this, row)}
                  type="primary"
                  size="small"
                >
                  编辑
                </Button>
                <Button
                  onClick={this.delInfo.bind(this, row)}
                  type="danger"
                  size="small"
                >
                  删除
                </Button>
              </span>
            )
          }
        })
        this.setState({ columns: fixed })
      })
    this.getList(this.state.page, this.state.pageSizes)
  }
  render() {
    return (
      <div className="list">
        <Loading
          loading={this.state.loading}
          text="拼命加载中..."
          style={{ width: '100%', height: '100%' }}
        >
          <div className="list-table">
            <Table
              style={{ maxWidth: '100%' }}
              columns={this.state.columns}
              maxHeight={700}
              data={this.state.data}
              border={true}
            />
            {/* page */
            this.state.total > 10 ? (
              <div className="list-page">
                <Pagination
                  onCurrentChange={this.changePage}
                  layout="prev, pager, next"
                  total={this.state.total}
                />
              </div>
            ) : null}
          </div>
        </Loading>
        {this.state.isShow ? (
          <Box
            show={() => this.setState({ isShow: false })}
            data={this.state.info}
          />
        ) : null}
      </div>
    )
  }
}

export default List
