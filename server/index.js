const express = require("express");
const cookieSession = require("cookie-session");
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const app = express();
const bcrypt = require("bcryptjs");
app.use(express.json());
const path = require("path");

const { authenticate } = require("../functions");
const {
    insertUser,
    findUserByEmail,
    createBasicToDoList,
    getUserInfo,
    getBasicToDos,
    addBasicToDo,
    getToDoLists,
    changeBasicToDo,
    deleteBasicToDo,
    countCompletedToDos,
    deleteBasicToDoList,
} = require("../db");

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
            // console.log("user data: in findUserByEmail ", userInfo);

            authenticate(password, user[0].password)
                .then((result) => {

                    if (result == true) {
                        req.session.userId = userInfo.id;
                        res.json({
                            success: true,
                            message: "LogIn successful",
                        });
                        return
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

app.get("/getUserInfo", (req, res) => {
    
    getUserInfo(req.session.userId)
    .then((userInfo) => {
        res.json({
            success: true,
            userInfo,
        });
    });
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.json({
        success: true,
    });
});

/////////////////////////////// To-Do Lists: /////////////////////////////////////

app.get("/getToDoLists", function (req, res) {

    getToDoLists(req.session.userId)
    .then((toDoLists) => {

        // console.log("toDoLists in /getToDoLists: ", toDoLists);

        if (toDoLists.length > 0) {

            // to filter out doublicate results because of several entries for the same To-Do List name
           const unique = [];

           const uniqueToDoLists = toDoLists.filter((element) => {
               const isDuplicate = unique.includes(element.basictodolist_name);
               if (!isDuplicate) {
                   unique.push(element.basictodolist_name);
                   return true;
               }
               return false;
           });

            res.json({
                success: true,
                uniqueToDoLists,
            });
            return
        } 
        res.json({
            success: false
        });

    });

});

app.post("/createBasicToDoList", function (req, res) {

    createBasicToDoList(req.session.userId, req.body.basictodolist_name)
    .then(
        (data) => {
            // console.log("data in /createBasicToDoList: ", data);

            let newToDoList = data[0];

            res.json({
                success: true,
                newToDoList
            });
        }
    );
});


app.get("/todolists/:basictodolist_name", function (req, res) {
    let basictodolist_name = req.params.basictodolist_name;

    // console.log("params on server: ", req.params);

    getBasicToDos(req.session.userId, basictodolist_name)
    .then((toDoListData) => {
        
        for (let i = 0; i < toDoListData.length; i++) {
            if (toDoListData[i].basictodo_name === null) {
                toDoListData.splice(i, 1);
            }
        }
        // console.log("toDoListData in getBasicToDos on server", toDoListData);
        
        res.json({
            success: true,
            toDoListData,
        });
    });
});


app.post("/todolists/add/:basictodolist_name", function (req, res) {
    let basictodolist_name = req.params.basictodolist_name;
    let basictodo_name = req.body.basictodo_name;
    
    addBasicToDo(basictodo_name, req.session.userId, basictodolist_name)
    .then((data) => {
                let newBasicToDoItem = data[0];

                // console.log("addBasicToDo successful: ", newBasicToDoItem);
                res.json({
                    success: true,
                    newBasicToDoItem,
                });
                return;
    })
});

app.post("/todolists/change/:basictodolist_name", function (req, res) {
    // let basictodolist_name = req.params.basictodolist_name;
    let id = req.body.id;

    changeBasicToDo(id)
    .then((data) => {

        // console.log("changeBasicToDo successful: ", data);
        res.json({
            success: true,
            data
        });
        return;
    });
});

app.post("/todolists/delete/:basictodolist_name", function (req, res) {
    // let basictodolist_name = req.params.basictodolist_name;
    let id = req.body.id;

    deleteBasicToDo(id).then((data) => {
        // console.log("deleteBasicToDo successful: ", data);
        res.json({
            success: true,
        });
        return;
    });
});


app.get("/countCompletedToDos", function (req, res) {

    countCompletedToDos(req.session.userId)
    .then((data) => {
    
        let amount = data[0].count

        res.json({
            success: true,
            amount,
        });
    });
});


app.post("/deleteBasicToDoList", function (req, res) {

    deleteBasicToDoList(req.body.basictodolist_name, req.session.userId)
    .then(() => {
        // console.log("ToDoList successfully deleted");
        res.json({
            success: true,
        });
        return;
    });
});


app.get("*", function (req, res) {
 res.sendFile(path.join(__dirname, "../client/public", "index.html"))
});


////////////////////////////////////////////////////////////////////
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
