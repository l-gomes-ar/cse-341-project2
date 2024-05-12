const swaggerAutogen = require("swagger-autogen");

const doc = {
    info: {
        title: "Library API",
        description: "CSE 341 Project 2 - Library API by Lucas Araujo"
    },
    host: "cse-341-project2-21jp.onrender.com"
};

const outputFile = "./swagger-output.json";
const routes = ["./routes/index.js"];

swaggerAutogen(outputFile, routes, doc);