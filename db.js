require("dotenv").config();
const spicedPg = require("spiced-pg");
const DATABASE_URL = process.env.DATABASE_URL;
const db = spicedPg(DATABASE_URL);

module.exports.insertUser = function (first_name, last_name, email, password) {
    const sql = `
        INSERT INTO users (first_name, last_name, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
    return db
        .query(sql, [first_name, last_name, email, password])
        .then((result) => result.rows);
};


module.exports.findUserByEmail = function (email) {
    const sql = `
        SELECT id, email, password, first_name, last_name FROM users WHERE email= $1;
    `;
    return db
        .query(sql, [email])
        .then((result) => result.rows);
};


/////////////////////////////////////////////////////////////////////////////////////////

module.exports.createBasicToDoList = function (creator_id, basictodolist_name) {
    const sql = `
        INSERT INTO basictodos (creator_id, basictodolist_name) VALUES ($1, $2)
        RETURNING *;
    `;
    return db
        .query(sql, [creator_id, basictodolist_name])
        .then((result) => result.rows)
        .catch((err) => {console.log("error in createBasicToDoList: ", err)});
};

// here still needs to be included the JOIN for the advanced To-Do lists table
module.exports.getToDoLists = function (creator_id) {
    const sql = `
        SELECT * FROM basictodos WHERE creator_id = $1
        ORDER BY created_at DESC;
    `;
    return db
        .query(sql, [creator_id])
        .then((result) => result.rows)
        .catch((err) => {console.log("error in getToDoLists: ", err)});
};

module.exports.getBasicToDos = function (creator_id, basictodolist_name) {
    const sql = `
        SELECT * FROM basictodos WHERE (creator_id = $1 AND basictodolist_name = $2);
    `;
    return db
        .query(sql, [creator_id, basictodolist_name])
        .then((result) => result.rows)
        .catch((err) => {console.log("error in getBasicToDos: ", err)});
};

module.exports.addBasicToDo = function (todo_name, creator_id, basictodolist_name) {
    const sql = `
        INSERT INTO basictodos (todo_name) VALUES ($1)
        WHERE (creator_id = $2 AND basictodolist_name = $3);
    `;
    return db
    .query(sql, [todo_name, creator_id, basictodolist_name])
    .then((result) => result.rows)
    .catch((err) => {console.log("error in addBasicToDo: ", err);});
};

/////////////////////////////////////////////////////////////////////////////////////////
