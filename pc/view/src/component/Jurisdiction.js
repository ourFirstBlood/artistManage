import React from 'react'
import Sider from './Sider'
import Field from './Field'

class Jurisdiction extends React.Component {
    render() {
        return (
            <div className="ivv-content">
                <Sider/>
                <Field/>
            </div>
        )
    }
}

export default Jurisdiction