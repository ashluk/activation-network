const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const db = require("./db");

const { hash, compare } = require("./bc.js");
const cookieSession = require("cookie-session");

app.use(
    cookieSession({
        secret: `I'm always hungry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);
const csurf = require("csurf");
app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(compression());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("./welcome", (req, res) => {
    //is going to run if the user puts /welcome in the url bar
    if (req.session.userId) {
        //if the user is logged in they are NOT allowed to see welcome
        //if the user is logged in then redirect to /
        res.redirect("/");
    } else {
        //send back HTML, which will trigger start.js to render welcome in DOM
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

/////////////////REGISTER ROUTE///////////////////////
app.get("/registration", (req, res) => {});

app.post("/registration", (req, res) => {
    const { first, last, email, password } = req.body;
    // console.log("requested body", req.body);

    hash(password)
        .then((hashedPassword) => {
            db.addUser(first, last, email, hashedPassword)
                .then(({ rows }) => {
                    console.log("rows: ", rows);
                    req.session.userId = rows[0].id;

                    //res.redirect("/welcome");
                    res.json({ success: true });
                })
                .catch((err) => {
                    console.log("registration error", err);
                    /*res.render("registration", {
                        err: true,
                    });*/
                    res.json({ success: false });
                });
        })
        .catch((err) => {
            console.log("error in hash", err);
            /*res.render("registration", {
                err: true,
            });*/
            res.json({ success: false });
        });
});

///////////////////LOGIN ROUTE/////////////////////////////
////LOGIN ROUTE
app.get("/login", (req, res) => {});
app.post("/login", (req, res) => {
    const password = req.body.password;
    const email = req.body.email;
    console.log("email, password", req.body);
    if (email == "") {
        console.log("!email");
        res.json({ success: false });
    } else if (password == "") {
        console.log("!password");
        res.json({ success: false });
    }
    db.passwordCompare(email)
        .then(({ rows }) => {
            console.log("rows id", rows);
            console.log("password, rows", password, rows[0].password);

            compare(password, rows[0].password)
                .then((match) => {
                    if (match === true) {
                        req.session.userId = rows[0].id;
                        res.redirect("welcome");
                        console.log("matched id");
                    } else {
                        res.json({
                            error: "password incorrect",
                        });
                    }
                })
                .catch((err) => {
                    console.log("error in compare", err);
                    res.json({ success: false });
                });
        })
        .catch((err) => {
            console.log("error in login", err);
            res.json({ success: false });
        });
});

///////THIS ROUTE SHOULD ALWAYS GO AT THE BOTTOM BEFORE APP.LISTEN//////////
app.get("*", function (req, res) {
    // runs if the user goes to literally any route except /welcome
    console.log("req.session.userId", req.session.userId);
    if (req.session.userId) {
        // if the user is NOT logged in, redirect them to /welcome, which is the only page
        // they're allowed to see
        //console.log("can yous ee me");
        res.redirect("/welcome");
    } else {
        // this runs if the user is logged in
        // in which case send back the HTML, after which start js kicks in and renders our p tag...
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
