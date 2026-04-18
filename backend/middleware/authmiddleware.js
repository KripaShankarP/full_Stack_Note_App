const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  if (!req.cookies.token) {
    return res.status(401).json({ message: "Please login first" })
  }

  try {
    let data = jwt.verify(req.cookies.token, 'kripa')
    req.user = data
    next()
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" })
  }
}