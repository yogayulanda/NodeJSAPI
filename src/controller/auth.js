const jwt = require("jsonwebtoken")

const userModel = require("../models/user")
const key = process.env.JWT_KEY

exports.login = (req,res)=> {
    const {username, password} = req.body
    try {

        userModel.getUsers(username, password, (error, data) => {
            try {
                if(error) return res.status(500).send({error})

                if(data.lenght) {
                    const dataUser = {
                        username,
                        role:data[0].role
                    }

                    const token = jwt.sign(dataUser, key, { expiresIn: '1h'})
                    return res.status(200).send({
                        message:"UserFound!!",
                        role: data[0].role,
                        data: {token}
                    })
                }

                return res.status(401).send({ error : " invalid username or password!!"})
            } catch(error){
                console.log("Erorr: controllerLogin.usermode.catch =");
                return res.status(500).send({ error: "interna; server error"})
            }
        })
            } catch(error){
                console.log("Erorr: controllerLogin.catch -");
                return res.status(500).send({ error: "interna; server error"})
            }
    
            // succses login
        }