const express = require("express");
const path = require("path");
const fs = require("fs");
const { parse } = require("path");
const { query } = require("express");
const app = express();
const dbData = require('../db/db.json');


// middleware
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


// Creating HTML & API routes with response (return)
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
});

app.get("/api/notes", (req, res) => res.json(dbData));

app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname,"./public/index.html"))
});
 
app.post("/api/notes", (req, res) => {
    const receivedData = req.body;});





    // Server listing
    app.listen(3001, () => {
        console.log("Hello Server!");
    })

