import React from 'react'
import { Radio } from 'element-react';


class PowerManage extends React.Component {
  constructor(props) {
  super(props);

  this.state = {
    value: 1
  }
}

onChange(value) {
  this.setState({ value });
}

  render() {
    return (
      <div>
      <Radio value="1" checked={this.state.value === 1} onChange={this.onChange.bind(this)}>备选项</Radio>
      <Radio value="2" checked={this.state.value === 2} onChange={this.onChange.bind(this)}>备选项</Radio>
    </div>
    )
  }
}
export default PowerManage
