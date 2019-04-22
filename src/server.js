const express = require("express");
const app = express();
const routes = require("./routes");
const bodyParser = require("body-parser");

app.use(bodyParser.json({ limit: "50mb" }));

app.use(routes);

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
