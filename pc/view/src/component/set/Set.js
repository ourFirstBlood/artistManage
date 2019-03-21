import React, { Component } from 'react'
import { Radio, Select, Input, Button} from 'element-react'
import msg from '../../common/msg'
import './set.scss'

class Set extends Component {
    constructor(props) {
        super(props);

        this.state = {
            typeOptions: [{
                value: 'text',
                label: '单行文本'
            }, {
                value: 'textarea',
                label: '多行文本'
            }, {
                value: 'checkbox',
                label: '多选框'
            }, {
                value: 'radio',
                label: '单选框'
            }, {
                value: 'date',
                label: '日期'
            }],
            type: '',
            name: '',
            verifyArr: [{
                value: 'phone',
                label: '手机'
            }, {
                value: 'number',
                label: '数字'
            }, {
                value: 'cardID',
                label: '身份'
            }, {
                value: 'e-mail',
                label: '邮箱'
            }],
            regex: '',
            disabled: false,
            sign: 'custom', //展示字段 默认固定
            required: true,
            length: null,
            options: ['', '']
        };
    }
    setSign = sign => {
        this.setState({sign})
    }
    setRequired = required => {
        required = required ? true : false
        this.setState({required})
    }
    //设置长度
    setLength = length => {
        length = Number(length)
        length = Number.isNaN(length)||length<1 ? null : length.toFixed(0)
        this.setState({length})
    }
    //设置选项
    setOptions = (index, val) => {
        const options = this.state.options
        options[index] = val
        this.setState({options})
    }
    //设置radio或者checkbox出现的表单
    getRadioCheckbox = () => {
        return this.state.options.map((val, index)=>{
            return (
                <span key={index} className="set-radio-checkbox">
                    {index>1?<i onClick={this.reduceRadioCheck.bind(this, index)} className="fix-raduce el-icon-minus"></i>:null}
                    <Input value={val} onChange={this.setOptions.bind(this, index)}></Input>
                </span>
            )
        })
    }
    //添加radio checkbox
    addRadioCheck = () => {
        const options = this.state.options
        options.push('')
        this.setState({options})
    }
    reduceRadioCheck = index => {
        const options = this.state.options
        options.splice(index, 1)
        this.setState({options})
    }
    setShowSet = bool => { 
        if(bool) {
            const data = {
                sign: this.state.sign,
                name: this.state.name,
                type: this.state.type,
                length: this.state.length,
                required: this.state.required,
                regex: this.state.regex,
                options: this.state.options
            }
            if(!data.name) {
                return msg('请填写字段名', false)
            } else if (!data.type) {
                return msg('请设置字段类型', false)
            } else if ((data.type==='radio' || data.type === 'checkbox') && data.options.some(val => val === '')) {
                return msg('您有选项未设置', false)
            }
            return this.props.show(data, bool)
        } else {
            return this.props.show({}, bool)
        }  
    }
    componentDidMount() {
        const data = this.props.data
        if(JSON.stringify(data) !== '{}') {
            this.setState({
                disabled: true,
                type: data.type,
                name: data.name,
                length: data.length || null,
                required: data.required,
                options: data.options || ['', ''],
                regex: data.regex || '',
                sign: data.sign
            })
        }
    }
    render() {
        return (
            <div className="set">
                <div className="set-layout">
                    <h1 className="title">表单字段设置</h1>
                    <ul>
                        <li>
                            <span className="set-name">是否展示：</span>
                            <span className="set-content">
                                <Radio disabled={this.state.disabled} onChange={this.setSign} value='fixed' checked={this.state.sign==='fixed'}>是</Radio>
                                <Radio disabled={this.state.disabled} onChange={this.setSign} value='custom' checked={this.state.sign==='custom'}>否</Radio>
                            </span>
                        </li>
                        <li>
                            <span className="set-name">字段名：</span>
                            <span className="set-content">
                                <Input onChange={name=>this.setState({name})} value={this.state.name}/>
                            </span>
                        </li>
                        <li>
                            <span className="set-name">字段类型：</span>
                            <span className="set-content">
                                <Select onChange={type=>this.setState({type})} value={this.state.type} placeholder="请选择字段类型">
                                    {
                                        this.state.typeOptions.map(el => {
                                            return <Select.Option key={el.value} label={el.label} value={el.value} />
                                        })
                                    }
                                </Select>
                            </span>
                        </li>
                        <li>
                            <span className="set-name">是否必填：</span>
                            <span className="set-content">
                                <Radio onChange={this.setRequired} value={1} checked={this.state.required===true}>是</Radio>
                                <Radio onChange={this.setRequired} value={0} checked={this.state.required===false}>否</Radio>
                            </span>
                        </li>
                        {
                            this.state.type==='text' ? [
                                <li key="length">
                                    <span className="set-name">字段长度：</span>
                                    <span className="set-content">
                                    <Input value={this.state.length} onChange={this.setLength}></Input>
                                    </span>
                                </li>,
                                <li key="regex">
                                    <span className="set-name">验证方式：</span>
                                    <span className="set-content">
                                        <Select onChange={regex=>this.setState({regex})} value={this.state.regex} placeholder="请选择字段类型">
                                            {
                                                this.state.verifyArr.map(el => {
                                                    return <Select.Option key={el.value} label={el.label} value={el.value} />
                                                })
                                            }
                                        </Select>
                                    </span>
                                </li>

                            ] : null 
                        }
                        {
                            this.state.type === 'radio'|| this.state.type === 'checkbox' ? (
                                <li>
                                    <span className="set-name">选项：</span>
                                    <span className="set-content-radio">
                                        <i onClick={this.addRadioCheck} className="el-icon-plus fix-add"></i>
                                        {this.getRadioCheckbox()}
                                    </span>
                                </li>
                            ) : null
                        }
                        <li className="set-primary">
                            <Button onClick={this.setShowSet.bind(this, false)}>取消</Button>
                            <Button onClick={this.setShowSet.bind(this, true)} type="primary">确定</Button>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Set