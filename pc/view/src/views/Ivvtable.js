/*
*  表格显示页面
*/

import React from 'react'
import {axios_} from './js/common'
import { Button, Table, Input, Pagination, Loading, MessageBox, Message } from 'element-react'

class Ivvtable extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      loading: false,
      total: 0,
      pageSize: 10,
      currentPage: 1,
      columns: [
        {
          label: "日期",
          prop: "date",
          width: 150
        },
        {
          label: "姓名",
          prop: "name",
          width: 160
        },
        {
          label: "地址",
          prop: "address"
        }
      ],
      data: []
    }
  }
  handleData(id) {
    MessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      type: 'warning'
    }).then(() => {
      // 删除数据请求
      const res = axios_({
        url: "/artist/detele_artists",
        params: {id: id}
      })
      res.then(()=>{
        Message({
          type: 'success',
          message: '删除成功!'
        });
        this.getTableData()
      })
    }).catch(() => {
      Message({
        type: 'info',
        message: '已取消删除'
      });
    });
  }
  //设置当前页 渲染数据
  setCurrentPage = (currentPage) => {
    this.setState(
      { currentPage },
      () => {
        this.getTableData()
      }
    )
  }
  //获取数据
  getTableData = () => {
    this.setState({ loading: true })
    const res = axios_({
      url: "/artist/get_artistsList",
      params: {
        page: this.state.currentPage,
        page_size: this.state.pageSize
      }
    })
    res.then((success)=>{
      const xdata = success.data
      if (xdata.count !== 0) {
        let columns = [], vdata = []
        for (let i = 0; i < xdata.list[0].info.length; i++) {
          columns.push({
            label: xdata.list[0].info[i].name,
            prop: 'key' + i
          })
        }
        //数据
        vdata = xdata.list.reduce((data, value, index) => {
          let obj_1 = {}
          obj_1.index = index
          obj_1.id = value.id //存所需要控制的 id 
          for (let i = 0; i < value.info.length; i++) {
            obj_1['key' + i] = value.info[i].value
          }
          data.push(obj_1)
          return data
        }, [])
        // handle 删除
        columns.push(
          {
            label: "操作",
            prop: "address",
            render: (row) => {
              return (
                <span>
                  <Button plain={true} type="info" onClick={() => {this.props.history.replace("/edit/" + row.id)}} size="small">编辑</Button>
                  <Button plain={true} type="info" onClick={()=>{this.props.history.replace("/detail/" + row.id)}} size="small">详情</Button>
                  <Button onClick={this.handleData.bind(this, row.id)} type="danger" size="small">删除</Button>
                </span>
              )
            }
          }
        )
        this.setState({
          columns: columns,
          data: vdata
        })
      }
      this.setState({
        total: xdata.count,
        loading: false
      })
    })
  }
  componentDidMount() {
    this.getTableData()
  }
  render() {
    return (
      <div>
        <div className="table-nav">
          <Button type="primary">新增</Button>
          <Input type="password" placeholder="请输入内容" />
        </div>
        <div className="ivv-table">
          <Loading className="table-loading" loading={this.state.loading} >
            <Table
              style={{ width: '100%' }}
              columns={this.state.columns}
              data={this.state.data}
              border={true}
              onSelectChange={(selection) => { console.log(selection) }}
              onSelectAll={(selection) => { console.log(selection) }}
            />
            <div className="ivv-pagination">
              {
                this.state.total <= this.state.pageSize ? null :
                  <Pagination layout="prev, pager, next, jumper"
                    total={this.state.total} pageSize={this.state.pageSize}
                    currentPage={this.state.currentPage}
                    onCurrentChange={this.setCurrentPage} />
              }
            </div>
            </Loading>
        </div>
      </div>
    )
  }
}
export default Ivvtable