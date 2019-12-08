const express = require('express')
const router = express.Router()
const add = require('./add.js')
const del = require('./delete.js')
const getList = require('./getList.js')

router.post('/add', add)
router.post('/delete', del)
router.post('/get_list', getList)

module.exports = router
