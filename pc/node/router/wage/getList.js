const {
  success,
  sql_select
} = require('../utils/util.js')

module.exports = async (req, res) => {
  let {
    pid,
    name = '',
    page,
    page_size
  } = req.body

  //获取总数
  var countSql = 'SELECT count(*) FROM wage where pid=' + pid
  const result = await sql_select(countSql, res)
  const count = result[0]['count(*)']

  //获取类型
  var typeSql = 'SELECT type FROM notice where id=' + pid
  const typeResult = await sql_select(typeSql, res)
  const type = typeResult[0]['type']
  //获取消息详情列表
  let sql =
    `SELECT * FROM wage where pid = ${pid} and name like '%${name}%' order by income desc limit ${(page - 1) * page_size},${page_size}`
  //查
  const response = await sql_select(sql, res)
  success(res, {
    data: {
      type,
      count,
      list: response
    }
  })
}