import axios from 'axios'
import {Message} from 'element-react'
import qs from 'querystring'
//请求axios 封装
function axios_({url , params={}, type='POST', header={'Content-Type': 'application/x-www-form-urlencoded'}}) {
    return new Promise((resolve, reject)=>{
        axios({
            method: type,
            url: url,
            data: qs.stringify(params),
            headers: header
        }).then((res)=>{
            if(res.data.code === 0) {
               resolve(res.data) 
            } else if(res.data.code === 996) {
                this.props.history.push('/login', true)
            } else {
                info(res.data.msg, 'error')
                this.props.history.push('/ivvtable', true)
            }
        }).catch((err)=>{
            reject(err)
        })
    })
}


//信息封装
function info(msg, type='success', time=3000){
    Message({
        message: msg,
        type: type,
        duration: time
    });
}

export {axios_, info}