import express from "express";
import apiController from "../controller/apiController";

const router = express.Router();

/**
 *
 * @param {*} app - express app
 */

const initApiRoutes = (app) => {
  router.get("/getlist", apiController.apime);
  router.post("/register", (req, res) => {
    apiController.hanlderRegister(req, res);
  });

  router.post("/login", (req, res) => {
    apiController.handleLogin(req, res);
  });
  return app.use("/api/v1/", router);
};

export default initApiRoutes;
