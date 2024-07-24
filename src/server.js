import express from "express"; //khai báo biến express từ thư viện Express để gọi thư viện và khởi tạo đối tượng Express trong ứng dụng của mình. ( import module Express vào file hiện tại và gán nó cho biến express.)
// tách ra xử lí rồi import vào
import configViewEngine from "./config/viewEngine."; //bản chất của nhóm code chỉ thực hiện 1 chức năng nên ta tách file ra
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
require("dotenv").config(); //khai báo thư viện dotenv
import bodyParser from "body-parser";
// import connection from "./config/connectDB";

//file server.js là entry point
//Chúng ta cần khai báo express. khi chạy npm start,nó sẽ khởi tạo express (khung website)
const app = express(); //định nghĩa đối tượng/server tên là app = hàm express()
const PORT = process.env.PORT || 8083;
import corsMethod from "./config/cors";

//config CORS
corsMethod(app);

//config new engine
configViewEngine(app);

//config thư viện body-parser. Đây là 1 Middleware (data chuyển sang dạng JSON ,lấy được param , body,query > Giản lược hóa)
// package  bodyParser này khi ta gửi HTTP body lên sẽ tự động convert sang kiểu Object
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//test connection DB
// connection();

//init web routes (khai báo url để user truy cập)
initWebRoutes(app);
initApiRoutes(app);

//run server trên port đã khởi tạo trước đấy
//nạp các thông tin khai báo ở trên rồi chạy (ví dụ như nạp routes)
app.listen(PORT, () => {
  console.log(
    ">>Callback function này sẽ được chạy sau khi app chúng ta chạy thành công . port = " +
      PORT
  );
});
