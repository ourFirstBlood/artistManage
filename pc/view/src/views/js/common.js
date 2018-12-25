import axios from 'axios'
import {Message} from 'element-react'
import qs from 'querystring'

function axios_(url, params={}, type='POST', header={'Content-Type': 'application/x-www-form-urlencoded'}) {
    const params_ = qs.stringify(params) //反序化
    axios({
        method: type,
        url: url,
        data: params_,
        headers: header
    }).then((res)=>{
        if(res.data.code === 0) {
            return res.data
        } else {
            throw res.data.msg
        }
    }).catch((err)=>{
        console.log(err)
    })
}
function info(msg, type='success', time=3000){
    Message({
        message: msg,
        type: type,
        duration: time
    });
}

export {axios_, info}