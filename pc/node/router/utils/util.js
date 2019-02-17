var crypto = require('crypto')
const colors = require('colors');

var mysqlconnection = require('../../mysql/index.js')

colors.setTheme({
    log: 'cyan',
    warn: 'yellow',
    error: 'red'
});
exports.log = function(str){
  console.log(str.log)
}
exports.error = function(str){
  console.log(str.error)
}
exports.warn = function(str){
  console.log(str.warn)
}

exports.md5 = function(str) {
  let md5 = crypto.createHash('md5')
  let newPas = md5.update(str).digest('hex')
  return newPas
}

exports.getPower = function(req, res) {
  return new Promise((resolve, reject) => {
    let connection = mysqlconnection.connection
    let selectSql =
      "SELECT * FROM user_admin WHERE user_name='" +
      req.signedCookies._ivv_token +
      "'"
    connection.query(selectSql, function(err, result) {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message)
        reject(err)
        res.send({ code: 999, data: [], msg: err.message })
        return
      }
      if (result[0].is_super == 1) {
        resolve()
      } else {
        reject()
        res.send({ code: 999, data: [], msg: '无权限操作' })
      }
    })
  })
}

exports.success = function(res, obj = {}) {
  let { code = 0, data = [], msg = '成功' } = obj
  res.send({ code, data, msg })
  return
}

exports.fail = function(res, obj = {}) {
  let { code = 999, data = [], msg = '失败' } = obj
  res.send({ code, data, msg })
  return
}

// 查询
exports.sql_select = function(selectSql, res) {
  let connection = mysqlconnection.connection
  return new Promise((resolve, reject) => {
    connection.query(selectSql, function(err, result) {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message)
        reject(err)
        res.send({ code: 999, data: [], msg: err.message })
        return
      }
      resolve(result)
    })
  })
}
// 更新
exports.sql_update = function(selectSql, userModSql_Params, res) {
  let connection = mysqlconnection.connection
  return new Promise((resolve, reject) => {
    connection.query(selectSql, userModSql_Params, function(err, result) {
      if (err) {
        console.log('[UPDATE ERROR] - ', err.message)
        reject(err)
        res.send({ code: 999, data: [], msg: err.message })
        return
      }
      resolve(result)
    })
  })
}

exports.formatTime = function(dateObj, fmt) {
    if (/(Y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (dateObj.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    }
    let o = {
      'M+': dateObj.getMonth() + 1 + '',
      'D+': dateObj.getDate() + '',
      'H+': dateObj.getHours() + '',
      'm+': dateObj.getMinutes() + '',
      's+': dateObj.getSeconds() + ''
    }
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? o[k] : addZero(o[k])
        )
      }
    }
    function addZero(str) {
      return ('00' + str).substr(str.length)
    }
    return fmt
  }