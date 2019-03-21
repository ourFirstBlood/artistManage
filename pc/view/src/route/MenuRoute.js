import React from 'react'
import {Route} from 'react-router-dom'
import Header from '../component/header/Header'
import Menu from '../component/menu/Menu'
import List from '../component/list/List'
import Account from '../component/account/Account'
import Form from '../component/form/Form'
import Plus from '../component/plus/Plus'

export default function() {
    return (
        <div className="menu-route">
            <Header/>
            <Menu/>
            <Route path='/index/list' key="List" component={List}/>
            <Route path='/index/account' key="account" component={Account}/>
            <Route path='/index/form' key="form" component={Form}/>
            <Route path='/index/plus/:id?' key="plus" component={Plus}/>
        </div>  
    )
}