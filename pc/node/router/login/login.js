var mysqlconnection = require('../../mysql/index.js')
var { md5 } = require('../utils/util.js')
mysqlconnection.handleDisconnection()

const login = (req, res) => {
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
      res.send({
        code: 999,
        data: [],
        msg: '该账号不存在'
      })
    } else {
      if (md5(req.body.password) == result[0].password) {
        res.cookie('_ivv_token', req.body.user_name,{maxAge:1000*60*30,signed:true});
        res.send({
          code: 0,
          data: [],
          msg: '登陆成功'
        })
      }else{
        res.send({
          code: 999,
          data: [],
          msg: '密码错误'
        })
      }
    }
  })
}

module.exports = { login }
