import express from "express";

import configViewEngine from "./configs/viewEngine.";
import initWebRoutes from "./routes/web";

require("dotenv").config();//khai báo thư viện dotenv

//file server.js là entry point
//Chúng ta cần khai báo express. khi chạy npm start,nó sẽ khởi tạo express (khung website)
const app = express(); //định nghĩa đối tượng/server tên là app = hàm express()
const PORT = process.env.PORT || 8083;

//config new engine
configViewEngine(app);

//init web routes (khai báo url để user truy cập)
initWebRoutes(app);



app.listen(PORT, ()=>{
    console.log(">>Callback function này sẽ được chạy sau khi app chúng ta chạy thành công . port = " +PORT);
})