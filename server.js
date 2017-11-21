const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/nytscrape",
  {
    useMongoClient: true
  }
);

// TODO: move db stuff out
const db = require('./models')
const { Article } = db
/*End DB*/

// routes
app.post("/api/saved", (req, res) => {
  //get the posted object
  var article = req.body;
  // call Article.create
  //return some JSON (success | error)
  Article.create(article).
  then(() => {
    res.json(article)
    })
    .catch((err) => {
      res.json(err)
    })
})

app.get('/api/saved', (req, res) => {
  Article.find({}).then(articles => res.json(articles))
})

app.delete('/api/saved/:id', (req, res) => {
  Article.remove({_id: req.params.id})
    .then(articles => res.json(articles))
})
/*end routes*/

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/public/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
