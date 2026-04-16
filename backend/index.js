const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const connectDb = require("./config/db")
const usermodel = require('./models/userModel')
const postmodel = require('./models/noteModel')

connectDb()

app.use(express.json())
app.use(cookieParser())
const allowedOrigin =[
    "http://localhost:5173","https://full-stack-note-app-2.onrender.com"
]
app.use(cors({
    origin: "*",
    credentials: true
}))

// ================= REGISTER =================
app.post('/api/register', async (req, res) => {
  try {
    let { username, age, email, password } = req.body;

    let user = await usermodel.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "User exists" });
    }

    let hash = await bcrypt.hash(password, 10);

    let newUser = await usermodel.create({
      username,
      age,
      email,
      password: hash
    });

    let token = jwt.sign(
      { email, userid: newUser._id },
      "kripa"
    );

    res.status(201).json({ user: newUser });

  } catch (error) {
    console.log("REGISTER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

// ================= LOGIN =================
app.post('/api/login', async (req, res) => {
    let { email, password } = req.body

    let user = await usermodel.findOne({ email })
    if (!user) return res.json({ message: "User not found" })

    let match = await bcrypt.compare(password, user.password)

    if (!match) return res.json({ message: "Wrong password" })

    let token = jwt.sign({ email, userid: user._id }, "kripa")
    res.cookie("token", token)

    res.json({ user })
})

// ================= GET NOTES =================
app.get('/api/notes', isLoggedIn, async (req, res) => {
    let user = await usermodel.findOne({ email: req.user.email }).populate('posts')
    res.json({ user })
})

// ================= CREATE =================
app.post('/api/notes', isLoggedIn, async (req, res) => {
    let user = await usermodel.findOne({ email: req.user.email })

    let note = await postmodel.create({
        user: user._id,
        content: req.body.content
    })

    user.posts.push(note._id)
    await user.save()

    res.json({ note })
})

// ================= UPDATE =================
app.put('/api/notes/:id', isLoggedIn, async (req, res) => {
    let note = await postmodel.findByIdAndUpdate(
        req.params.id,
        { content: req.body.content },
        { new: true }
    )

    res.json({ note })
})

// ================= DELETE =================
app.delete('/api/notes/:id', isLoggedIn, async (req, res) => {
    await postmodel.findByIdAndDelete(req.params.id)
    res.json({ message: "Deleted" })
})

// ================= LOGOUT =================
app.get('/api/logout', (req, res) => {
    res.clearCookie("token")
    res.json({ message: "Logged out" })
})

function isLoggedIn(req, res, next) {
    if (!req.cookies.token) {
        return res.status(401).json({ message: "Please login first" });
    }

    try {
        let data = jwt.verify(req.cookies.token, 'kripa');
        req.user = data;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

app.listen(3000, () => console.log("Server running"))