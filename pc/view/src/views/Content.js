/*
*  该页面包含整个content  
*   menu 侧边栏    
*/
import React from 'react'
import {Route} from 'react-router-dom'
import Menusider from '../component/menusider/Menusider'
import Soncontent from './Soncontent'

class Content extends React.Component {
    render() {
        return (
            <div className="ivv-content">
                <Menusider/>
                <Route path="/content/Soncontent" key="soncontent" component={Soncontent} />
            </div>  
        )
    }
}

export default Content