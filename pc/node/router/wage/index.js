const express = require('express')
const router = express.Router()
const importExcel = require('./import.js')
const getList = require('./getList.js')

router.post('/import', importExcel)
router.post('/get_list', getList)

module.exports = router
