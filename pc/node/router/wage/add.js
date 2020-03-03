const {
  fail,
  success,
  sql_update
} = require('../utils/util.js')

module.exports = (req, res) => {
  let { pid, id, name, income,real_income, company_ope } = req.body
  if (!id || !name || !income ||!real_income || !company_ope) {
    fail(res, { msg: '参数不完整' })
    return
  }
  if (id == 0) {
    if (!pid) {
      fail(res, { msg: 'pid参数不能为空' })
      return
    }
    var sql = 'INSERT INTO wage(id,pid,name,income,real_income,company_ope) VALUES(0,?,?,?,?,?)'
    sql_update(sql, [pid,name,income,real_income, company_ope], res).then(() => {
      success(res)
    })
  } else {
    var userModSql = 'UPDATE wage SET name = ?,income = ?,real_income = ?,company_ope = ? WHERE id =' + id
    sql_update(userModSql, [name,income,real_income, company_ope], res).then(() => {
      success(res)
    })
  }
}