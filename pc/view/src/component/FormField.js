import React from 'react'
import {AutoComplete, Input, Radio, Button} from 'element-react'
import emitter from './ev'

class FormField extends React.Component {
    constructor(props) {
        super(props);
      
        this.state = {
            isshow : false,
            restaurants: [
                {'value': '文本', 'type': 'text'},
                {'value': '数字', 'type': 'num'},
                {'value': '布尔', 'type': 'bool'}
                ],
            value1: '',
            value2: '',
            value: 1
        }
    }
    querySearch(queryString, cb) {
        const { restaurants } = this.state;
        const results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
    }
    
    createFilter(queryString) {
        return (restaurant) => {
        return (restaurant.value.indexOf(queryString) === 0);
        };
    }
    
    handleSelect(item) {
        //console.log(item)
    }

    onChange(value) {
        this.setState({ value });
    }
    setShow = () => {
        this.setState({
            isshow: !this.state.isshow
        })
    }
    componentDidMount() {
        emitter.addListener('setShow', this.setShow)
    }
    componentWillUnmount() {
        emitter.removeListener('setShow')
    }
    render() {
        return this.state.isshow ? (
            <div className="ivv-form">
                <div className="ivv-form-auto">
                    <div className="ivv-height-div">
                        类型： 
                        <AutoComplete
                            placeholder="请选择"
                            value={this.state.value1}
                            fetchSuggestions={this.querySearch.bind(this)}
                            onSelect={this.handleSelect.bind(this)}
                    ></AutoComplete>
                    </div>
                    <div className="ivv-height-div">
                        长度：<div><Input placeholder="请输入内容" /></div>
                    </div>
                    
                    <div className="ivv-radio-form">
                        <span className="ivv-span-margin">是否必填：</span>
                        <Radio value="1" checked={this.state.value === 1} onChange={this.onChange.bind(this)}>是</Radio>
                        <Radio value="2" checked={this.state.value === 2} onChange={this.onChange.bind(this)}>否</Radio>
                    </div>

                    <div className="ivv-height-div">
                        <span className="ivv-span-height">字段判断：</span>
                        <AutoComplete
                            placeholder="请选择"
                            value={this.state.value1}
                            fetchSuggestions={this.querySearch.bind(this)}
                            onSelect={this.handleSelect.bind(this)}
                    ></AutoComplete>
                    </div>
                    
                    <div className="ivv-form-button">
                        <Button type="primary">确认</Button>
                        <Button onClick={this.setShow}>取消</Button>   
                    </div>
                </div>
            </div>
        ) : null
    }
}

export default FormField