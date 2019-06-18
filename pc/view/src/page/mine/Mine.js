import React, { Component } from "react"
import ajaxReq from "../../common/ajaxReq"
import { Loading } from "element-react"
export default class Mine extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading:true
    }
  }
  componentWillMount() {
    this.setState({ loading: true })
    ajaxReq
      .call(this, {
        url: "/login/get_users",
        params: {
          user_name: this.state.user,
          password: this.state.pwd,
          is_super: this.state.isManager,
          name: this.state.name,
        },
      })
      .then(res => {
        this.setState({
          userList: res.data,
          loading: false,
        })
      })
  }
  render() {
    return (
      <div className="account">
        <Loading loading={this.state.loading}>
          312
        </Loading>
      </div>
    )
  }
}
