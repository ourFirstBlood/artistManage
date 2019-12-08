const {
  success,
  sql_select
} = require('../utils/util.js')

module.exports = (req, res) => {
  let id = ''
  let ids = []
  try {
    id = JSON.parse(req.body.id)
  } catch (e) {
    res.send({ code: 999, data: [], msg: '数据格式错误' })
    return
  }
  if (id instanceof Array) {
    ids = id
  } else {
    ids = [id]
  }
  let sqlArr = '(' + ids.join(',') + ')'
  var sql = 'DELETE FROM notice WHERE id IN ' + sqlArr
  sql_select(sql, res).then(() => {
    success(res)
  })
}