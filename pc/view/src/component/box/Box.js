//详情盒子
import React, {Component} from 'react'
import './box.scss'

class Box extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    getDate = () => {
        return this.state.data.map((val, index) => {
            return (
                <li key={index}>
                    <span className="box-props">
                        {val.name}:
                    </span>
                    <span className="box-val">
                        {val.value}
                    </span>
                </li>
            )
        })
    }
    componentDidMount() {
        this.setState({data: this.props.data})
    }
    render() {
        return (
            <div className="box">
                <div className="box-layout">
                    <i onClick={this.props.show} className="el-icon-close box-close"></i>
                    <h1 className="box-nav">
                        详情
                    </h1>
                    <ul className="box-data">
                        {this.getDate()}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Box