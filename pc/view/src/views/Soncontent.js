/*
*  字段展示页面
*/

import React from 'react'
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
    setShow = (data, index, setWhat) => {
        this.setState({ index }) //编辑的某个字段及index位置
        Event.emit('setShow', data, setWhat)
    }
    setShowSave = (data) => {
        const setWhat = data.setWhat
        delete(data.setWhat)
        if(setWhat === 'custom') {
            const customField = this.state.customField
            this.state.index === -1 ? customField.push(data) : (customField[this.state.index] = data)
            this.setState(customField)
        } else {
            const fixField = this.state.fixField
            this.state.index === -1 ? fixField.push(data) : (fixField[this.state.index] = data)
            this.setState({fixField})
        }
        this.setState({
            showSave: true
        })
    }
    // save 数据
    isSaveData = (bool) => {
        if (bool) {
            //保存数据
            this.setState({
                loading: true
            }, () => {
                const res = axios_.call(this, {
                    url: '/power/form/edit_form',
                    params: { custom: JSON.stringify(this.state.customField), fixed: JSON.stringify(this.state.fixField)}
                })
                res.then((success) => {
                    this.setState({
                        saveFix: JSON.parse(JSON.stringify(this.state.fixField)),
                        saveCustom: JSON.parse(JSON.stringify(this.state.customField)),
                        showSave: false,
                        loading: false
                    })
                    info("保存成功")
                })
            })
        } else {
            this.setState({
                fixField: JSON.parse(JSON.stringify(this.state.saveFix)),
                customField: JSON.parse(JSON.stringify(this.state.saveCustom)),
                showSave: false
            })
        }
    }
    //删除
    delData = (index, setWhat) => {
        if(setWhat === 'custom'){
            const customField = this.state.customField
            customField.splice(index, 1)
            this.setState({customField})
        }else{
            const fixField = this.state.fixField
            fixField.splice(index, 1)
            this.setState({fixField})
        }        
        this.setState({
            showSave: true
        })
    }
    //上移
    moveUp = (index, setWhat) => {
        if(index === 0) return
        this.setState({showSave: true})
        if(setWhat === "custom") {
            let customField = this.state.customField;
            [customField[index], customField[index-1]] = [customField[index-1], customField[index]]
            this.setState({customField})
        } else {
            let fixField = this.state.fixField;
            [fixField[index], fixField[index-1]] = [fixField[index-1], fixField[index]]
            this.setState({fixField})
        }
    }
    //下移
    moveDown = (index, setWhat) =>{
        if(setWhat === "custom") {
            if(index+1 === this.state.customField.length) return
            let customField = this.state.customField;
            [customField[index], customField[index+1]] = [customField[index+1], customField[index]]
            this.setState({customField, showSave: true})
        } else {
            if(index+1 === this.state.fixField.length) return
            let fixField = this.state.fixField;
            [fixField[index], fixField[index+1]] = [fixField[index+1], fixField[index]]
            this.setState({fixField, showSave:true})
        }
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
                        <span onClick={this.setShow.bind(this, val, index,'custom')} className="ivv-form-edit">编辑</span>
                        <span onClick={this.delData.bind(this, index, 'custom')} className="ivv-form-del">删除</span>
                        <span onClick={this.moveUp.bind(this, index, 'custom')} className="ivv-form-up">上移</span>
                        <span onClick={this.moveDown.bind(this, index, 'custom')} className="ivv-form-down">下移</span>
                    </li> :
                    <li>
                        <span onClick={this.setShow.bind(this, val, index,'fixed')} className="ivv-form-edit">编辑</span>
                        <span onClick={this.delData.bind(this, index,'fixed')} className="ivv-form-del">删除</span>
                        <span onClick={this.moveUp.bind(this, index, 'fixed')} className="ivv-form-up">上移</span>
                        <span onClick={this.moveDown.bind(this, index, 'fixed')} className="ivv-form-down">下移</span>
                    </li>
                    }
                </ul>
            )
        })
    }
    componentDidMount() {
        /* 查询字段 */
        const res = axios_.call(this, {
            url: "/power/form/get_form",
        })
        res.then((success) => {
            const data = success.data
            this.setState({
                fixField: data.fixed,
                customField: data.custom,
                loading: false,
                saveFix: JSON.parse(JSON.stringify(data.fixed)),
                saveCustom: JSON.parse(JSON.stringify(data.custom))
            })
        })
        /* 装载保存 */
        Event.addListener('setShowSave', this.setShowSave)
    }
    componentWillUnmount() {
        console.log(this.state)
        Event.removeListener('setShowSave', this.setShowSave)
    }
    render() {
        let field = {
            name: '',
            type: '',
            required: true,
            length: '',
            regex: '',
            options: ["", ""]
        }
        return (
            <Loading className="ivv-loading-form" loading={this.state.loading}>
                <div className="ivv-form">
                    <p>展示字段</p>
                    <ul className="ivv-table-title">
                        <li>序号</li>
                        <li>字段名</li>
                        <li>类别</li>
                        <li>操作</li>
                    </ul>
                    {this.getFieldList(this.state.fixField, false)}
                    <p className="ivv-custom"><span>更多字段</span> <span className="ivv-field-add" onClick={this.setShow.bind(this, field, -1, 'custom')}>添加字段+</span></p>
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