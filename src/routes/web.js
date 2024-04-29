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
  router.get("/", homeController.handleHello);
  router.get("/user", homeController.handleUser);

  return app.use("/", router);
};

export default initWebRoutes;
