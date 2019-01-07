/*
* 编辑信息页面 // 或添加信息
*/

import React from 'react'
import { Input, Radio, Checkbox, DatePicker, Button, Loading } from 'element-react'
import { axios_, info } from './js/common'
import './css/edit.css'

class Edit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
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
                this.setState({ data,loading:false })
            })
        } else {
            //添加
            const res = axios_.call(this, {
                url: '/power/form/get_form'
            })
            res.then(success => {
                const data = success.data
                let newData = [].concat(data.fixed, data.custom)
                this.setState({ data: newData, loading: false })
            })
        }
    }
    //文本框改变
    setData(index, value) {
        const data = this.state.data
        if (data[index].type === "text") {
            if (data[index].length !== "") {
                data[index].value = value.slice(0, data[index].length)
            } else if (data[index].regex === "number") {
                if (!isNaN(value)) data[index].value = value
            } else {
                data[index].value = value
            }
        } else {
            data[index].value = value
        }
        this.setState({ data })
    }
    //checkbox 设置
    setCheckbox(index, value, bool) {
        const data = this.state.data
        if (!data[index].value) data[index].value = []
        if (bool) {
            data[index].value.push(value)
        } else {
            data[index].value.splice(data[index].value.indexOf(value), 1)
        }
        this.setState({ data })
    }
    save() {
        const data = this.state.data
        const isRequired = data.some(obj => {
            return obj.required&&(obj.value===null||obj.value===undefined||obj.value==="")
        })
        if (isRequired) return info("您还有必填项未填写", "error")
        let typeRegex = ""
        const isRegex = data.some(obj=>{
            if(obj.regex === 'phone'){
                const phoneRegex = /^[1][3,4,5,7,8](\d{9})$/
                if(!phoneRegex.test(obj.value)){
                    typeRegex = "手机号"
                    return true
                }
            } else if(obj.regex === "e_mail") {
                const mailRegex = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
                if(!mailRegex.test(obj.value)){
                    typeRegex = "邮箱"
                    return true
                }
            } else if(obj.regex === "id_card") {
                const cardRegex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
                if(!cardRegex.test(obj.value)) {
                    typeRegex = "身份证"
                    return true
                }
            }
            return false
        })
        if(isRegex) {
            info("对不起，您的"+typeRegex+"填写不合法", "error")
        } else {
            //提交数据
            this.setState({loading: true})
            const id = this.props.match.params.id
            const res = axios_({
                url: '/artist/add_artists',
                params: {
                    info: JSON.stringify(this.state.data),
                    id: id
                }
            })
            res.then(() => {
                const str = id==="0"?"增加":"修改"
                info(str+"成功")
                this.props.history.replace('/ivvtable')
            })
        }
    }
    render() {
        let lis = this.state.data.map((obj, index) => {
            let input = null
            if (obj.type === "text") {
                input = <Input placeholder={"请输入" + obj.name} value={obj.value} onChange={this.setData.bind(this, index)} />
            } else if (obj.type === "radio") {
                input = obj.options.map((val, key) => {
                    return <Radio onChange={this.setData.bind(this, index)} value={val} key={key} name={'name' + index} checked={obj.value === val}>{val}</Radio>
                })
            } else if (obj.type === "checkbox") {
                input = obj.options.map((val, key) => {
                    return <Checkbox onChange={this.setCheckbox.bind(this, index, val)} checked={obj.value && obj.value.indexOf(val) >= 0} key={key}>{val}</Checkbox>
                })
            } else if (obj.type === "date") {
                input = <DatePicker
                    value={obj.value ? new Date(obj.value) : null}
                    placeholder="选择日期"
                    onChange={date => {
                        const data = this.state.data
                        data[index].value = date?date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate():null
                        this.setState({ data: data })
                    }} />
            } else if (obj.type === "textarea") {
                input = <Input className="ivv-edit-textarea"
                    type="textarea" onChange={this.setData.bind(this, index)}
                    value={obj.value}
                    autosize={{ minRows: 5, maxRows: 5 }}
                    placeholder={"请输入" + obj.name}
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
                <Loading loading={this.state.loading}>
                    <ul className="ivv-edit-ul">
                        {lis}
                    </ul>
                    <div className="ivv-edit-primary">
                        {this.state.data.length === 0?null:<Button onClick={this.save.bind(this)} type="primary">{this.props.match.params.id === "0" ? "提交" : "修改"}</Button>}
                    </div>
                </Loading>
            </div>
        )
    }
}

export default Edit