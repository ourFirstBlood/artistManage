import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import MyTable from './component/MyTable'
import Jurisdiction from './component/Jurisdiction'

export default () => {
    return  [
        <Route path="/" key="normal" exact render={()=><Redirect to='/index'/>} />,
        <Route path="/index" key="index" component={MyTable} />,
        <Route path="/jurisdiction" key="jurisdiction" component={Jurisdiction} />
    ]
}