// server/index.js

// hallo
const express = require("express");

let text = "hallo";

const PORT = process.env.PORT || 3001;

const app = express();

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
