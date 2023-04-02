const express = require("express");
const config = require("config");
const cors = require("cors");

const { connectDb } = require("./models");
const router = require("./api/http/index");
const { logHttpRequest } = require("./utils");

const app = express();
app.use(cors());
const port = process.env.PORT || config.port;
app.use(express.json());
app.use(config.baseRoute, logHttpRequest, router);

const startApp = app.listen(port, () => {
  console.log("server is listening", {
    port: port,
    baseRoute: config.baseRoute,
  });
});

Promise.all([connectDb()])
  .then(() => startApp)
  .catch((error) => console.error("failed to start service", error));
