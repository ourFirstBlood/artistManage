import React, { Component } from "react"
import ajaxReq from "../../common/ajaxReq"
import { Loading, Tag, Layout } from "element-react"

import './index.scss'

export default class Mine extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      userInfo:{}
    }
  }
  async componentWillMount() {
    this.setState({ loading: true })
    const res = await ajaxReq
      .call(this, {
        url: "/user/get_user_info",
      })
    this.setState({
      userInfo: res.data,
      loading: false,
    })
  }
  render () {
    const {user_name,is_super,name  } = this.state.userInfo
    return (
      <div className="account">
        <Loading loading={this.state.loading}>
             <Layout.Row gutter="20">
              <Layout.Col span="6"><div className="grid-content bg-purple">账号</div></Layout.Col>
              <Layout.Col span="18"><div className="grid-content bg-purple">{user_name}</div></Layout.Col>
            </Layout.Row>
             <Layout.Row gutter="20">
              <Layout.Col span="6"><div className="grid-content bg-purple">昵称</div></Layout.Col>
              <Layout.Col span="18"><div className="grid-content bg-purple">{name}</div></Layout.Col>
            </Layout.Row>
             <Layout.Row gutter="20">
              <Layout.Col span="6"><div className="grid-content bg-purple">身份</div></Layout.Col>
              <Layout.Col span="18"><div className="grid-content bg-purple"> {is_super === '1'
                ?
                (<Tag type='primary'>超级管理员</Tag>)
                :
                (<Tag type='gray'>普通管理员</Tag>)
              }</div></Layout.Col>
            </Layout.Row>
        </Loading>
      </div>
    )
  }
}
