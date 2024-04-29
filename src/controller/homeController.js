// Get the client
import mysql from "mysql2";

// Create the connection to database

const connection = mysql.createConnection({
  host: "localhost",
  port: 3309,
  user: "root",
  database: "jwt",
});

const handleHello = (req, res) => {
  const name = "Dieu";
  return res.render("home.ejs", { name });
};

const handleUser = (req, res) => {
  //modle - get data from database
  return res.render("user.ejs"); //trả ra tên file ejs thì Express tự động biết tìm trong /src/view nhờ cấu hình app.set("views", "./src/views"); ở hàm configViewEngine
};

const handleCreate = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.username;

  connection.query(
    " INSERT INTO users (email, password, username) VALUES (?, ?, ?)",
    [email, password, username],
    function (err, results, fields) {
      if (err) {
        console.log("loi:", err);
      }
      console.log("ket qua:", results);
      console.log("truong: ", fields);
    }
  );
  return res.send("Page Create");

  fun;
};

module.exports = {
  handleHello,
  handleUser,
  handleCreate,
};
