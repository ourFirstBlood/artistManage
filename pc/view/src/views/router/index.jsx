import React from 'react'
import {
  Table,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap'
class Content extends React.Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      info: []
    }
  }

  toggle (e) {
    let index =e.target.parentNode.parentNode.dataset.index
    let info = this.state.info
    info[index].dropdownOpen = !info[index].dropdownOpen
    this.setState({
      info
    })
  }

  componentWillMount () {
    this.setState({
      info: [
        {
          name: '张三',
          age: '10',
          sex: '男',
          hobby: '女',
          dropdownOpen:false
        },
        {
          name: '李四',
          age: '10',
          sex: '男',
          hobby: '女',
          dropdownOpen:false
        },
        {
          name: '王五',
          age: '10',
          sex: '男',
          hobby: '女',
          dropdownOpen:false
        },
        {
          name: '赵六',
          age: '10',
          sex: '男',
          hobby: '女',
          dropdownOpen:false
        },
        {
          name: '田七',
          age: '10',
          sex: '男',
          hobby: '女',
          dropdownOpen:false
        },
        {
          name: '王八',
          age: '10',
          sex: '男',
          hobby: '女',
          dropdownOpen:false
        },
        {
          name: '老九',
          age: '10',
          sex: '男',
          hobby: '女',
          dropdownOpen:false
        },
        {
          name: '朝花夕拾',
          age: '10',
          sex: '男',
          hobby: '女',
          dropdownOpen:false
        },
        {
          name: '伍佰',
          age: '10',
          sex: '男',
          hobby: '女',
          dropdownOpen:false
        },
        {
          name: '弱水三千',
          age: '10',
          sex: '男',
          hobby: '女',
          dropdownOpen:false
        }
      ]
    })
  }
  render() {
    const contentStyle = {
      padding: '30px',
      border: '1px solid #f8f9fa'
    }
    const colorRed = {
      color: 'red'
    }
    const mb20 = {
      marginBottom: '20px'
    }

    return (
      <div className="content" style={contentStyle}>
        <Button color="primary" style={mb20}>
          新建
        </Button>
        <Table bordered>
          <thead>
            <tr>
              <th>姓名</th>
              <th>性别</th>
              <th>年龄</th>
              <th>爱好</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {this.state.info.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.sex}</td>
                <td>{item.age}</td>
                <td>{item.hobby}</td>
                <td width="30px" data-index={index}>
                  <ButtonDropdown
                    isOpen={item.dropdownOpen}
                    toggle={this.toggle}
                  >
                    <DropdownToggle caret>操作</DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>查看</DropdownItem>
                      <DropdownItem>编辑</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem style={colorRed}>删除</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="pagi">
          <Pagination aria-label="Page navigation example">
            <PaginationItem>
              <PaginationLink previous href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">4</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">5</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink next href="#" />
            </PaginationItem>
          </Pagination>
        </div>
      </div>
    )
  }
}

export default Content
