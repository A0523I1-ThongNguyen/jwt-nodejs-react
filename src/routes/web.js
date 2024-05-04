import express from "express";
import homeController from "../controller/homeController"; //import tới file homeController

const router = express.Router();

/**
 *
 * @param {*} app - express app
 */

//server/express sẽ biết website có bao nhiêu router + cần làm gì khi vào 1 link user yêu cầu
const initWebRoutes = (app) => {
  //path , handle
  router.get("/", homeController.handleHello); //tuyến đường Định ghĩa bằng router.get
  router.get("/user", homeController.handleUser);
  // router.post("/users/create", (req, res) => {
  //   homeController.handleCreate(req, res);
  // });
  router.post("/user/create", homeController.handleCreate); //
  return app.use("/", router); //app.use để đăng ký router đó với ứng dụng Express.
};

export default initWebRoutes;
