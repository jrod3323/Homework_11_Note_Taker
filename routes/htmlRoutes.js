var path = require("path");

module.exports = function(app) {
    // route handling for GET requests
  
    // loads index page on initiation
    app.get("/", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    });
    // loads notes page on request
    app.get("/notes", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/notes.html"));
    });
  
    // If no matching route is found default to index
    app.get("*", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    });
  };