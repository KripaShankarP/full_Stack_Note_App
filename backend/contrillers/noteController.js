const usermodel = require('../models/userModel')
const postmodel = require('../models/noteModel')

exports.getNotes = async (req, res) => {
  let user = await usermodel.findOne({ email: req.user.email }).populate('posts')
  res.json({ user })
}

exports.createNote = async (req, res) => {
  let user = await usermodel.findOne({ email: req.user.email })

  let note = await postmodel.create({
    user: user._id,
    content: req.body.content
  })

  user.posts.push(note._id)
  await user.save()

  res.json({ note })
}

exports.updateNote = async (req, res) => {
  let note = await postmodel.findByIdAndUpdate(
    req.params.id,
    { content: req.body.content },
    { new: true }
  )

  res.json({ note })
}

exports.deleteNote = async (req, res) => {
  await postmodel.findByIdAndDelete(req.params.id)
  res.json({ message: "Deleted" })
}