import express from "express";
const app = express();
const port = 3002;

import routerApi from "./router/index.js";

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

routerApi(app);

app.listen(port, () => {
  console.log("Mi servidor corre en el puerto " + port);
});
