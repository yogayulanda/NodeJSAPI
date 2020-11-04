const express = require("express")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const users = require("../models/user")

const router = express.Router()
const key = process.env.JWT_KEY

// Login Admin
router.post("/login", (req, res) => {
    const { username, password,type } = req.body
    users.filter(users=> username === users.username && password === users.password).map(users=>{
        const dataUser = {
            username: users.username,
            type: users.type
            }
            const token = jwt.sign(dataUser, key, { expiresIn: '1h' })

        return response(res, 200, "Login Success!", [{ dataUser,token }])
        }
    )
    return response(res, 401, "User does not exist!!", [])
})

// Register
router.post('/daftar', (req, res) => {
    users.push(req.body);
    res.send('User Berhasil Ditambahkan');
})


const response = (res, code, message, data) => {
    res.send({
        code,
        message,
        data
    })
}

module.exports = router