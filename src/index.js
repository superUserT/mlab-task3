const express = require("express");
const app = express();

const { movies, series, songs } = require("objects.js");
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// movie routes

app.get("/movies", async (req, res) => {
  //todo
});

app.get("/movies/:title", async (req, res) => {
  //todo
});

app.post("/movies", async (req, res) => {
  //todo
});

app.post("/movies/:title", async (req, res) => {
  //todo
});

app.delete("/movies/", async (req, res) => {
  //todo
});

app.delete("/movies/:title", async (req, res) => {
  //todo
});

app.put("/movies", async (req, res) => {
  //todo
});

app.put("/movies/:title", async (req, res) => {
  //todo
});

// series routes
app.get("/series", async (req, res) => {
  //todo
});

app.get("/series/:title", async (req, res) => {
  //todo
});

app.post("/series", async (req, res) => {
  //todo
});

app.post("/series/:title", async (req, res) => {
  //todo
});

app.delete("/series/", async (req, res) => {
  //todo
});

app.delete("/series/:title", async (req, res) => {
  //todo
});

app.put("/series", async (req, res) => {
  //todo
});

app.put("/series/:title", async (req, res) => {
  //todo
});

//song routes
app.get("songs", async (req, res) => {
  //todo
});

app.get("/songs/:songName", async (req, res) => {
  //todo
});

app.post("/songs", async (req, res) => {
  //todo
});

app.post("/songs/:songName", async (req, res) => {
  //todo
});

app.delete("/songs/", async (req, res) => {
  //todo
});

app.delete("/songs/:songName", async (req, res) => {
  //todo
});

app.put("/songs", async (req, res) => {
  //todo
});

app.put("/songs/:songName", async (req, res) => {
  //todo
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = { app };
