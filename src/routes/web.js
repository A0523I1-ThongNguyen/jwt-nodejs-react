import express from "express";
import homeController from "../controller/homeController"; //import tới file homeController
import apiController from "../controller/apiController";

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
  router.post("/delete-user/:id", homeController.handleDelete);
  router.get("/update-user/:id", homeController.getUpdatePage);
  router.post("/user/update", homeController.handleUpdate);
  // router.get("/api/apime", apiController.apime);
  return app.use("/", router); //app.use để đăng ký router đó với ứng dụng Express.
};

export default initWebRoutes;
