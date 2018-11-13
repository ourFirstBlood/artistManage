const express = require('express')
const router = express.Router()
const { edit_form, get_form } = require('./form.js')

router.post('/form/edit_form',edit_form)
router.post('/form/get_form',get_form)

module.exports = router