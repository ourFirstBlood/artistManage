/*
*  该页面包含整个content  
*   menu 侧边栏    
*/
import React from 'react'
import {Route} from 'react-router-dom'
import Menusider from '../component/menusider/Menusider'
import Soncontent from './Soncontent'
import Accounts from './Accounts'

class Content extends React.Component {
    render() {
        const route = [
            <Route path="/content/Soncontent" key="soncontent" component={Soncontent} />,
            <Route path="/content/accounts" key="account" component={Accounts} />
        ]
        return (
            <div className="ivv-content">
                <Menusider/>
                {route}
            </div>  
        )
    }
}

export default Content