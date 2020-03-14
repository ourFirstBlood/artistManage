const {
  success,
  sql_select
} = require('../utils/util.js')

module.exports = (req, res) => {
  let {
    name = '',
    page = 0,
    page_size = 0,
    start_date,
    end_date
  } = req.body
  var countSql = 'SELECT count(*) FROM notice'
  sql_select(countSql, res).then(result => {
    let count = result[0]['count(*)']
    let sql
    let pageLimit
    if (page == 0 && page_size == 0) {
      pageLimit = ''
    } else {
      pageLimit = `limit ${(page - 1) * page_size},${page_size}`
    }
    if (start_date && end_date) {
      sql =
        `SELECT * FROM notice where name like "%${name}%" and time between '${start_date}' and '${end_date}' order by time desc ${pageLimit}`
    } else {
      sql =
      `SELECT * FROM notice where name like '%${name}%' order by time desc ${pageLimit}`
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