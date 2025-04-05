const express = require("express");
// const uuid =require("uuid");
const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const app = express();
const port = 8080;

app.listen(port , ()=>{
    console .log(`listening to port : ${port}`);
});

app.get("/" , (req , res) => {
    res.send("server is working");
});

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    database : 'delta_app2',
    password : 'MERNstack@2025'
});
let  getrandomuser = () => {
    return [
      faker.string.uuid(),
      faker.internet.username(), // before version 9.1.0, use userName()
      faker.internet.email(),
      faker.internet.password(),
    ];
  };
  
let q = "insert into user(id , username, email, password) values ?";
let data = [ ];

for (let i=1 ; i<=100 ; i++){
    data.push(getrandomuser());
}


// try{
//     connection.query(q , [data] , (err , result) =>{
//         if(err) throw err;
//         console.log(result);
//     });
// }catch(err){
//     console.log("error");
// }

// connection.end();

// try{
//     connection.query("SHOW tables ", (err , result) => {
//         if(err){
//             throw err;
//         }
//         console.log(result);
//     });
// }catch(err){
//     console.log(err);
// }





