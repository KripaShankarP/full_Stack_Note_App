const express = require('express')
const router = express.Router()

const {
  getNotes,
  createNote,
  updateNote,
  deleteNote
} = require('../contrillers/noteController')

const isLoggedIn = require('../middleware/authmiddleware')

router.get('/', isLoggedIn, getNotes)
router.post('/', isLoggedIn, createNote)
router.put('/:id', isLoggedIn, updateNote)
router.delete('/:id', isLoggedIn, deleteNote)


module.exports = router