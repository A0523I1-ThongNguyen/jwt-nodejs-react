"use strict";
require("dotenv").config();
const fs = require("fs"); //file stream
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development"; // run at môi trường development
const config = require(__dirname + "/../config/config.json")[env]; // chay vao file config.json + development (dữ liệu của development trong file config.json)
const db = {}; //biến db đại diện cho một đối tượng quản lý các model và cung cấp các phương thức để thao tác với cơ sở dữ liệu thông qua ORM của Sequelize.

//1.kết nối tới DB :Các dòng này tạo ra đối tượng sequelize kết nối với cơ sở dữ liệu dựa trên các cấu hình trong config.json.
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

//2.Quản lý các Model:Các dòng này tự động tải tất cả các model được định nghĩa trong thư mục và lưu trữ chúng vào đối tượng db.
//nạp tất cả Model đã khai báo , gọi model thông qua biến db , thông qua biến db để thao tác với model của sequelize
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

//3.Quản lý liên kết giữa các Model :Các dòng này gọi phương thức associate của mỗi model, cho phép định nghĩa các mối liên kết giữa các model.
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

/**Tóm lại:

Quản lý các Model: Các dòng sử dụng fs.readdirSync và forEach để tải và lưu trữ các model vào db.
Kết nối cơ sở dữ liệu: Các dòng sử dụng new Sequelize để tạo đối tượng sequelize kết nối với cơ sở dữ liệu.
Quản lý liên kết giữa các Model: Các dòng sử dụng Object.keys và gọi associate trên mỗi model để định nghĩa các mối liên kết. */
