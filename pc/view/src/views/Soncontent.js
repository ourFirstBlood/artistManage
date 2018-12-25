/*
*  字段展示页面
*/

import React from 'react'
import axios from 'axios'
import Event from './js/Event'
import { axios_, info } from './js/common'
import { Button, Loading } from 'element-react'

import './css/soncontent.css'

class Soncontent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fixField: [],
            customField: [],
            showSave: false,
            saveFix: [],  //保留初始状态
            saveCustom: [],
            index: -1,
            trans: {    //转意
                text: '单行文本',
                textarea: '多行文本',
                radio: '单选框',
                checkbox: '多选框',
                date: '日期'
            }
        }
    }
    //弹框
    setShow = (data, index) => {
        this.setState({ index: index })
        Event.emit('setShow', data)
    }
    setShowSave = (data) => {
        let customField = this.state.customField
        if (this.state.index === -1) {
            customField.push(data)
        } else {
            customField[this.state.index] = data
        }
        this.setState({
            showSave: true,
            customField: customField,
        })
    }
    // save 数据
    isSaveData = (bool) => {
        if (bool) {
            //保存数据
            this.setState({
                loading: true
            }, () => {
                axios_(
                    '/power/form/edit_form',
                    {
                        custom: JSON.stringify(this.state.customField),
                        fixed: JSON.stringify(this.state.fixField)
                    }
                )
                info('保存成功')
                // console.log(res)
                // if (res.code === 0) {
                //
                //     this.setState({
                //         fixField: this.state.saveFix,
                //         saveCustom: JSON.parse(JSON.stringify(this.state.customField)),
                //         showSave: false,
                //         loading: false
                //     })
                // }
            })
        } else {
            this.setState({
                fixField: this.state.saveFix,
                customField: JSON.parse(JSON.stringify(this.state.saveCustom)),
                showSave: false
            })
        }
    }
    componentDidMount() {
        /* 查询字段 */
        axios.post(
            "/power/form/get_form"
        ).then((msg) => {
            const data = msg.data
            if (data.code === 0) {
                this.setState({
                    fixField: data.data.fixed,
                    customField: data.data.custom,
                    loading: false,
                    saveFix: data.data.fixed,
                    saveCustom: JSON.parse(JSON.stringify(data.data.custom))
                })
            } else {
                throw data.msg
            }
        }).catch((error) => {
            console.log(error)
        })
        /* 装载保存 */
        Event.addListener('setShowSave', this.setShowSave)
    }
    delData = (index) => {
        let custom = this.state.customField
        custom.splice(index, 1)
        this.setState({
            customField: custom,
            showSave: true
        })
    }
    componentWillUnmount() {
        console.log(this.state)
        Event.removeListener('setShowSave', this.setShowSave)
    }
    /* 获取字段 */
    getFieldList = (field, bool) => {
        const trans = this.state.trans
        return field.map((val, index) => {
            return (
                <ul key={index} className="ivv-table-field">
                    <li>{index + 1}</li>
                    <li>{val['name']}</li>
                    <li>{trans[val['type']]}</li>
                    {bool ? <li>
                        <span onClick={this.setShow.bind(this, val, index)} className="ivv-form-edit">编辑</span>
                        <span onClick={this.delData.bind(this, index)} className="ivv-form-del">删除</span>
                    </li> :
                        <li>
                            <span className="ivv-form-no">编辑</span>
                            <span className="ivv-form-no">删除</span>
                        </li>
                    }
                </ul>
            )
        })
    }
    render() {
        let field = {
            name: '',
            type: '',
            required: true,
            length: '',
            regex: '',
            options: ["", "", ""]
        }
        return (
            <Loading style={{ width: 'calc(100% - 260px)' }} loading={this.state.loading}>
                <div className="ivv-form">
                    <p>固定字段</p>
                    <ul className="ivv-table-title">
                        <li>序号</li>
                        <li>字段名</li>
                        <li>类别</li>
                        <li>操作</li>
                    </ul>
                    {this.getFieldList(this.state.fixField, false)}
                    <p className="ivv-custom"><span>自定义字段</span> <span className="ivv-field-add" onClick={this.setShow.bind(this, field, -1)}>添加字段+</span></p>
                    {this.getFieldList(this.state.customField, true)}
                    {this.state.showSave ? (<div className="ivv-save">
                        <Button onClick={this.isSaveData.bind(this, false)}>取消</Button>
                        <Button onClick={this.isSaveData.bind(this, true)} type="primary">保存</Button>
                    </div>) : null}
                </div>
            </Loading>
        )
    }
}

export default Soncontent