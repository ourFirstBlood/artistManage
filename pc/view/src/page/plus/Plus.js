import React, { Component } from 'react'
import ajaxReq from '../../common/ajaxReq'

import './plus.scss'
import { Input, Radio, Checkbox, DatePicker, Button, Loading } from 'element-react';
import msg from '../../common/msg';
class Plus extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: 0,
            forms: [],
            loading: true
        }
    }
    componentDidMount() {
        const id = this.props.match.params.id
        if (!id) {
            ajaxReq.call(this, {
                url: '/power/form/get_form'
            }).then(res => {
                const forms = []
                forms.push(...res.data.fixed, ...res.data.custom)
                this.setState({ forms, loading: false })
            })
        } else {
            this.setState({ id })
            ajaxReq.call(this, {
                url: '/artist/detail',
                params: { id }
            }).then(res => {
                this.setState({
                    forms: res.data,
                    loading: false
                })
            })
        }

    }
    //保存
    verifySave = () => {
        const forms = this.state.forms
        let verify = ''
        const bool = forms.some(function (val) {
            if (val.required && (val.value == null || val.value === '')) {
                verify = `${val.name}未填写`
                return true
            }
            if (val.regex === 'phone') {
                verify = `${val.name}格式（手机）填写错误`
                return !(/^1[34578]\d{9}$/.test(val.value))
            }
            if (val.regex === 'mail') {
                verify = `${val.name}格式（邮箱）填写错误`
                return !(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(val.value))
            }
            if (val.regex === 'cardID') {
                verify = `${val.name}格式（身份证号）填写错误`
                return !(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(val.value))
            }
            return false
        })
        if (bool) {
            msg(verify, false)
        } else {
            ajaxReq.call(this, {
                url: '/artist/add_artists',
                params: {
                    id: this.state.id,
                    info: JSON.stringify(this.state.forms)
                }
            }).then(() => {
                msg('保存成功')
                this.props.history.go(-1)
            })
        }
    }
    //修改text Radio checkbox
    changeTextRadio = (keys, val) => {
        const forms = this.state.forms
        if (forms[keys].type === "date") {
            forms[keys].value = this.formatDate(val)
        } else if (forms[keys].regex === "number") {
            if (!isNaN(val)) {
                forms[keys].value = val
            }
        } else {
            forms[keys].value = val
        }

        this.setState({ forms })
    }
    formatDate(date) {
        const time = new Date(date)
        return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDay()}`
    }
    render() {
        //渲染表单
        const forms = this.state.forms.map((val, keys) => {
            return (
                <li key={keys}>
                    <span className="plus-name">{val.name}:</span>
                    <span className="plus-input">
                        {val.type === 'text' ? <Input value={val.value} onChange={this.changeTextRadio.bind(this, keys)} /> : null}
                        {val.type === 'textarea' ? <Input
                            type="textarea" onChange={this.changeTextRadio.bind(this, keys)}
                            autosize={{ minRows: 2, maxRows: 4 }}
                            placeholder="请输入内容"
                        /> : null}
                        {val.type === 'radio' ? val.options.map((value, key) => {
                            return <Radio key={key} value={value}
                                onChange={this.changeTextRadio.bind(this, keys)}
                                checked={value === val.value}>{value}</Radio>
                        }) : null}
                        {val.type === 'checkbox' ? <Checkbox.Group value={val.value} onChange={this.changeTextRadio.bind(this, keys)}>
                            {val.options.map((value, key) => {
                                return <Checkbox key={key} label={value} ></Checkbox>
                            })}
                        </Checkbox.Group> : null}
                        {val.type === 'date' ? <DatePicker isReadOnly={true}
                            placeholder="选择日期" value={val.value == null ? null : new Date(val.value)}
                            onChange={this.changeTextRadio.bind(this, keys)} /> : null}
                    </span>
                </li>
            )
        })

        return (
            <div className="plus">
                <Loading style={{width:'100%', height:'100%'}} loading={this.state.loading}>
                    <ul >
                        {forms}
                        <li style={this.state.loading?{display:'none'}:null}><Button onClick={()=>{this.props.history.go(-1)}}>返回</Button><Button onClick={this.verifySave} type="primary">保存</Button></li>
                    </ul>
                </Loading>
            </div>
        )
    }
}
export default Plus