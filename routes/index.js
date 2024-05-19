const router = require("express").Router();
const passport = require("passport");
const bookController = require("../controllers/bookController");
const swaggerUi = require("swagger-ui-express");
const handleErrors = require("../error-handler/").handleErrorsMiddleware;
const { isAuthenticated } = require("../middleware/authenticate");

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(require("../swagger-output.json")));

router.get("/login", passport.authenticate("github"), (req, res) => {});
router.get("/logout", function (req, res, next) {
    req.logout(function (err) {
        if (err) 
            return next(err);
        res.redirect("/");
    })
})

router.get("/library", handleErrors(bookController.findAllBooks));
router.get("/library/:id", handleErrors(bookController.findBook));
router.post("/library", isAuthenticated, handleErrors(bookController.createBook));
router.put("/library/:id", isAuthenticated, handleErrors(bookController.updateBook));
router.delete("/library/:id", isAuthenticated, handleErrors(bookController.deleteBook));

module.exports = router;