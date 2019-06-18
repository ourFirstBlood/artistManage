import axios from 'axios'
import msg from './msg'
import qs from 'qs'
function ajaxReq({ url, params = {}, alert = true }) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: url,
      data: qs.stringify(params),
      headers: { 'Content-type': 'application/x-www-form-urlencoded' }
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
            console.log(this.props)
            if (this.props) {
              this.props.history.push('/login')
            }
          } else {
            msg(res.data.msg, false)
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
