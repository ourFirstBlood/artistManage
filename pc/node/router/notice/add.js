const {
  fail,
  success,
  sql_update
} = require('../utils/util.js')

module.exports = (req, res) => {
  let { id, name } = req.body
  if (!id || !name) {
    fail(res, { msg: '参数不完整' })
    return
  }
  if (id == 0) {
    var sql = 'INSERT INTO notice(id,name,time) VALUES(0,?,?)'
    sql_update(sql, [name,new Date()], res).then(() => {
      success(res)
    })
  } else {
    var userModSql = 'UPDATE notice SET name = ? WHERE id =' + id
    var userModSql_Params = [name]
    sql_update(userModSql, userModSql_Params, res).then(() => {
      success(res)
    })
  }
}