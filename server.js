const app = require("express")();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const errorHandler = require("./error-handler");

// Tools for authenticating user
const passport = require("passport");
const session = require("express-session");
const GithubStrategy = require("passport-github2").Strategy;
const cors = require("cors");
const User = require("./controllers/userController");

require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({ methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"] }));
app.use(cors({ origin: "*" }));
app.use("/", require("./routes"));

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function (accessToken, refreshToken, profile, done) {
    const query = { githubId: profile.id, displayName: profile.displayName, profileUrl: profile.profileUrl }
    User.findOrCreate(query)
        .then(user => done(null, user))
        .catch(err => done(err));
}));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get("/", (req, res) => {
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out") 
});
app.get("/github/callback", passport.authenticate("github", {
    failureRedirect: "/api-docs", session: false }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect("/");
    }
);

app.use(errorHandler.error404Handler);
app.use(errorHandler.generalErrorHandler);

app.listen(port, () => {
    try {
        mongoose.connect(process.env.MONGODB_URL);
        console.log(`Database is listening and node running on port ${port}`);
    } catch {
        console.log("Could not connect to database");
    }
});