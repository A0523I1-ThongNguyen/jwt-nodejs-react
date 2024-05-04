import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

import bluebird from 'bluebird';
// Get the client
import mysql from "mysql2/promise";
// Create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3309,
  user: "root",
  database: "jwt",
});

const hashUserPassword = (userPassword) => {
  let proHashPass = bcrypt.hashSync(userPassword, salt);
  return proHashPass;
};

const createUser = (email, password, username) => {
  let hashPass = hashUserPassword(password);

  connection.query(
    " INSERT INTO users (email, password, username) VALUES (?, ?, ?)",
    [email, hashPass, username],
    function (err, results, fields) {
      if (err) {
        console.log("Lỗi :", err);
      } else {
        console.log("Kết quả:", results);
        console.log("Trường : ", fields);
      }
    }
  );
};

const getListUser = async() => {
  let user = [];
  const connection = await mysql.createConnection({host: 'localhost', user: 'root',database: 'jwt',port:3309 ,Promise: bluebird})

  try{
    const [rows,fields] = await connection.execute("select * from users");
    // console.log("check rows: ", rows)
    return rows;
  }catch(error){
    console.log("Loi:" ,error)
  }
  // connection.query("select * from users", function (err, results, fields) {
  //   if (err) {
  //     console.log("Lỗi :", err);
  //   } else {
  //     console.log("Kết quả:", results);
  //   }
  // });
};

module.exports = {
  createUser,
  getListUser,
};
