const {
  success,
  sql_select,
  getUserInfo
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
  let count = result[0]['count(*)']

  //获取类型
  var typeSql = 'SELECT type FROM notice where id=' + pid
  const typeResult = await sql_select(typeSql, res)
  const type = typeResult[0]['type']

  //获取用户信息
  let userInfo
  try {
    const userRes = await getUserInfo(req)
    userInfo = userRes[0]
  } catch (err) {
    userInfo = err
  }

  // 当不是管理员身份时只给用户看第一条
  const special = !userInfo.id && type === 1
  if (special) {
    page = 1
    page_size = 1
    count = count ? 1 : 0
  }
  //获取消息详情列表
  let sql =
    `SELECT * FROM wage where pid = ${pid} and name like '%${name.replace("'","''")}%' order by income desc limit ${(page - 1) * page_size},${page_size}`
  //当是直播种类并输入姓名时,只有输入全部匹配名字才能查询
  if (special && name) {
    sql = `SELECT * FROM wage where pid = ${pid} and name = '${name.replace("'","''")}'`
  }
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