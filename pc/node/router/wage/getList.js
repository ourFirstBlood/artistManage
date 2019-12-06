const {
  success,
  sql_select
} = require('../utils/util.js')

module.exports = (req, res) => {
  let {
    name = '',
    page,
    page_size,
    start_date,
    end_date
  } = req.body
  var countSql = 'SELECT count(*) FROM wage'
  sql_select(countSql, res).then(result => {
    let count = result[0]['count(*)']
    let sql
    if (start_date && end_date) {
      sql =
        `SELECT * FROM wage where name like '%${name}%' and date between '${start_date}' and '${end_date}' order by income and date desc limit ${(page - 1) * page_size},${page_size}`
    } else {
      sql =
      `SELECT * FROM wage where name like '%${name}%' order by income and date desc limit ${(page - 1) * page_size},${page_size}`
    }
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