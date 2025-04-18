const express = require("express");
const app = express();
let {
  movies,
  series,
  songs,
  errorMessages,
  successMesseges,
} = require("./objects.js");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
  });
});

app.get("/movies", (_req, res) => {
  if (movies.length === 0) {
    res.send(errorMessages.noMovies);
  }
  try {
    res.status(200).send({
      success: "true",
      result: movies,
    });
  } catch (error) {
    res.status(500).send({
      success: "false",
      error: error.message,
    });
  }
});

app.get("/movies/:title", async (req, res) => {
  try {
    const title = req.params.title.toLowerCase();
    const movie = movies.find((movie) => movie.title.toLowerCase() === title);

    if (!movie) {
      return res.status(404).send({
        success: false,
        message: errorMessages.movieNotFound,
      });
    }

    res.status(200).send({
      success: true,
      result: movie,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
});

app.post("/movies/:title", async (req, res) => {
  try {
    const oldTitle = req.params.title.toLowerCase();
    const { title: newTitle } = req.body;

    if (!newTitle) {
      res.status(400).send(errorMessages.missingTitle);
    }

    const index = movies.findIndex(
      (movie) => movie.title.toLowerCase() === oldTitle
    );

    if (index !== -1) {
      movies[index].title = newTitle;
      return res.send({
        success: "true",
        message: successMesseges.movieUpdated,
        result: movies,
      });
    }

    movies.push({ title: newTitle });
    res.status(200).send({
      success: "true",
      message: successMesseges.movieAdded,
      result: movies,
    });
  } catch (error) {
    res.status(500).send({
      success: "false",
      error: error.message,
    });
  }
});

app.delete("/movies", async (_req, res) => {
  try {
    if (movies.length === 0) {
      res.send(errorMessages.noMovies);
    }
    movies.length = 0;
    res.send({
      success: "true",
      message: successMesseges.allMoviesDeleted,
      result: movies,
    });
  } catch (error) {
    res.status(500).send({
      success: "false",
      error: error.message,
    });
  }
});

app.delete("/movies/:title", async (req, res) => {
  try {
    const title = req.params.title.toLowerCase();
    const initialLength = movies.length;

    movies = movies.filter((movie) => movie.title.toLowerCase() !== title);

    if (movies.length === initialLength) {
      return res.status(404).send(errorMessages.movieNotFound);
    }

    res.send({
      success: "true",
      message: successMesseges.movieDeleted,
      result: movies,
    });
  } catch (error) {
    res.status(500).send({
      success: "false",
      error: error.message,
    });
  }
});

app.put("/movies", async (req, res) => {
  try {
    const { movies: newMovies } = req.body;

    if (!Array.isArray(newMovies)) {
      return res.status(400).send(errorMessages.invalidFormat);
    }

    movies = newMovies;
    res.send({
      success: "true",
      message: successMesseges.moviesReplaced,
      result: movies,
    });
  } catch (error) {
    res.status(500).send({
      success: "false",
      error: error.message,
    });
  }
});

app.put("/movies/:title", async (req, res) => {
  try {
    const oldTitle = req.params.title.toLowerCase();
    const { title: newTitle } = req.body;

    if (!newTitle) {
      return res.status(400).send(errorMessages.missingTitle);
    }

    const index = movies.findIndex(
      (movie) => movie.title.toLowerCase() === oldTitle
    );

    if (index === -1) {
      return res.status(404).send(errorMessages.movieNotFound);
    }

    movies[index].title = newTitle;
    res.send({
      success: "true",
      message: successMesseges.movieUpdated,
      result: movies,
    });
  } catch (error) {
    res.status(500).send({
      success: "false",
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Multimedia app listening on port ${port}`);
});

module.exports = { app };
