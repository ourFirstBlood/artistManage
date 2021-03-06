const express = require('express')
const router = express.Router()
const importExcel = require('./import.js')
const getList = require('./getList.js')
const add = require('./add')
const del = require('./delete')

router.post('/import', importExcel)
router.post('/get_list', getList)
router.post('/add', add)
router.post('/delete', del)

module.exports = router
