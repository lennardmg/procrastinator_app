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

module.exports.getUserInfo = function (id) {
    const sql = `
        SELECT * FROM users WHERE id= $1;
    `;
    return db
        .query(sql, [id])
        .then((result) => result.rows)
        .catch((err) => {console.log("error in getUserInfo: ", err)});
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
        SELECT * FROM basictodos WHERE (creator_id = $1 AND basictodolist_name = $2)
        ORDER BY created_at DESC;
    `;
    return db
        .query(sql, [creator_id, basictodolist_name])
        .then((result) => result.rows)
        .catch((err) => {console.log("error in getBasicToDos: ", err)});
};

module.exports.addBasicToDo = function (basictodo_name, creator_id, basictodolist_name) {
    const sql = `
        INSERT INTO basictodos (basictodo_name, creator_id, basictodolist_name) VALUES ($1, $2, $3)
        RETURNING *;
    `;
    return db
        .query(sql, [basictodo_name, creator_id, basictodolist_name])
        .then((result) => result.rows)
        .catch((err) => {
            console.log("error in addBasicToDo: ", err);
        });
};

module.exports.changeBasicToDo = function (id) {
    const sql = `
    UPDATE basictodos SET completed = NOT completed
    WHERE id = $1
    RETURNING *;
    `;
    return db
        .query(sql, [id])
        .then((result) => result.rows)
        .catch((err) => {
            console.log("error in addBasicToDo: ", err);
        });
};

module.exports.deleteBasicToDo = function (id) {
    const sql = `
        DELETE FROM basictodos
        WHERE id = $1; 
    `;
    return db
        .query(sql, [id])
        .then((result) => result.rows)
        .catch((err) => {
            console.log("error in deleteBasicToDo: ", err);
        });
};


module.exports.countCompletedToDos = function (creator_id) {
    const sql = `
        SELECT COUNT(*) FROM basictodos
        WHERE (creator_id = $1 AND completed = 'true');
    `;
    return db
        .query(sql, [creator_id])
        .then((result) => result.rows)
        .catch((err) => {
            console.log("error in countCompletedToDos: ", err);
        });
};


module.exports.deleteBasicToDoList = function (basictodolist_name, creator_id) {
    const sql = `
        DELETE FROM basictodos
        WHERE (basictodolist_name = $1 AND creator_id = $2); 
    `;
    return db
        .query(sql, [basictodolist_name, creator_id])
        .then((result) => result.rows)
        .catch((err) => {
            console.log("error in deleteBasicToDoList: ", err);
        });
};

/////////////////////////////////////////////////////////////////////////////////////////
