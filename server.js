const app = require("express")();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const errorHandler = require("./error-handler");

require("dotenv").config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.use("/", require("./routes"));

// File Not Found Route
app.use(errorHandler.error404Handler);
  
// Error handler
app.use(errorHandler.generalErrorHandler);

app.listen(port, () => {
    try {
        mongoose.connect(process.env.MONGODB_URL);
        console.log(`Database is listening and node running on port ${port}`);
    } catch {
        console.log("Could not connect to database");
    }
});