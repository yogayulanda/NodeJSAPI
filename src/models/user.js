const conn = require("../config/database")

// Query Login
const getUser = (username = null, password = null, cb= ()  => { })=> {
    try {
        conn.query("select role from user where username=`?` and password=`?` limit 1",
        [username, password],
        function (error, results, fields) {
            if(error) {
                console.log("ERROR: getUser.if -" + error);
                return cb("internal Server Error!!", null)
            } 
            return cb(null, results)
        });
    } catch (err) {
        console.log("error: getUser.catch -" + err);
        return cb("internal server eror", null)
        }
    }

    module.exports = { getUser }
