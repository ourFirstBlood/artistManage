var qs = require('querystring')
var common = require('../utils/util.js')

const edit_form = (req, res) => {
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
  common.sql_update(userModSql, userModSql_Params, res).then(() => {
    common.success(res)
  })
}

const get_form = (req, res) => {
  common.getPower(req, res).then(() => {
    let sql = 'SELECT * FROM form_custom WHERE id = 4'
    common.sql_select(sql, res).then(result => {
      common.success(res, {
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
        }
      })
    })
  })
}
module.exports = { edit_form, get_form }
