import express from "express"; //khai báo biến express từ thư viện Express để gọi thư viện và khởi tạo đối tượng Express trong ứng dụng của mình. ( import module Express vào file hiện tại và gán nó cho biến express.)
// tách ra xử lí rồi import vào
import configViewEngine from "./configs/viewEngine."; //bản chất của nhóm code chỉ thực hiện 1 chức năng nên ta tách file ra
import initWebRoutes from "./routes/web";
require("dotenv").config(); //khai báo thư viện dotenv
import bodyParser from "body-parser";

//file server.js là entry point
//Chúng ta cần khai báo express. khi chạy npm start,nó sẽ khởi tạo express (khung website)
const app = express(); //định nghĩa đối tượng/server tên là app = hàm express()
const PORT = process.env.PORT || 8083;

//config new engine
configViewEngine(app);

//config body-parser (data chuyển sang dạng JSON)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//init web routes (khai báo url để user truy cập)
initWebRoutes(app);

//run server trên port đã khởi tạo trước đấy
//nạp các thông tin khai báo ở trên rồi chạy (ví dụ như nạp routes)
app.listen(PORT, () => {
  console.log(
    ">>Callback function này sẽ được chạy sau khi app chúng ta chạy thành công . port = " +
      PORT
  );
});
