/*
*
*  详情页面
*/

import React from 'react'
import axios from 'axios'
import './css/detail.css'

class Detail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        // console.log(this.props.match.params.id)
        axios.post(
            'http://www.ivvmedia.com:8080/artist/detail',
            {
                id: this.props.match.params.id
            }
        ).then((request) => {
            if (request.data.code === 0) {
                let data = request.data.data
                this.setState({
                    data: data
                })

            } else {
                throw request.data.msg
            }
        }).catch((err) => {

        })
    }
    render() {
        const spans = this.state.data.map((values, index) => {
            return (
                <li key="index" className="ivv-detail-li">
                    <span className="ivv-detail-name">{values.name}:</span>
                    <span className="ivv-detail-value">{values.value}</span>
                </li>
            )
        })
        return (
            <div className="ivv-detail">
                <ul className="ivv-detail-ul">
                    {spans}
                </ul>
            </div>
        )
    }
}

export default Detail