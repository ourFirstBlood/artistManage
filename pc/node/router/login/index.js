const express = require('express')
const router = express.Router()
const { add_user } = require('./register.js')
const { login } = require('./login.js')

router.post('/add_user',add_user)
router.post('/',login)


module.exports = router