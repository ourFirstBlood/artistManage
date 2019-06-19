import { Message } from 'element-react'

export default function(msg, type = true, duration = 1000) {
  Message({
    message: msg,
    type: type ? 'success' : 'error',
    duration,
    showClose:true
  })
}
