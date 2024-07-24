import bcrypt from "bcryptjs";
import bluebird from "bluebird";
// Get the client
import mysql from "mysql2/promise";
import db from "../models/index";
import user from "../models/user";
import { where } from "sequelize/lib/sequelize";
import { raw } from "body-parser";

const salt = bcrypt.genSaltSync(10);
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

const createUser = async (email, password, username) => {
  let hashPass = hashUserPassword(password);
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //   port: 3309,
  //   Promise: bluebird,
  // });

  try {
    await db.User.create({
      //db[model.name] = model; (file index) Tham chiếu tới file user.js để thao tác với DB
      username: username,
      email: email,
      password: hashPass,
    });
    // const [rows, fields] = await connection.execute(
    //   "INSERT INTO user (email, password, username) VALUES (?, ?, ?)",
    //   [email, hashPass, username]
    // );
  } catch (error) {
    console.log("check Error:", error);
  }

  // connection.query(
  //   " INSERT INTO user (email, password, username) VALUES (?, ?, ?)",
  //   [email, hashPass, username],
  //   function (err, results, fields) {
  //     if (err) {
  //       console.log("Lỗi :", err);
  //     } else {
  //       console.log("Kết quả:", results);
  //       console.log("Trường : ", fields);
  //     }
  //   }
  // );
};

const getListUser = async () => {
  //test relationships

  let newUser = await db.User.findOne({
    where: { id: 2 },
    include: db.Group, // = join table query sql
    // include: { model: db.Group },
    raw: true, // trả ra 1 object JS
    nest: true, // gộp trường có liên quan vào object
  });

  console.log("check new User:  ", newUser);

  let users = [];
  users = await db.User.findAll(); //Chỉ cần gọi đến DB để lấy kết quả
  return users;
  // let user = [];
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //   port: 3309,
  //   Promise: bluebird,
  // });

  // try {
  //   const [rows, fields] = await connection.execute("select * from user");
  //   // console.log("check rows: ", rows)
  //   return rows;
  // } catch (error) {
  //   console.log("Loi:", error);
  // }
  // connection.query("select * from user", function (err, results, fields) {
  //   if (err) {
  //     console.log("Lỗi :", err);
  //   } else {
  //     console.log("Kết quả:", results);
  //   }
  // });
};

const deleteUser = async (userID) => {
  await db.User.destroy({
    where: { id: userID },
  });
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //   port: 3309,
  //   Promise: bluebird,
  // });
  // //DELETE FROM table_name WHERE condition;
  // try {
  //   const [rows, fields] = await connection.execute(
  //     "DELETE FROM user WHERE id =?",
  //     [id]
  //   );
  //   // console.log("check rows: ", rows)
  //   return rows;
  // } catch (error) {
  //   console.log("Loi:", error);
  // }
};

const getUserById = async (userID) => {
  let user = {};
  user = await db.User.findOne({
    where: { id: userID },
    // raw: true, // nếu thêm tham số này thì ngay lập tức user sẽ là Obj JS , khi k có tham số này thì user là 1 Sequelize Object => Có nhiều thông tin hơn
  });
  return user.get({ plain: true }); // convert Sequeleze model thành Object JavaScript
  console.log("check userifindone :", user, "id ne", userID);
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //   port: 3309,
  //   Promise: bluebird,
  // });

  // try {
  //   //rows là một array, view chỉ làm việc với object thuần túy nên ta sẽ lấy phần tử đầu tiên trong array của rows
  //   const [rows, fields] = await connection.execute(
  //     "select * from user where id = ?",
  //     [id]
  //   );
  //   console.log("check row ", rows);
  //   return rows;
  // } catch (error) {
  //   console.log(error);
  // }
};

const updateUserInfo = async (email, username, id) => {
  await db.User.update(
    { email: email, username: username }, // các trường muốn update
    {
      where: { id: id }, // điều kiện update
    }
  );
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //   port: 3309,
  //   Promise: bluebird,
  // });

  // try {
  //   const [rows, fields] = await connection.execute(
  //     "UPDATE user SET email = ?, username = ? WHERE id = ?",
  //     [email, username, id]
  //   );
  //   return rows;
  // } catch (error) {
  //   console.log(error);
  // }
};

module.exports = {
  createUser,
  getListUser,
  deleteUser,
  getUserById,
  updateUserInfo,
};
