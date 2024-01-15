const ServerManger = require("./server.manger");
const apiIndex = require("./api/index");
const errorMiddleware = require("./middlewares/error.middleware");
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const path = require("path");
const { swaggerSpec } = require("./config/swagger-config");
const port = process.env.SERVER_PORT || 8080;
(function main() {
  new ServerManger(port)
    .config({
      middlewares: [
        cors(),
        express.json(),
        express.urlencoded({ extended: false }),
      ],
      routes: [
        ["/api-docs", swaggerUi.serve],
        ["/api-docs", swaggerUi.setup(swaggerSpec)],
        ["/image", express.static(path.join(__dirname, "image"))],
        ["/api", apiIndex],
        ["/api", errorMiddleware],
      ],
    })
    .run();
})();
