var Ut = require('../utils/util.js')

module.exports = {
  login: function(req, res) {
    var selectSql =
      "SELECT * FROM user_admin WHERE user_name='" + req.body.user_name + "'"
    Ut.sql_select(selectSql, res).then(result => {
      if (!result.length) {
        Ut.fail(res, { msg: '该账号不存在' })
      } else {
        if (Ut.md5(req.body.password) == result[0].password) {
          res.cookie('_ivv_token', req.body.user_name, {
            maxAge: 1000 * 60 * 30,
            signed: true
          })
          Ut.success(res, { msg: '登陆成功' })
        } else {
          Ut.fail(res, { msg: '密码错误' })
        }
      }
    })
  },
  logout: function(req, res) {
    res.cookie('_ivv_token', req.body.user_name, {
      maxAge: 0,
      signed: true
    })
    Ut.success(res, { msg: '登出成功' })
  }
}
