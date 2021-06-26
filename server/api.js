/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
// const socketManager = require("./server-socket"); //socket

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

// router.post("/initsocket", (req, res) => {
//   // do nothing if user not logged in
//   if (req.user) socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
//   res.send({});
// }); //socket

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

const SavedTranscript = require("./models/savedTranscript");
const Category = require("./models/category");
const Analysis = require("./models/analysis");

// SavedTranscript
// Get saved transcript
router.get("/savedtranscripts", (req, res) => {
  SavedTranscript.find({ user_id: req.user._id }).sort({date: 'descending'}).then((savedTranscript) => {
    res.send(savedTranscript);
  });
});

// Post saved transcript
router.post("/savedtranscript", auth.ensureLoggedIn, (req, res) => {
  const newSavedTranscript = new SavedTranscript({
    user_id: req.user._id,
    topic: req.body.topic,
    transcript: req.body.content,
  });
  newSavedTranscript.save().then((transcript) => {res.send(transcript)});
})

// Delete saved transcript
router.post("/deletesavedtranscript", auth.ensureLoggedIn, (req, res) => {
  const _id = req.body._id
  SavedTranscript.deleteOne({ _id: _id }).then(
    res.send({})).then(console.log("deleted"))
})

// Update saved transcript by adding analysis
router.post("/addanalysis", auth.ensureLoggedIn, (req, res) => {
  const _id = req.body._id
  SavedTranscript.findOne({ _id: _id }).then((document) => {
    document.timeUsed = req.body.timeUsed;
    document.speed = req.body.speed;
    document.pauses = req.body.pauses;
    document.pauseTime = req.body.pauseTime;
    document.speechDelay = req.body.speechDelay;
    document.save().then((document) => {res.send(document)});
  });
})

// Category
// Get categories
router.get("/categories", (req, res) => {
  Category.find({}).sort({category: 'ascending'}).then((category) => {
    res.send(category);
  });
});

// Analysis
// Get analysis
router.get("/analyses", (req, res) => {
  Analysis.find({}).then((analysis) => {
    res.send(analysis);
  });
});

// Post analysis
router.post("/analysis", (req, res) => {
  const newAnalysis = new Analysis({
    user_id: req.user._id,
    transcriptId: req.body.transcriptId,
    timeUsed: req.body.timeUsed,
    speed: req.body.speed,
    pauses: req.body.pauses,
    pauseTime: req.body.pauseTime,
    // words: { repeatedWords: { word: req.body.word, synonyms: req.body.synonyms } },
  })
  newAnalysis.save().then((analysis) => res.send(analysis));
});

// Delete analysis
router.post("/deleteanalysis", (req, res) => {
  const transcriptId = req.body.transcriptId
  Analysis.deleteOne({ transcriptId: transcriptId }).then(
  res.send({})).then(console.log("deleted transcript"))
})

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
