const mysql = require('mysql2')
const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    database:'node',
    password:'sada123@'
})

module.exports=pool.promise();