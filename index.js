var express = require("express");
var app = express();

app.all("/secret", function(req, res, next) {
  console.log("Accessing the secret section ...");
  next(); // pass control to the next handler
});

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.get("/about", function(req, res) {
  res.send("About this wiki");
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});

let MongoClient = require("mongodb").MongoClient;
MongoClient.connect("mongodb://localhost:27017/animals", function(err, client) {
  if (err) throw err;

  let db = client.db("animals");
  db.collection("mammals")
    .find()
    .toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      client.close();
    });
});
