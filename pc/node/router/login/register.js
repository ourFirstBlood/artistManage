var {
  md5,
  fail,
  sql_select,
  getPower,
  success,
  sql_update
} = require('../utils/util.js')

const initPw = '123456'

const add_user = (req, res) => {
  //判断格式
  let {
    user_name,
    password,
    is_super,
    name,
    id
  } = req.body

  if (!user_name || !is_super || !name) {
    fail(res, {
      msg: '字段填写不全'
    })
    return
  }

  if (!id || id == 0) {
    if (!password || password.length < 6) {
      fail(res, {
        msg: '密码最少为6位'
      })
      return
    }

  }


  if (user_name.length > 11) {
    fail(res, {
      msg: '账号不能超过11个字符'
    })
    return
  }
  if ([0, 1].indexOf(Number(is_super)) === -1) {
    fail(res, {
      msg: 'is_super格式错误'
    })
    return
  }
  if (name.length > 12) {
    fail(res, {
      msg: '昵称不能超过12个字符'
    })
    return
  }

  getPower(req, res).then(() => {
    // 如果是编辑
    if (id && id != 0) {

      var selectSql =
        "SELECT * FROM user_admin WHERE id='" + id + "'"
      sql_select(selectSql, res).then(result => {
        if (result.length) {
          var sql =
            'UPDATE user_admin SET user_name = ?,is_super = ?,name = ? WHERE id = ' + id
          sql_update(sql, [user_name, is_super, name], res).then(
            () => {
              success(res, {
                msg: '修改成功'
              })
            }
          )
        } else {
          fail(res, {
            msg: '该账号不存在'
          })
        }
      })
      return
    }
    // 否则是新增
    var selectSql =
      "SELECT * FROM user_admin WHERE user_name='" + req.body.user_name + "'"
    sql_select(selectSql, res).then(result => {
      if (!result.length) {
        var sql =
          'INSERT INTO user_admin(Id,user_name,password,is_super,name) VALUES(0,?,?,?,?)'
        sql_update(sql, [user_name, md5(password), is_super, name], res).then(
          () => {
            success(res, {
              msg: '新增管理员成功'
            })
          }
        )
      } else {
        fail(res, {
          msg: '该账号已存在'
        })
      }
    })
  })
}



const get_users = (req, res) => {
  getPower(req, res).then(() => {
    var selectSql = 'SELECT * FROM user_admin'
    sql_select(selectSql, res).then(result => {
      result.forEach(item => {
        delete item['password']
      })
      success(res, {
        data: result
      })
    })
  })
}

const delete_users = async (req, res) => {
  //判断格式
  let {
    id
  } = req.body

  await getPower(req, res)

  var sql =
    'DELETE FROM user_admin WHERE id =' + id
  sql_select(sql, res).then(() => {
    success(res)
  })
}

const reset_pw = async (req, res) => {
  let {
    id
  } = req.body

  await getPower(req, res)
  var selectSql =
    "SELECT * FROM user_admin WHERE id='" + id + "'"
  sql_select(selectSql, res).then(result => {
    if (result.length) {
      var sql =
        'UPDATE user_admin SET password = ? WHERE id = ' + id
      sql_update(sql, [md5(initPw)], res).then(
        () => {
          success(res, {
            msg: '重置成功'
          })
        }
      )
    } else {
      fail(res, {
        msg: '该账号不存在'
      })
    }
  })
  return
}

module.exports = {
  add_user,
  get_users,
  delete_users,
  reset_pw
}