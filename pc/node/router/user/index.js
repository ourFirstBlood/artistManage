const express = require('express')
const router = express.Router()
var {
  md5,
  sql_select,
  success,
  sql_update
} = require('../utils/util.js')

router.post('/edit_password', (req, res) => {
  const userName = req.signedCookies._ivv_token
  var selectSql =
    'UPDATE user_admin SET password = ? WHERE user_name ="' + userName + '"'
  sql_update(selectSql, [md5(req.body.password)], res).then(() => {
    res.cookie('_ivv_token', userName, {
      maxAge: 0,
      signed: true
    })
    success(res)
  })
})

router.post('/get_user_info', (req, res) => {
  var selectSql =
    "SELECT * FROM user_admin WHERE user_name='" +
    req.signedCookies._ivv_token +
    "'"
  sql_select(selectSql, res).then(result => {
    delete result[0]['password']
    const data = result[0]
    success(res, {
      data
    })
  })
})

module.exports = router