//固定字段&自定义字段
import React from 'react'
import emitter from './ev'

class FixField extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fixData: [
                [1, '姓名', '输入框'],
                [2, '手机', '手机'],
                [3, '性别', '单选框']
            ],
            freeData: [
                [4, '年龄', '输入框']
            ]
        }
    }
    setShow = () => {
        emitter.emit('setShow')
    }
    render() {
        /* 固定字段 */
        const fixDom = this.state.fixData.map(
            (val, key) => {
                return (
                <ul key={key} className="ivv-field-table">
                    <li>{val[0]}</li>
                    <li>{val[1]}</li>
                    <li>{val[2]}</li>
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
                    <li>{val[0]}</li>
                    <li>{val[1]}</li>
                    <li>{val[2]}</li>
                    <li>
                        <span className="ivv-edit">编辑</span>
                        <span>删除</span>
                    </li>
                </ul>)
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