const express = require("express")
const jwt = require("jsonwebtoken")
const { user } = require(".")
require("dotenv").config()
const users = require("../models/user")

const router = express.Router()
const key = process.env.JWT_KEY

// Login Admin
router.post("/login", (req, res) => {
    const { username, password } = req.body
    users.filter(user=> username === user.username && password === user.password).map(user=>{
        const dataUser = {
            username: user.username,
            Role: user.roleType
            }
            const token = jwt.sign(dataUser, key, { expiresIn: '1h' })

        return response(res, 200, `Login Berhasil! Hallo ` + user.nama , [{ dataUser,token }])
        }
    )
    return response(res, 401, "Username atau Password Salah!!")
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