import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

import bluebird from "bluebird";
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

const createUser = async (email, password, username) => {
  let hashPass = hashUserPassword(password);
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    port: 3309,
    Promise: bluebird,
  });

  try {
    const [rows, fields] = await connection.execute(
      "INSERT INTO users (email, password, username) VALUES (?, ?, ?)",
      [email, hashPass, username]
    );
  } catch (error) {
    console.log("check Error:", error);
  }

  // connection.query(
  //   " INSERT INTO users (email, password, username) VALUES (?, ?, ?)",
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
  let user = [];
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    port: 3309,
    Promise: bluebird,
  });

  try {
    const [rows, fields] = await connection.execute("select * from users");
    // console.log("check rows: ", rows)
    return rows;
  } catch (error) {
    console.log("Loi:", error);
  }
  // connection.query("select * from users", function (err, results, fields) {
  //   if (err) {
  //     console.log("Lỗi :", err);
  //   } else {
  //     console.log("Kết quả:", results);
  //   }
  // });
};

const deleteUser = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    port: 3309,
    Promise: bluebird,
  });
  //DELETE FROM table_name WHERE condition;
  try {
    const [rows, fields] = await connection.execute(
      "DELETE FROM users WHERE id =?",
      [id]
    );
    // console.log("check rows: ", rows)
    return rows;
  } catch (error) {
    console.log("Loi:", error);
  }
};

const getUserById = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    port: 3309,
    Promise: bluebird,
  });

  try {
    //rows là một array, view chỉ làm việc với object thuần túy nên ta sẽ lấy phần tử đầu tiên trong array của rows
    const [rows, fields] = await connection.execute(
      "select * from users where id = ?",
      [id]
    );
    console.log("check row ", rows);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const updateUserInfo = async (email, username, id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    port: 3309,
    Promise: bluebird,
  });

  try {
    const [rows, fields] = await connection.execute(
      "UPDATE users SET email = ?, username = ? WHERE id = ?",
      [email, username, id]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser,
  getListUser,
  deleteUser,
  getUserById,
  updateUserInfo,
};
