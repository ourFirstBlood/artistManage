const express = require('express')
const router = express.Router()
const {
  add_artists,
  detail,
  detele_artists,
  get_artistsList
} = require('./artist.js')
router.post('/add_artists', add_artists)
router.post('/detele_artists', detele_artists)
router.post('/detail', detail)
router.post('/get_artistsList', get_artistsList)

module.exports = router
