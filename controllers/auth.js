const mysql = require("mysql");
const jwt =require ("jsonwebtoken");
const bcrypt = require ("bcryptjs");


const db=mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user:  process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD ,
    database: process.env.DATABASE
})

exports.register=(req,res)=>{
    console.log(req.body);

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    db.query('SELECT email FROM teachers WHERE email = ?',[email],async(error,results)=>{
        if(error)
        {
            console.log(error);
        }
        if(results.length>0){
            return res.render('admin',{
                message: " Email already in Use"
            })
           }

        let hashedpassword = await bcrypt.hash(Password,8);
        console.log(hashedpassword);




        });
    
}