import express from "express";

/**
 * hàm configViewEngine thiết lập cơ chế xem là EJS, cho phép sử dụng tệp tĩnh từ thư mục ./src/public và
 * tìm kiếm các tệp mẫu trong thư mục ./src/views.
 * @param {*} app - express app
 */
const configViewEngine = (app) => {
  app.use(express.static("./src/public")); //app sẽ cho phép truy cập file image , css, Js ở /src/public
  app.set("view engine", "ejs"); // định nghĩa view Engine. sử dụng công nghệ EJS để viết code HTML đối với Nodejs
  app.set("views", "./src/views"); //Định nghĩa nơi lưu trữ file view Engine. File view Engine sẽ lưu trữ bên trong src/views
};

export default configViewEngine; //export tham chiếu configViewEngine
