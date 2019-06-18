import React, { Component } from 'react'
import { Table, Loading, MessageBox, Button, Select } from 'element-react'
import RcViewer from '@hanyk/rc-viewer'
import ajaxReq from '../../common/ajaxReq'
import msg from '../../common/msg'
import Box from '../../component/box/Box'

import './signList.scss'
const baseUrl = 'http://www.ivvmedia.com'
class List extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isShow: false,
      loading: true,
      columns: [
        {
          label: '真实姓名',
          width: 120,
          render: item => {
            return (
              <span>
                {item.type === 'love' ? (
                  <i className="el-icon-circle-check icon-span"></i>
                ) : item.type === 'important' ? (
                  <i className="el-icon-star-on icon-span"></i>
                ) : null}
                {item.realname}
              </span>
            )
          }
        },
        {
          label: '性别',
          prop: 'sex'
        },
        {
          label: '电话',
          prop: 'phone',
          width: 130
        },
        {
          label: '微信',
          prop: 'email',
          width: 140
        },
        {
          label: '微博链接',
          prop: 'weibo_link',
          width: 200,
          render: function(item) {
            return (
              <a
                style={{
                  width: '100%',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis'
                }}
                href={item.weibo_link}
              >
                {item.weibo_link}
              </a>
            )
          }
        },
        {
          label: '个人特长',
          prop: 'good_at',
          width: 100
        },
        {
          label: '直播平台',
          prop: 'live_video_space',
          width: 100
        },
        {
          label: '平台ID',
          prop: 'live_video_space_id',
          width: 100
        },
        {
          label: '申请时间',
          prop: 'time',
          width: 160
        },
        {
          label: '所在地',
          prop: 'address',
          width: 200
        },
        {
          label: '个人照片',
          prop: 'uploadimg',
          fixed: 'right',
          render: function(item) {
            return (
              <RcViewer>
                <img
                  style={{ width: '50px', cursor: 'pointer' }}
                  src={item.uploadimg}
                  alt={item.realname}
                />
              </RcViewer>
            )
          }
        },
        {
          label: '操作',
          fixed: 'right',
          render: row => {
            return (
              <span>
                <Button
                  size="mini"
                  type="primary"
                  onClick={this.mark.bind(this, row, 'love')}
                >
                  感兴趣
                </Button>
                <Button
                  size="mini"
                  type="warning"
                  onClick={this.mark.bind(this, row, 'important')}
                >
                  关注
                </Button>
                <Button
                  size="mini"
                  type="danger"
                  onClick={this.delInfo.bind(this, row)}
                >
                  删除
                </Button>
              </span>
            )
          }
        }
      ],
      data: [],
      options: [
        {
          value: 'admin',
          label: '全部'
        },
        {
          value: 'typeLove',
          label: '感兴趣的'
        },
        {
          value: 'typeImportant',
          label: '关注的'
        }
      ],
      value: 'admin'
    }
  }
  // 获取列表
  getList = val => {
    this.setState({ loading: true })
    val = val || this.state.value
    ajaxReq
      .call(this, {
        url: baseUrl + '/' + val,
        alert: false
      })
      .then(res => {
        this.setState({
          list: res.data,
          loading: false,
          value: val
        })
      })
  }

  //添加标记
  mark = (row, type) => {
    this.setState({ loading: true })
    ajaxReq
      .call(this, {
        url: baseUrl + '/' + type,
        params: {
          _id: row._id
        },
        alert: false
      })
      .then(() => {
        msg('成功')
        this.getList()
      })
  }
  //删除
  delInfo = row => {
    MessageBox.msgbox({
      title: '警告',
      message: '您确定删除该条记录么',
      showCancelButton: true
    }).then(action => {
      if (action === 'cancel') {
        msg('删除失败，可能是您取消了删除', false)
      } else {
        this.setState({ loading: true })
        ajaxReq
          .call(this, {
            url: baseUrl + '/del',
            params: {
              _id: row._id
            },
            alert: false
          })
          .then(() => {
            msg('删除成功')
            this.getList()
          })
      }
    })
  }

  //修改跳转
  update = row => {
    this.props.history.push(`/index/plus/${row.id}`)
  }
  //初始化获取表单结构
  componentDidMount() {
    this.setState({ loading: true })
    this.getList()
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
            <Select
              style={{ marginBottom: '15px' }}
              value={this.state.value}
              onChange={val => {
                this.getList(val)
              }}
            >
              {this.state.options.map(el => {
                return (
                  <Select.Option
                    key={el.value}
                    label={el.label}
                    value={el.value}
                  />
                )
              })}
            </Select>
            <Table
              style={{ maxWidth: '100%' }}
              columns={this.state.columns}
              maxHeight={700}
              data={this.state.list}
              border={true}
            />
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
