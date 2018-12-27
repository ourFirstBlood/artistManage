import axios from 'axios'
import {Message} from 'element-react'
import qs from 'querystring'
import history from "../../history"
//请求axios 封装
function axios_({url , params={}, type='POST', header={'Content-Type': 'application/x-www-form-urlencoded'}}) {
    console.log(qs.parse(qs.stringify(params)))

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
                history.push('/login', true)
                console.log(history)
            } else {
                throw res.data
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