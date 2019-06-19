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
        url: "/user/get_user_info",
      })
      .then(res => {
        console.log(res.data)
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
