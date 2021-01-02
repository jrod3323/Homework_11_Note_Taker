var path = require("path");

module.exports = function(app) {
    // route handling for GET requests
  
    app.get("/api/notes", function(req, res) {
      res.send(dbJSON);
    });
  
    app.post("/api/notes", function(req, res) {
        // Validate request body
        if(!req.body.title) {
          return res.json({error: "Missing required title"});
        }
      
        // Copy request body and generate ID
        const note = {...req.body, id: uuidv4()}
      
        // Push note to dbJSON array - saves data in memory
        dbJSON.push(note);
      
        // Saves data to file by persisting in memory variable dbJSON to db.json file.
        // This is needed because when we turn off server we loose all memory data like pbJSON variable.
        // Saving to file allows us to read previous notes (before server was shutdown) from file.
        fs.writeFile(path.join(__dirname, "db.json"), JSON.stringify(dbJSON), (err) => {
          if (err) {
            return res.json({error: "Error writing to file"});
          }
      
          return res.json(note);
        });
      });
  
  };