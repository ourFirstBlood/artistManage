var mysqlconnection = require('../../mysql/index.js')
var {
  md5,
  fail,
  sql_select,
  getPower,
  success,
  sql_update
} = require('../utils/util.js')
mysqlconnection.handleDisconnection()

const add_user = (req, res) => {
  //判断格式
  let { user_name, password, is_super, name } = req.body
  if (!user_name || !password || !is_super || !name) {
    fail(res, { msg: '字段填写不全' })
    return
  }
  if (user_name.length > 11) {
    fail(res, { msg: '账号不能超过11个字符' })
    return
  }
  if ([0, 1].indexOf(Number(is_super)) === -1) {
    fail(res, { msg: 'is_super格式错误' })
    return
  }
  if (name.length > 12) {
    fail(res, { msg: '昵称不能超过12个字符' })
    return
  }

  getPower(req, res).then(() => {
    var selectSql =
      "SELECT * FROM user_admin WHERE user_name='" + req.body.user_name + "'"
    sql_select(selectSql, res).then(result => {
      if (!result.length) {
        var sql =
          'INSERT INTO user_admin(Id,user_name,password,is_super,name) VALUES(0,?,?,?,?)'
        sql_update(sql, [user_name, md5(password), is_super, name], res).then(
          () => {
            success(res, { msg: '新增管理员成功' })
          }
        )
      } else {
        fail(res, { msg: '该账号已存在' })
      }
    })
  })
}

const get_user_info = (req, res) => {
  var selectSql =
    "SELECT * FROM user_admin WHERE user_name='" +
    req.signedCookies._ivv_token +
    "'"
  sql_select(selectSql, res).then(result => {
    delete result[0]['password']
    const data = result[0]
    success(res, { data })
  })
}

const get_users = (req, res) => {
  getPower(req, res).then(() => {
    var selectSql = 'SELECT * FROM user_admin'
    sql_select(selectSql, res).then(result => {
      result.forEach(item => {
        delete item['password']
      })
      success(res, { data: result })
    })
  })
}

module.exports = { add_user, get_user_info, get_users }
