const express = require("express");
const path = require("path");
const fs = require("fs");
const { join } = require("path");
const { v4: uuidv4 } = require("uuid");

let dbData = require("./db/db.json");

const app = express();

// middleware for parsing JSON and urlencoded from data
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// GET Route for notes page
app.get("/notes", (req, res) => {
  res.sendFile(join(__dirname, "./public/notes.html"));
});

// GET Route to retrive saved note
app.get("/api/notes", (req, res) => res.json(dbData));

// GET Route for homepage
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// POST Route to add new text (Data)
app.post("/api/notes", (req, res) => {
  try {
    const filePath = join(__dirname, "./db/db.json");
    // receiving the data from client
    const receivedNote = req.body;

    //   adding an id to the data Object
    const noteToSave = {
      id: uuidv4(),
      ...receivedNote,
    };

    // get the array from db.json
    let dataFromDb = fs.readFileSync(filePath, "utf-8");

    dataFromDb = JSON.parse(dataFromDb);

    const dataToSave = [...dataFromDb, noteToSave];
    dbData = dataToSave;
    fs.writeFileSync(filePath, JSON.stringify(dataToSave), "utf-8");
    res.status(200).json(dataToSave);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!" });
  }

  // add a unique id to the note
  // we should add the new note to the notes array in db.json
});

// Delete Route
app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  const filePath = join(__dirname, "./db/db.json");
  let dataFromDb = fs.readFileSync(filePath, "utf-8");

  dataFromDb = JSON.parse(dataFromDb);
  dbData = dataFromDb.filter((note) => note.id !== id);
  fs.writeFileSync("./db/db.json", JSON.stringify(dbData));
  console.log(id);
  res.json("note with the id ${note_id} has been deleted!");
});

// Server listing
app.listen(3001, () => {
  console.log("Hello Server!");
});
