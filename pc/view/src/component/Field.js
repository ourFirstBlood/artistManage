import React from 'react'
import FixField from './FixField'
import './css/field.css'

class Field extends React.Component {
    render() {
        return (
            <div className="ivv-field">
                <p>固定字段</p>
                <ul className="ivv-field-table">
                    <li>#</li>
                    <li>字段名</li>
                    <li>类别</li>
                    <li>操作</li>
                </ul>
                <FixField/>
            </div>
        )
    }
}

export default Field