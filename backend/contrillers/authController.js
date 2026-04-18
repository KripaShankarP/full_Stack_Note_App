const usermodel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
  try {
    let { username, age, email, password } = req.body

    let user = await usermodel.findOne({ email })
    if (user) {
      return res.status(409).json({ message: "User exists" })
    }

    let hash = await bcrypt.hash(password, 10)

    let newUser = await usermodel.create({
      username,
      age,
      email,
      password: hash
    })

    res.status(201).json({ user: newUser })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.login = async (req, res) => {
  let { email, password } = req.body

  let user = await usermodel.findOne({ email })
  if (!user) return res.json({ message: "User not found" })

  let match = await bcrypt.compare(password, user.password)
  if (!match) return res.json({ message: "Wrong password" })

  let token = jwt.sign({ email, userid: user._id }, "kripa")

  res.cookie("token", token)
  res.json({ user })
}

exports.logout = (req, res) => {
  res.clearCookie("token")
  res.json({ message: "Logged out" })
}