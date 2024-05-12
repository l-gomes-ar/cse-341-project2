const router = require("express").Router();
const bookController = require("../controllers/bookController");
const swaggerUi = require("swagger-ui-express");
const handleErrors = require("../error-handler/").handleErrorsMiddleware;

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(require("../swagger-output.json")));

router.get("/library", handleErrors(bookController.findAllBooks));
router.get("/library/:id", handleErrors(bookController.findBook));
router.post("/library", handleErrors(bookController.createBook));
router.put("/library/:id", handleErrors(bookController.updateBook));
router.delete("/library/:id", handleErrors(bookController.deleteBook));

module.exports = router;