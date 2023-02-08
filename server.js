const express = require("express");
const path = require("path");
const fs = require("fs");
const { parse } = require("path");
const { query } = require("express");

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


// Creating HTML routes & response
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname,"./public/index.html"))
})

// Creating API routes with File System & JSON response.
app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        const parsedData = JSON.parse(data);

        res.json(parsedData)
    })
})

// Adding API post with fs 
app.post("/api/notes", (req, res) => {
    const receivedData = req.body;

    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        const parsedData = JSON.parse(data);

//         // Adding Delete routes with an id to db.json 
// app.delete("/api/notes", (req,res) => {
//     const receivedData = query.data(id); 

    parsedData.push(receivedData);    

         })   
         
    fs.writeFile("./db/db.json", JSON.stringify(parsedData, null, 4), () => {
           console.log("Added new note!")
           res.json(parsedData)
        } )
    })


// Server listening
app.listen(3001, () => {
    console.log("Server is now listening!")
})