const ServerManger = require("./server.manger");
const apiIndex = require("./api/index");
const errorMiddleware = require("./middlewares/error.middleware");
const express = require("express");
const port = process.env.SERVER_PORT || 8080;
(function main() {
  new ServerManger(port)
    .config({
      middlewares: [express.json(), express.urlencoded({ extended: false })],
      routes: [
        ["/api", apiIndex],
        ["/api", errorMiddleware],
      ],
    })
    .run();
})();
