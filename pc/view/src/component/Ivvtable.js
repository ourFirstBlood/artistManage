import React from 'react'
import axios from 'axios'
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
  handleData(id, type, index) {
    MessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      type: 'warning'
    }).then(() => {
      // 删除数据请求
      axios.post(
        'http://www.ivvmedia.com:8080/artist/detele_artists',
        { id: id }
      ).then((data) => {
        if (data.data.code === 0) {
          Message({
            type: 'success',
            message: '删除成功!'
          });
          let vdata = this.state.data
          vdata.splice(index, 1)
          this.setState({
            data: vdata,
            total: this.state.total - 1
          })
        } else {
          Message({
            type: 'info',
            message: '删除失败！因为' + data.data.msg
          });
        }
      }).catch((error) => {

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
    let that = this
    this.setState({ loading: true })
    axios.post(
      'http://www.ivvmedia.com:8080/artist/get_artistsList',
      {
        page: this.state.currentPage,
        page_size: this.state.pageSize
      }
    ).then((data) => {
      if (data.data.code === 0) {
        const xdata = data.data.data
        console.log(xdata.list)
        if (xdata.count !== 0) {
          let columns = [], vdata = []
          //字段名
          //columns.push({ type: 'selection' }) 
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
              render: function (row) {
                return (
                  <span>
                    <Button plain={true} type="info" onClick={() => {window.location.pathname= "edit/" + row.id}} size="small">编辑</Button>
                    <Button plain={true} type="info" onClick={()=>{window.location.pathname = "detail/" + row.id}} size="small">详情</Button>
                    <Button onClick={that.handleData.bind(that, row.id, 'del', row.index)} type="danger" size="small">删除</Button>
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
      } else {
        throw data.data.msg
      }
    }).catch((error) => {
      console.log(error)
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