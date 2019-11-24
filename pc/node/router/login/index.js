const express = require('express')
const router = express.Router()
const {
  add_user,
  get_users,
  delete_users,
  reset_pw
} = require('./register.js')
const {
  login,
  logout
} = require('./login.js')

router.post('/add_user', add_user)
router.post('/get_users', get_users)
router.post('/delete_users', delete_users)
router.post('/reset_pw', reset_pw)
router.post('/', login)
router.post('/logout', logout)

module.exports = router