/*
 *
 *  详情页面
 */

import React from 'react'
import { axios_ } from './js/common'
import './css/detail.css'
import { Button, Loading } from 'element-react'

class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      data: []
    }
  }
  componentDidMount() {
    this.setState({ loading: true })
    const res = axios_.call(this, {
      url: '/artist/detail',
      params: { id: this.props.match.params.id }
    })
    res.then(success => {
      const data = success.data
      this.setState({ data, loading: false })
    })
  }
  render() {
    const spans = this.state.data.map((values, index) => {
      return (
        <li key={index} className="ivv-detail-li">
          <span className="ivv-detail-name">{values.name}:</span>
          <span className="ivv-detail-value">{values.value}</span>
        </li>
      )
    })
    return (
      <Loading className="table-loading" loading={this.state.loading}>
        <div class="content">
          <div class="title">
            <span>详情</span>
            <Button
              type="default"
              onClick={() => {
                this.props.history.go(-1)
              }}
            >
              返回
            </Button>
          </div>
          <div className="ivv-detail">
            <ul className="ivv-detail-ul">{spans}</ul>
          </div>
        </div>
      </Loading>
    )
  }
}

export default Detail
