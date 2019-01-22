import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import Login from './views/Login'
import Ivvtable from './views/Ivvtable'
import Content from './views/Content'
import Detail from './views/Detail'
import Edit from './views/Edit'


export default () => {
    return [
        <Route path="/" key="normal" exact render={()=><Redirect to="/ivvtable"/>} />,
        <Route path="/ivvtable" key="ivvtable" component={Ivvtable}/>,
        <Route path="/content" key="content" component={Content}/>,
        <Route path="/detail/:id" key="detail" component={Detail}/>,
        <Route path="/edit/:id" key="edit" component={Edit}/>,
        <Route path="/login" key="login" component={Login}/>
    ]
}