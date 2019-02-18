/*
*  表单设置页面
*/
import React from 'react'
import { Input, Button, Select, Radio} from 'element-react'
import {info} from './js/common'
import Event from './js/Event'
import './css/ivvform.css'
class Ivvform extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            setWhat: 'custom',
            typeOptions: [
                {
                    value: 'text',
                    label: '单行文本'
                },
                {
                    value: 'textarea',
                    label: '多行文本'
                },
                {
                    value: 'radio',
                    label: '单选框'
                },
                {
                    value: 'checkbox',
                    label: '复选框'
                },
                {
                    value: 'date',
                    label: '日期'
                }
            ],
            name: '', //filed name 
            type: '',
            length: '',
            isValue: 1, //是否必填
            regex: '', //验证方式
            verifyOptions: [
                {
                    value: 'phone',
                    label: '手机'
                },
                {
                    value: 'number',
                    label: '数字'
                },
                {
                    value: 'id_card',
                    label: '身份证'
                },
                {
                    value: 'e_mail',
                    label: '邮箱'
                }
            ],
            options: ["", ""],
            show: false,
        }
    }
    //radio 设置
    onChange(isValue) {
        this.setState({ isValue })
    }
    //该字段是否展示设置
    onSetWhat(setWhat) {
        this.setState({setWhat})
    }
    //field name 设置
    changeName = (name) => {
        this.setState({ name })
    }
    //field.length 设置
    changeLength = (length) => {
        if (!Number.isNaN(length)) {
            length = length ? Number.parseInt(length): null
            this.setState({ length })
        }
    }
    //当前页面是否显示
    setShow = (data, setWhat) => {
        console.log(data)
        //data存在为编辑数据
        this.setState({
            setWhat: setWhat,
            name: data.name,
            type: data.type,
            isValue: data.required ? 1 : 0,
            length: data.length || '',
            regex: data.regex || '',
            options: data.options || ['', ''],
            show: !this.state.show,
        })
    }
    //设置自定义选项
    setOptions(type, key, value) {
        let options = this.state.options
        if (type === 'add') {
            options.push("")
        } else if (type === 'update') {
            options[key] = value
        } else if (type === 'reduce') {
            options.splice(key, 1)
        }
        this.setState(options)
    }
    //是否显示保存
    setShowSave = () => {
        if (this.state.name === '') {
            info('请填写字段名', 'warning');
        } else if (this.state.type === '') {
            info('请选择字段类型', 'warning');
        } else if ((this.state.type === "radio" || this.state.type === "checkbox") && this.state.options.lastIndexOf('') !== -1) {
            info('您还有选项未设置，请先设置选项', 'warning');
        } else {
            let data = {}
            data.setWhat = this.state.setWhat
            data.name = this.state.name
            data.required = this.state.isValue === 1
            switch (this.state.type) {
                case 'text':
                    data.type = 'text'
                    data.length = this.state.length
                    data.regex = this.state.regex
                    break
                case 'textarea':
                    data.type = 'textarea'
                    break
                case 'radio':
                    data.type = 'radio'
                    data.options = this.state.options
                    break
                case 'checkbox':
                    data.type = 'checkbox'
                    data.options = this.state.options
                    break
                default:
                    data.type = 'date'
            }
            //添加或者修改
            Event.emit('setShowSave', data)//保存显示
            this.setState({ show: false }) //隐藏弹窗
        }
    }
    setTypeOrRegex(opt, value) {
        if (opt === "type") {
            this.setState({ type: value })
        } else {
            this.setState({ regex: value })
        }
    }
    componentDidMount() {
        //装载监听组件
        Event.addListener('setShow', this.setShow)
    }
    componentWillUnmount() {
        Event.removeListener('setShow', this.setShow)
    }
    render() {
        const show = this.state.show
        //选项设置
        const module = this.state.options.map((value, index) => {
            return (
                <span className="vform-module-opt" key={index}>
                    <Input onChange={this.setOptions.bind(this, 'update', index)} placeholder="请设置选项" value={value} />
                    {index < 2 ? null : <i onClick={this.setOptions.bind(this, 'reduce', index)} className="el-icon-minus vform-module-reduce"></i>}
                </span>
            )
        })
        return show ? (
            <div className="ivv-vform">
                <ul className="vform">
                    <li>
                        <span className="vform-name">是否展示：</span>
                        <span className="vform-module">
                            <Radio name="isShow" value='fixed' checked={this.state.setWhat === 'fixed'} onChange={this.onSetWhat.bind(this)}>是</Radio>
                            <Radio name="isShow" value='custom' checked={this.state.setWhat === 'custom'} onChange={this.onSetWhat.bind(this)}>否</Radio>
                        </span>
                    </li>
                    <li>
                        <span className="vform-name">字段名：</span>
                        <span className="vform-module"><Input onChange={this.changeName} placeholder="请输入字段名" value={this.state.name} /></span>
                    </li>
                    <li>
                        <span className="vform-name">类型：</span>
                        <span className="vform-module">
                            <Select value={this.state.type} placeholder="请选择" onChange={this.setTypeOrRegex.bind(this, 'type')}>
                                {
                                    this.state.typeOptions.map(el => {
                                        return <Select.Option key={el.value} label={el.label} value={el.value} />
                                    })
                                }
                            </Select>
                        </span>
                    </li>
                    {this.state.type === "text" ? <li>
                        <span className="vform-name">长度：</span>
                        <span className="vform-module"><Input onChange={this.changeLength} value={this.state.length} placeholder="请输入内容" /></span>
                    </li> : null}
                    <li>
                        <span className="vform-name">是否必填：</span>
                        <span className="vform-module">
                            <Radio name="isRequire" value={1} checked={this.state.isValue === 1} onChange={this.onChange.bind(this)}>是</Radio>
                            <Radio name="isRequire" value={0} checked={this.state.isValue === 0} onChange={this.onChange.bind(this)}>否</Radio>
                        </span>
                    </li>
                    {this.state.type === "text" ? <li>
                        <span className="vform-name">字段判断：</span>
                        <span className="vform-module">
                            <Select value={this.state.regex} placeholder="请选择验证方式" onChange={this.setTypeOrRegex.bind(this, 'regex')}>
                                {
                                    this.state.verifyOptions.map(el => {
                                        return <Select.Option key={el.value} label={el.label} value={el.value} />
                                    })
                                }
                            </Select>
                        </span>
                    </li> : null}
                    {this.state.type === 'radio' || this.state.type === 'checkbox' ? <li className="vform-form-opt">
                        <span className="vform-opt">选项：</span>
                        <span className="vform-module">
                            {module}
                            <i onClick={this.setOptions.bind(this, 'add')} className="el-icon-plus vform-module-add"></i>
                        </span>
                    </li> : null}
                    <li className="lastli">
                        <Button onClick={this.setShow}>取消</Button>
                        <Button type="primary" onClick={this.setShowSave}>确定</Button>
                    </li>
                </ul>
            </div>
        ) : null
    }
}
export default Ivvform