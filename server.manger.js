const express = require("express");
const app = express();
class ServerManger {
  constructor(port) {
    this.port = port;
  }
  config(config) {
    const middlewares = config.middlewares;
    const routes = config.routes;
    this.routeApi(routes);
    this.routeMiddleware(middlewares);

    return this;
  }
  routeApi(routes) {
    if (!routes) return;
    routes.map((route) => {
      app.use(route[0], route[1]);
    });
  }
  routeMiddleware(middlewares) {
    if (!middlewares) return;
    middlewares.map((middleware) => {
      app.use(middleware);
    });
  }
  run() {
    app.listen(this.port, () => {
      console.log(`server[${this.port}] open`);
    });
  }
}

module.exports = ServerManger;
