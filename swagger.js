const swaggerAutogen = require("swagger-autogen");

const doc = {
    info: {
        title: "Library API",
        description: "CSE 341 Project 2 - Library API"
    },
    host: "localhost:6060"
};

const outputFile = "./swagger-output.json";
const routes = ["./routes/index.js"];

swaggerAutogen(outputFile, routes, doc);