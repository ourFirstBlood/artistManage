var mysqlconnection = require('../../mysql/index.js')
var { md5 } = require('../utils/util.js')
mysqlconnection.handleDisconnection()

const add_user = (req, res) => {
  var connection = mysqlconnection.connection
  var selectSql =
    "SELECT * FROM user_admin WHERE user_name='" + req.body.user_name + "'"
  connection.query(selectSql, function(err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message)
      res.send({ code: 999, data: [], msg: err.message })
      return
    }
    if (!result.length) {
      var sql =
        'INSERT INTO user_admin(Id,user_name,password,is_super) VALUES(0,?,?,?)'
      //查
      let { user_name, password, is_super } = req.body
      connection.query(sql, [user_name, md5(password), is_super], function(
        error,
        response
      ) {
        if (error) {
          console.log('[INSERT ERROR] - ', error.message)
          res.send({ code: 999, data: [], msg: error.message })
          return
        }
        res.send({
          code: 0,
          data: [],
          msg: '新增管理员成功'
        })
      })
    } else {
      res.send({
        code: 999,
        data: [],
        msg: '该账号已存在'
      })
    }
  })
}

module.exports = { add_user }
