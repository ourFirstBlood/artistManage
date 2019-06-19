const express = require('express')
const router = express.Router()
var {
  fail,
  sql_select,
  success,
  sql_update
} = require('../utils/util.js')

router.post('/get_user_info', (req,res)=>{
  var selectSql =
    "SELECT * FROM user_admin WHERE user_name='" +
    req.signedCookies._ivv_token +
    "'"
  sql_select(selectSql, res).then(result => {
    delete result[0]['password']
    const data = result[0]
    success(res, { data })
  })
})