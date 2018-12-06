var qs = require('querystring')
var mysqlconnection = require('../../mysql/index.js')
mysqlconnection.handleDisconnection()
const edit_form = (req, res) => {
  var connection = mysqlconnection.connection
  if (!('custom' in req.body) || !('fixed' in req.body)) {
    res.send({ code: 999, data: [], msg: '参数不完整' })
    return
  }
  for (let key in req.body) {
    try {
      JSON.parse(req.body[key])
    } catch (e) {
      res.send({ code: 999, data: [], msg: key + '格式错误' })
      return
    }
  }

  var userModSql = 'UPDATE form_custom SET custom = ?,fixed = ? WHERE id = 4'
  var userModSql_Params = [
    qs.stringify(qs.parse(req.body.custom)),
    qs.stringify(qs.parse(req.body.fixed))
  ]

  connection.query(userModSql, userModSql_Params, function(err, result) {
    if (err) {
      console.log('[UPDATE ERROR] - ', err.message)
      res.send({ code: 999, data: [], msg: err.message })
      return
    }
    res.send({ code: 0, data: [], msg: '成功' })
  })
}

const get_form = (req, res) => {
  var connection = mysqlconnection.connection
  var sql = 'SELECT * FROM form_custom WHERE id = 4'
  //查
  connection.query(sql, function(err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message)
      res.send({ code: 999, data: [], msg: err.message })
      return
    }
    res.send({
      code: 0,
      data: {
        custom: (() => {
          let arrStr = ''
          for (let key in qs.parse(result[0].custom)) {
            arrStr = key
          }
          return JSON.parse(arrStr)
        })(),
        fixed: (() => {
          let arrStr = ''
          for (let key in qs.parse(result[0].fixed)) {
            arrStr = key
          }
          return JSON.parse(arrStr)
        })()
      },
      msg: '成功'
    })
  })
}

module.exports = { edit_form, get_form }
