/* const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.urlencoded({ extended: true }));

// connect to your MongoDB Atlas cluster
mongoose.connect("mongodb+srv://dimas-aa:Himdimas123@cluster0.muk3gwu.mongodb.net/mongo", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// create a schema for your data
const notesSchema = {
  name: String,
  email: String,
  company: String
};

// create a model for your data
const Note = mongoose.model("Note", notesSchema);

// serve your index.html file
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

// handle form submission
app.post("/submit", function(req, res) {
  // create a new Note object with the form data
  const newNote = new Note({
    name: req.body.name,
    email: req.body.email,
    company: req.body.company
  });

  // save the new note to your database
  newNote.save(function(err) {
    if (err) {
      console.log(err);
      res.redirect("/error.html");
    } else {
      console.log("Successfully saved note to database.");
      res.redirect("/");
    }
  });
});

// start your server
app.listen(3000, function() {
  console.log("Server is running on port 3000.");
}); */