import express from "express";
import homeController from "../controller/homeController"; //import file homeController

const router = express.Router();

/**
 *
 * @param {*} app - express app
 */

// The server/express will know how many routers the website has and what to do when a user requests a specific link.
const initWebRoutes = (app) => {
  //path , handle
  router.get("/", homeController.handleHello); // Route defined using router.get
  router.get("/user", homeController.handleUser);
  // router.post("/users/create", (req, res) => {
  //   homeController.handleCreate(req, res);
  // });
  router.post("/user/create", homeController.handleCreate);
  router.post("/delete-user/:id", homeController.handleDelete);
  router.get("/update-user/:id", homeController.getUpdatePage);
  router.post("/user/update", homeController.handleUpdate);

  return app.use("/", router); // app.use is used to register that router with the Express application.
};

export default initWebRoutes;
