const express = require('express')
const router = express.Router()
const { add_user, get_users } = require('./register.js')
const { login, logout } = require('./login.js')

router.post('/add_user', add_user)
router.post('/get_users', get_users)
router.post('/', login)
router.post('/logout', logout)

module.exports = router
