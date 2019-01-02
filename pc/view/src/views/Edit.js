/*
* 编辑信息页面 // 或添加信息
*/

import React from 'react'
import {Input, Radio} from 'element-react'
import {axios_} from './js/common'
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
            const res = axios_.call(this, {
                url: '/artist/detail',
                params: {id: id}
            })
            res.then((success) => {
                const data = success.data
                this.setState({data})
            })
        } else {
            //添加
            const res = axios_.call(this, {
                url: '/power/form/get_form'
            })
            res.then(success=>{
                const data = success.data
                let newData = [].concat(data.custom, data.fixed)
                this.setState({data: newData})
            })
        }
    }
    setData(index) {
        console.log(index)
    }
    render() {
        console.log(this.state.data)
        let lis = this.state.data.map((obj, index) => {
            let input = null
            if(obj.type === "text") {
                input = <Input value={obj.value} onChange={this.setData.bind(this, index)} />
            } else if(obj.type === "radio") {
                input = obj.options.map((val, key)=>{
                    return <Radio value={val} key={key} name={'name'+key} checked={obj.value === val}>{val}</Radio>
                })
            }
            //整理数据  重新设置
            return (
                <li className="ivv-edit-li" key={index}>
                    <span className="ivv-edit-name">{obj.required? <i>*</i> : null}{obj.name}:</span>
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