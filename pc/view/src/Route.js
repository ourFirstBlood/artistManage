import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import Login from './component/login/Login'
import Ivvtable from './component/Ivvtable'
import Content from './component/Content'
import Detail from './component/Detail'
import Edit from './component/Edit'


export default () => {
    return [
        <Route path="/" key="normal" exact render={()=><Redirect to="/index"/>} />,
        <Route path="/index" key="index" component={Login}/>,
        <Route path="/ivvtable" key="ivvtable" component={Ivvtable}/>,
        <Route path="/content" key="content" component={Content}/>,
        <Route path="/detail/:id" key="detail" component={Detail}/>,
        <Route path="/edit/:id" key="edit" component={Edit}/>
    ]
}