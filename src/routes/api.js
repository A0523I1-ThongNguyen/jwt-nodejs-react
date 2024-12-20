import express from "express";
import apiController from "../controller/apiController";
import userController from "../controller/userController";
import groupController from "../controller/groupController";
import { route } from "express/lib/application";

const router = express.Router();

/**
 *
 * @param {*} app - express app
 */

const initApiRoutes = (app) => {
  router.post("/register", (req, res) => {
    apiController.hanlderRegister(req, res);
  });

  router.post("/login", (req, res) => {
    apiController.handleLogin(req, res);
  });

  router.get("/user/read", userController.read);
  router.post("/user/create", userController.create);
  router.put("/user/update", userController.update);
  router.delete("/user/delete/:id", userController.del);

  router.get("/group/read", groupController.read);
  return app.use("/api/v1/", router);
};

export default initApiRoutes;
