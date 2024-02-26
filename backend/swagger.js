// swagger.js
const swaggerAutogen = require("swagger-autogen")();

const options = {
  info: {
    title: "TEST API Docs",
    description: "test api docs",
  },
  servers: [
    {
      url: "http://localhost:8080",
    },
  ],
  schemes: ["http"],
  securityDefinitions: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      in: "header",
      bearerFormat: "JWT",
    },
  },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = [
  "./api/auth.index.js",
  "./api/board.index.js",
  "./api/comment.index.js",
  "./api/index.js",
  "./api/user.index.js",
];
swaggerAutogen(outputFile, endpointsFiles, options);
