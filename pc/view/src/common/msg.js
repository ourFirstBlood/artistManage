import { Message } from 'element-react'

export default function(msg, type=true) {
    Message({
        message: msg,
        type: type ? 'success' : 'error'
    })
}