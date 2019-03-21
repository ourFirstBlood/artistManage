import React, {Component} from 'react'
import MenuRoute from '../../route/MenuRoute'
import './index.scss'

class Index extends Component {
    render() {
        return (
            <div className="index">
                <MenuRoute/>
            </div>
        )
    }
}

export default Index