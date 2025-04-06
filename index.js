const express = require("express");
// const uuid =require("uuid");
const mysql = require('mysql2');
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "/views"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    database : 'delta_app2',
    password : 'MERNstack@2025'
});

app.listen(port , ()=>{
    console .log(`listening to port : ${port}`);
});


//home route
app.get("/" , (req , res) => {
    let q = "select count(*) from user";
    try{
        connection.query(q, (err, result) =>{
            if(err) throw err;
            let count = result[0]["count(*)"];
            console.log(count);
            res.render("home.ejs" , {count});
        });
    }catch (err){
        console.log("there is some error in the daetbase");
        res.send("error on database");
    }
});

//show USERS route
app.get("/users" , (req , res) => {
    let q = "select * from user";
    try{
        connection.query(q, (err, users) =>{
            if(err) throw err;
            res.render("showusers.ejs",{users});
        });
    }catch (err){
        console.log("there is some error in the daetbase");
        res.send("error on database");
    }
});

//EDIT route
app.get("/users/:id/edit" , (req,res) =>{
    let {id} = req.params;
    let q = `select * from user where id = '${id}'`;
    try{
        connection.query(q , (err , result)=>{
            if(err){
                throw err;
            }
            let user = result[0];
            res.render("edit.ejs" , {user});
        });
    }catch(err){
        console.log("there is some error in Database");
    }
});

//update route
app.patch("/user/:id" , (req , res) => {
    let {id} = req.params;
    let {password : formpassword , username : formusername} = req.body
    let  q = `select * from user where id ='${id}'`;
    try{
        connection.query(q , (err , result) =>{
            if(err){
                throw err;
            }
            let user = result[0];
            if(user.password == formpassword){
                let q2 = `UPDATE user SET username = '${formusername}' WHERE password = '${user.password}'`;
                connection.query(q2 , (err , result)=>{
                    if(err) throw error;
                    res.redirect("/users");
                });
            }
            else{
                res.send("wrong password");
            }
        });
    }catch(err){
        res.send("there is some error in the database");
    }
});


  
// const { faker } = require('@faker-js/faker');
// this the things required for faker.js
// let  getrandomuser = () => {
//     return [
//       faker.string.uuid(),
//       faker.internet.username(), // before version 9.1.0, use userName()
//       faker.internet.email(),
//       faker.internet.password(),
//     ];
//   };

// let q = "insert into user(id , username, email, password) values ?";
// let data = [ ];

// for (let i=1 ; i<=100 ; i++){
//     data.push(getrandomuser());
// }


// try{
//     connection.query(q , [data] , (err , result) =>{
//         if(err) throw err;
//         console.log(result);
//     });
// }catch(err){
//     console.log("error");
// }

// connection.end();

