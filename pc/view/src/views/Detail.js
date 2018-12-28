/*
*
*  详情页面
*/

import React from 'react'
import {axios_} from './js/common'
import './css/detail.css'

class Detail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        console.log(this.props.match)
        const res = axios_.call(this, {
            url: '/artist/detail',
            params: {id: this.props.match.params.id}
        })
        res.then((success)=>{
            const data = success.data
            this.setState({data})
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
            <div className="ivv-detail">
                <ul className="ivv-detail-ul">
                    {spans}
                </ul>
            </div>
        )
    }
}

export default Detail