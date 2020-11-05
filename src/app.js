const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const users = require("./routes/user")
const auth = require("./routes/auth")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Untuk error CORS
app.use(cors());

// Mengambil Data User
// app.get("/user", (req, res) => {
//     res.send(users);
// });

app.use("/auth", auth)
app.use("/users", users)


// error handler
app.use((req, res, next) => {
    const error = new Error("Error occured!!")
    next(error)
})
app.use((error, req, res, next) => {
    res.status(500).json({
        code: 500,
        message: error.message
    })
})

// // Untuk Login
// app.post("/login", (req, res) => {
// console.log("req Login: ", req.query);
//     res.send({
//     message: "Hello /!!",
//     });
// });

// // Untuk Daftar
// app.post("/register", (req, res) => {
//     console.log("req Register: ", req.body);
//     users.push(req.body);
//     res.send({
//     message: "POST Success",
//     });
// });

// // Untuk Hapus
// app.delete("/user/delete/:username", (req, res) => {
//     const { username } = req.params;
//     let user = users.filter((data) => {
//     if (data.username !== username) {
//         return true;
//     }
//         return false;
//     });
//     res.send({
//     massage: `Deleted User : ${req.params.username}!`,
//     });
// });

module.exports = app;

/**
 * Latihan:
 *  - Login
 *  - Register/Tambah User
 *  - User List
 *  - Edit User
 *  - Delete User
 */
