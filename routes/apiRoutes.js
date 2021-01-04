var path = require("path");
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
let dbJSON = require("../db/db.json");

module.exports = function(app) {
    // route handling for GET requests for current db.JSON file (persisting db)
  
    app.get("/api/notes", function(req, res) {
      res.send(dbJSON);
    });
  
    // Post request to add new note
    app.post("/api/notes", function(req, res) {
        
        if(!req.body.title) {
          return res.json({error: "Missing required title"});
        }
      
        // Copy request body and generate unique note ID
        const note = {...req.body, id: uuidv4()}
      
        // Push note to dbJSON array 
        dbJSON.push(note);
      
        // writing to db.JSON file to persist memory 
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(dbJSON), (err) => {
          if (err) {
            return res.json({error: "Error writing to file"});
          }
      
          return res.json(note);
        });
      });

      // Delete request for notes
    app.delete("/api/notes/:id", function(req,res) {
      // grabs unique id for note
        let noteId = req.params.id;
      // filters out all notes not matching the unique note (deleting selected note)
        const newNotes = dbJSON.filter(note => note.id !== noteId)

        dbJSON = newNotes;
      // writes filtered list to db.JSON file 
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(dbJSON), (err) => {
          if (err) {
            return res.json({error: "Error writing to file"});
          }
      
          return res.json(newNotes);
        });

    })
  
  };