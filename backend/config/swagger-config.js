const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  info: {
    title: "Express API with Swagger",
    version: "1.0.0",
    description: "API documentation with Swagger",
  },
  basePath: "/api",
};
const options = {
  swaggerDefinition,
  apis: ["./api/*.js"], // API ���Ʈ ���
};

module.exports = {
  swaggerSpec: swaggerJSDoc(options),
};
