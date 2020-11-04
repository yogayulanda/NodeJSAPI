const express = require("express")
const router = express.Router()
const users = require("../models/user")

const jwtAuth = require("../middleware/jwtAuth")

// public data
router.get("/", (req, res) => {
    // login success
    res.send(users)
})

// Delete
router.get('/delete/:id', async (req, res) => {
// const user = users.find (user => user.id ==req.params.id)
    await users.splice(users.find(item => item.id == req.params.id), 1)
    return res.send({
        massage: `User Berhasil Dihapus!`,
        });
})

//Tambah User
router.post('/addUser', (req, res) => {
    users.push(req.body);
    res.send('User Berhasil Ditambahkan');
})

// // Untuk Daftar
// app.post("/register", (req, res) => {
//     console.log("req Register: ", req.body);
//     users.push(req.body);
//     res.send({
//     message: "POST Success",
//     });
// });


// // private data
// router.get("/all", jwtAuth, (dataLogin, req, res, next) => {
//     const data = users

//     if (dataLogin.role === "admin") {
//         // login success
//         res.send({
//             code: 200,
//             message: "Success",
//             data: data
//         })
//     } else {
//         res.status(401).send({
//             code: 401,
//             message: "Unauthorized!!",
//             data: []
//         })
//     }
// })

module.exports = router