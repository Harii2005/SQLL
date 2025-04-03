const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    database : 'delta_app2',
    password : 'MERNstack@2025'
});

data =[id , username , email , password];

for(let i=0 ; i<=100 ; i++){

}

let q = "insert into user(id, username, email, password) values ?";
let users = [
    ["1234" , "abcd" , "abcd@gmail.com" , "abcd"],
    ["4321" , "dcba" , "dcba@gmail.com" , "dcba"]
];

try{
    connection.query(q , [users] , (err , result) =>{
        if(err) throw err;
        console.log(result);
    });
}catch(err){
    console.log("error");
}

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

let  getrandomuser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(), // before version 9.1.0, use userName()
    faker.internet.email(),
    faker.internet.password(),
  ];
};

