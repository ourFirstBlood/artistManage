const {
  fail,
  success,
  sql_update
} = require('../utils/util.js')

module.exports = (req, res) => {
  let { id, name, type } = req.body
  if (!id || !name || !type) {
    fail(res, { msg: '参数不完整' })
    return
  }
  if (id == 0) {
    var sql = 'INSERT INTO notice(id,name,type,time) VALUES(0,?,?,?)'
    sql_update(sql, [name, type, new Date()], res).then(() => {
      success(res)
    })
  } else {
    var userModSql = 'UPDATE notice SET name = ?,type = ? WHERE id =' + id
    var userModSql_Params = [name,type]
    sql_update(userModSql, userModSql_Params, res).then(() => {
      success(res)
    })
  }
}