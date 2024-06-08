import express from "express";
import wsaaRouter from "./wsaa.router.js";
import wsfeRouter from "./wsfe.router.js";

const routerApi = (app) => {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/wsaa", wsaaRouter);
  router.use("/wsfe", wsfeRouter);
};

export default routerApi;
