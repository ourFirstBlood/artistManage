const {
  success,
  sql_select
} = require('../utils/util.js')

module.exports = (req, res) => {
  let {
    pid,
    name = '',
    page,
    page_size
  } = req.body
  var countSql = 'SELECT count(*) FROM wage'
  sql_select(countSql, res).then(result => {
    let count = result[0]['count(*)']
    let sql =
      `SELECT * FROM wage where pid = ${pid} and name like '%${name}%' order by income desc limit ${(page - 1) * page_size},${page_size}`
    //查
    sql_select(sql, res).then(result => {
      success(res, {
        data: {
          count,
          list: result
        }
      })
    })
  })
}