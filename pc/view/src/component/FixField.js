//固定字段&自定义字段
import React from 'react'
import emitter from './ev'
import axios from 'axios'

class FixField extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fixData: [
                {"name":"备注","type":"textArea","length":100,"required":true,"regex":""}
            ],
            freeData: [
                {"name":"备注","type":"textArea","length":100,"required":true,"regex":""}
            ],
            typeLimit: {
                'text': '文本',
                'textarea': '多行文本',
                'radio': '单选框',
                'checkbox': '多选框',
                'date': '日期'
            }
        }
    }
    setShow = () => {
        emitter.emit('setShow')
    }
    componentDidMount() {
        axios.post(
            'http://www.ivvmedia.com:8080/power/form/get_form'
            ).then(
                (response) => {
                    const data = response.data
                    console.log(data.data)
                    if(data.code === 0) {
                        console.log()
                        this.setState({
                            fixData: data.data.fixed,
                            freeData: data.data.custom
                        })
                    } else if(data.code === 999) { //普通报错
                        throw data.msg
                    } else if(data.code === 996) {
                        //未登陆
                        throw data.msg
                    } else {
                        throw data.msg
                    }   
                }
            ).catch(
                (error) => {
                    alert(error)
                }
            ) 
        }
    render() {
        /* 固定字段 */
        const fixDom = this.state.fixData.map(
            (val, key) => {
                return (
                <ul key={key} className="ivv-field-table">
                    <li>{key+1}</li>
                    <li>{val.name}</li>
                    <li>{this.state.typeLimit[val.type]}</li>
                    <li>
                        <span className="ivv-edit">编辑</span>
                        <span>删除</span>
                    </li>
                </ul>)
            }
        );
        /* add 字段 （自定义） */
        const freeDom = this.state.freeData.map(
            (val, key) => {
                return (
                    <ul key={key} className="ivv-field-table">
                        <li>{key+1}</li>
                        <li>{val.name}</li>
                        <li>{this.state.typeLimit[val.type]}</li>
                        <li>
                            <span className="ivv-edit">编辑</span>
                            <span>删除</span>
                        </li>
                    </ul>
                )
            }
        )
        return (
            <div className="ivv-dom">
                {fixDom}
                <p>自定义字段<span className="ivv-addfield" onClick={this.setShow}>添加字段+</span></p>
                {freeDom}
            </div>
        )
    }
}
export default FixField