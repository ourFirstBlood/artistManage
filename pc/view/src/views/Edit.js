/*
* 编辑信息页面 // 或添加信息
*/

import React from 'react'
import { Input, Radio, Checkbox, DatePicker, Button } from 'element-react'
import { axios_ } from './js/common'
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
                params: { id: id }
            })
            res.then((success) => {
                const data = success.data
                this.setState({ data })
            })
        } else {
            //添加
            const res = axios_.call(this, {
                url: '/power/form/get_form'
            })
            res.then(success => {
                const data = success.data
                let newData = [].concat(data.fixed, data.custom)
                this.setState({ data: newData })
            })
        }
    }
    //文本框改变
    setData(index, value) {
        const data = this.state.data
        if (data[index].type === "text") {
            if(data[index].length !== ""){
                data[index].value = value.slice(0, data[index].length) 
                this.setState({data}) 
            } else if(data[index].regex === "number") {
                if(!isNaN(value)) data[index].value = value
                this.setState({data})
            }
        } else {
            data[index].value = value
            this.setState({data})
        }
    }
    //checkbox 设置
    setCheckbox(index, value, bool){
        const data = this.state.data
        if(!data[index].value)  data[index].value = []
        if(bool){
            data[index].value.push(value)
        } else {
            data[index].value.splice(data[index].value.indexOf(value), 1)
        }
        this.setState({data})
    }
    render() {
        console.log(this.state.data)
        let lis = this.state.data.map((obj, index) => {
            let input = null
            if (obj.type === "text") {
                input = <Input placeholder={"请输入"+obj.name} value={obj.value} onChange={this.setData.bind(this, index)} />
            } else if (obj.type === "radio") {
                input = obj.options.map((val, key) => {
                    return <Radio onChange={this.setData.bind(this, index)} value={val} key={key} name={'name' + index} checked={obj.value === val}>{val}</Radio>
                })
            } else if (obj.type === "checkbox") {
                input = obj.options.map((val, key) => {
                    return <Checkbox onChange={this.setCheckbox.bind(this, index, val)} checked={obj.value&&obj.value.indexOf(val)>=0} key={key}>{val}</Checkbox>
                })
            } else if (obj.type === "date") {
                input = <DatePicker
                    value={obj.value}
                    placeholder="选择日期"
                    onChange={date => {
                        const data = this.state.data
                        data[index].value = date
                        this.setState({ data: data })
                    }} />
            } else if (obj.type === "textarea") {
                input = <Input className="ivv-edit-textarea"
                    type="textarea" onChange={this.setData.bind(this, index)}
                    autosize={{ minRows: 5, maxRows: 5 }}
                    placeholder={"请输入"+obj.name}
                />
            }
            //整理数据  重新设置
            return (
                <li className="ivv-edit-li" key={index}>
                    <span className="ivv-edit-name">{obj.required ? <i>*</i> : null}{obj.name}:</span>
                    <span className="ivv-edit-input">{input}</span>
                </li>
            )
        })
        return (
            <div className="ivv-edit">
                <ul className="ivv-edit-ul">
                    {lis}
                </ul>
                <div className="ivv-edit-primary">
                    <Button type="primary">{this.props.match.params.id===0?"提交":"修改"}</Button>
                </div>
            </div>
        )
    }
}

export default Edit