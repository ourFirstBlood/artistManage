const {
  fail,
  success,
  sql_update
} = require('../utils/util.js')

module.exports = (req, res) => {
  let {
    pid,
    id,
    name,
    income,
    others = ''
  } = req.body
  if (!id || !name || !income) {
    fail(res, {
      msg: '参数不完整'
    })
    return
  }
  if (id == 0) {
    if (!pid) {
      fail(res, {
        msg: 'pid参数不能为空'
      })
      return
    }
    var sql = 'INSERT INTO wage(id,pid,name,income,others) VALUES(0,?,?,?,?)'
    sql_update(sql, [pid, name, income, others], res).then(() => {
      success(res)
    })
  } else {
    var userModSql = 'UPDATE wage SET name = ?,income = ?,others = ? WHERE id =' + id
    sql_update(userModSql, [name, income, others], res).then(() => {
      success(res)
    })
  }
}