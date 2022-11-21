//
// this was for database conection using sql queries
//
// const mysql = require('mysql2')
// const pool = mysql.createPool({
//     host:'localhost',
//     user:'root',
//     database:'node',
//     password:'sada123@'
// })

// module.exports=pool.promise();

//
// this for database connection using sequelize
//

const Sequelize = require('sequelize')


const sequelize = new Sequelize('node','root','sada123@',{
    dialect:'mysql',
    host:'localhost'
})

module.exports=sequelize;