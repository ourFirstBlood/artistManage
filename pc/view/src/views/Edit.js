/*
* 编辑信息页面
*/

import React from 'react'
import axios from 'axios'
import './css/edit.css'

class Edit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        const id = parseInt(this.props.match.params.id)
        if (id !== 0) {
            // 修改
            axios.post(
                'http://www.ivvmedia.com:8080/artist/detail',
                { id: id }
            ).then((request) => {
                if (request.data.code === 0) {
                    const data = request.data.data
                    this.setState({
                        data: data
                    })
                } else {
                    throw request.data.msg
                }

            }).catch((error) => {
                console.log(error)
            })
        } else {
            //添加
        }
    }
    setData(index) {
        console.log(index)
    }
    render() {
        console.log(this.state.data)
        let lis = this.state.data.map((value, index) => { 
            let input = <input value={value.value} onChange={this.setData.bind(this, index)} />
            if(value.type === "radio"){
            }
            //整理数据  重新设置
            return (
                <li className="ivv-edit-li" key={index}>
                    <span className="ivv-edit-name">{value.required? <i>*</i> : null}{value.name}:</span>
                    <span className="ivv-edit-input">{input}</span>
                </li>
            )
        })
        return (
            <div className="ivv-edit">
                <ul className="ivv-edit-ul">
                    {lis}
                </ul>
            </div>
        )
    }
}

export default Edit