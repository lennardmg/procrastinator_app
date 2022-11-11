const express = require("express");
const cookieSession = require("cookie-session");
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const app = express();
const bcrypt = require("bcryptjs");
app.use(express.json());

const { authenticate } = require("../functions");
const { insertUser, findUserByEmail } = require("../db");

app.use(
    cookieSession({
        secret: process.env.SESSION_SECRET,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: true,
    })
);



////////////////////////////////////////////////////////////////////

app.get("/user/id", function (req, res) {
    res.json({
        userId: req.session.userId,
    });
});

app.post("/registration", (req, res) => {


    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;

    console.log("i'm at the POST registration on the server");

    function hashing() {
        let hashedPassword = "";

        bcrypt
            .genSalt()
            .then((salt) => {
                return bcrypt.hash(password, salt);
            })
            .then((hash) => {
                hashedPassword = hash;
            })
            .then(() => {
                insertUser(firstname, lastname, email, hashedPassword)
                    .then((userData) => {
                        req.session.userId = userData[0].id;
                        res.json({
                            success: true,
                            message: "Registration successful",
                        });
                    })
                    .catch((err) => {
                        console.log(
                            "error in insertUser with POST /registration ",
                            err
                        );
                        res.json({
                            success: false,
                            message: "*sorry, something went wrong ...",
                        });
                    });
            })
            .catch((err) => {
                console.log(
                    "error in hashing function with POST /registration ",
                    err
                );
            });
    }
    hashing();
});

app.post("/login", (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    console.log("i'm at the POST login on the server");

    findUserByEmail(email)
        .then((user) => {

            if (!user.length) {
                res.json({
                    success: false,
                    message: "*sorry, something went wrong ...",
                });
                return false;
            }

            const userInfo = user[0];
            console.log("user data: in findUserByEmail ", userInfo);

            authenticate(password, user[0].password)
                .then((result) => {
                    if (result == true) {
                        req.session.userId = userInfo.id;
                        res.json({
                            success: true,
                            message: "LogIn successful",
                        });
                    }
                    res.json({
                        success: false,
                        message: "*sorry, something went wrong ...",
                    });
                })
                .catch((err) => {
                    console.log(
                        "error in authentication inside POST /login ",
                        err
                    );
                    res.json({
                        success: false,
                        message: "*sorry, something went wrong ...",
                    });
                });
        })
        .catch((error) => {
            console.log("error in findUserByEmail function", error);
            res.json({
                success: false,
                message: "*sorry, something went wrong ...",
            });
        });
});

////////////////////////////////////////////////////////////////////
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
