import axios from 'axios'
import msg from './msg'

function ajaxReq({
  url,
  params = {},
  alert = true,
  can
}) {
  return new Promise((resolve, reject) => {
    let formData = new FormData()
    for (let key in params) {
      if (params[key] instanceof Object) {
        formData.append(key, JSON.stringify(params[key]))
      } else {
        formData.append(key, params[key])
      }
    }
    axios({
        method: 'POST',
        url,
        data: formData,
        cancelToken: new axios.CancelToken((c) => {
          if (!can) return
          can.cancel = c
        })
      })
      .then(res => {
        if (res.status === 200) {
          if (!alert) {
            resolve(res.data)
            return
          }
          if (res.data.code === 0) {
            resolve(res.data)
          } else if (res.data.code === 996) {
            msg('请先登陆再操作！', false)
            if (this.props && this.props.history) {
              this.props.history.push('/login')
            }
            reject(res.data)
          } else {
            msg(res.data.msg, false)
            reject(res.data)
          }
        } else {
          throw res
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

export default ajaxReq