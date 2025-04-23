const express = require("express");
const app = express();
let {
  movies,
  series,
  songs,
  errorMessages,
  successMesseges,
} = require("./objects.js");
const {
  createMoviesJson,
  createSeriesJson,
  createSongsJson,
} = require("./helper_functions.js");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

createMoviesJson();
createSeriesJson();
createSongsJson();

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

app.get("/series", (_req, res) => {
  if (series.length === 0) {
    res.send(errorMessages.noSeries);
  }
  try {
    res.status(200).send({
      success: "true",
      result: series,
    });
  } catch (error) {
    res.status(500).send({
      success: "false",
      error: error.message,
    });
  }
});

app.get("/series/:title", async (req, res) => {
  try {
    const title = req.params.title.toLowerCase();
    const series = series.find(
      (series) => series.title.toLowerCase() === title
    );

    if (!series) {
      return res.status(404).send({
        success: false,
        message: errorMessages.seriesNotFound,
      });
    }

    res.status(200).send({
      success: true,
      result: series,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
});

app.post("/series/:title", async (req, res) => {
  try {
    const oldTitle = req.params.title.toLowerCase();
    const { title: newTitle } = req.body;

    if (!newTitle) {
      res.status(400).send(errorMessages.missingSeriesTitle);
    }

    const index = series.findIndex(
      (series) => series.title.toLowerCase() === oldTitle
    );

    if (index !== -1) {
      series[index].title = newTitle;
      return res.send({
        success: "true",
        message: successMesseges.seriesUpdated,
        result: series,
      });
    }

    series.push({ title: newTitle });
    res.status(200).send({
      success: "true",
      message: successMesseges.seriesAdded,
      result: series,
    });
  } catch (error) {
    res.status(500).send({
      success: "false",
      error: error.message,
    });
  }
});

app.delete("/series", async (_req, res) => {
  try {
    if (series.length === 0) {
      res.send(errorMessages.noSeries);
    }
    series.length = 0;
    res.send({
      success: "true",
      message: successMesseges.allSeriessDeleted,
      result: series,
    });
  } catch (error) {
    res.status(500).send({
      success: "false",
      error: error.message,
    });
  }
});

app.delete("/series/:title", async (req, res) => {
  try {
    const title = req.params.title.toLowerCase();
    const initialLength = series.length;

    series = series.filter((series) => series.title.toLowerCase() !== title);

    if (series.length === initialLength) {
      return res.status(404).send(errorMessages.seriesNotFound);
    }

    res.send({
      success: "true",
      message: successMesseges.seriesDeleted,
      result: series,
    });
  } catch (error) {
    res.status(500).send({
      success: "false",
      error: error.message,
    });
  }
});

app.put("/series", async (req, res) => {
  try {
    const { series: newSeries } = req.body;

    if (!Array.isArray(newSeries)) {
      return res.status(400).send(errorMessages.invalidFormat);
    }

    series = newSeries;
    res.send({
      success: "true",
      message: successMesseges.seriesReplaced,
      result: series,
    });
  } catch (error) {
    res.status(500).send({
      success: "false",
      error: error.message,
    });
  }
});

app.put("/series/:title", async (req, res) => {
  try {
    const oldTitle = req.params.title.toLowerCase();
    const { title: newTitle } = req.body;

    if (!newTitle) {
      return res.status(400).send(errorMessages.missingSeriesTitle);
    }

    const index = series.findIndex(
      (series) => series.title.toLowerCase() === oldTitle
    );

    if (index === -1) {
      return res.status(404).send(errorMessages.seriesNotFound);
    }

    series[index].title = newTitle;
    res.send({
      success: "true",
      message: successMesseges.seriesUpdated,
      result: series,
    });
  } catch (error) {
    res.status(500).send({
      success: "false",
      error: error.message,
    });
  }
});

app.get("/songs", (_req, res) => {
  if (songs.length === 0) {
    res.send(errorMessages.noSongs);
  }
  try {
    res.status(200).send({
      success: "true",
      result: songs,
    });
  } catch (error) {
    res.status(500).send({
      success: "false",
      error: error.message,
    });
  }
});

app.get("/songs/:name", async (req, res) => {
  try {
    const name = req.params.name.toLowerCase();
    const songs = songs.find((songs) => songs.name.toLowerCase() === name);

    if (!songs) {
      return res.status(404).send({
        success: false,
        message: errorMessages.songNotFound,
      });
    }

    res.status(200).send({
      success: true,
      result: songs,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
});

app.post("/songs", async (req, res) => {
  try {
    const { name, artist, year } = req.body;

    if (!name || !artist || !year) {
      return res.status(400).send({
        success: "false",
        message: missingSongData,
      });
    }

    const exists = songs.find(
      (song) => song.name.toLowerCase() === name.toLowerCase()
    );

    if (exists) {
      return res.status(409).send({
        success: "false",
        message: errorMessages.songAlreadyExists,
      });
    }

    const newSong = { name, artist, year };
    songs.push(newSong);

    res.status(201).send({
      success: "true",
      message: successMesseges.songAdded,
      result: newSong,
    });
  } catch (error) {
    res.status(500).send({
      success: "false",
      error: error.message,
    });
  }
});

app.post("/songs/:name", async (req, res) => {
  try {
    const oldName = req.params.name.toLowerCase();
    const { name: newName } = req.body;

    if (!newName) {
      res.status(400).send(errorMessages.missingSongName);
    }

    const index = songs.findIndex(
      (songs) => songs.name.toLowerCase() === oldName
    );

    if (index !== -1) {
      songs[index].name = newName;
      return res.send({
        success: "true",
        message: successMesseges.songUpdated,
        result: songs,
      });
    }

    songs.push({ name: newName });
    res.status(200).send({
      success: "true",
      message: successMesseges.songAdded,
      result: songs,
    });
  } catch (error) {
    res.status(500).send({
      success: "false",
      error: error.message,
    });
  }
});

app.delete("/songs", async (_req, res) => {
  try {
    if (songs.length === 0) {
      res.send(errorMessages.noSongs);
    }
    songs.length = 0;
    res.send({
      success: "true",
      message: successMesseges.allSongDeleted,
      result: songs,
    });
  } catch (error) {
    res.status(500).send({
      success: "false",
      error: error.message,
    });
  }
});

app.delete("/songs/:name", async (req, res) => {
  try {
    const name = req.params.name.toLowerCase();
    const initialLength = songs.length;

    songs = songs.filter((songs) => songs.name.toLowerCase() !== name);

    if (songs.length === initialLength) {
      return res.status(404).send(errorMessages.songNotFound);
    }

    res.send({
      success: "true",
      message: successMesseges.songDeleted,
      result: songs,
    });
  } catch (error) {
    res.status(500).send({
      success: "false",
      error: error.message,
    });
  }
});

app.put("/songs", async (req, res) => {
  try {
    const { songs: newSongs } = req.body;

    if (!Array.isArray(newSongs)) {
      return res.status(400).send(errorMessages.invalidFormat);
    }

    songs = newSongs;
    res.send({
      success: "true",
      message: successMesseges.songReplaced,
      result: songs,
    });
  } catch (error) {
    res.status(500).send({
      success: "false",
      error: error.message,
    });
  }
});

app.put("/songs/:name", async (req, res) => {
  try {
    const oldName = req.params.name.toLowerCase();
    const { name: newName, artist: newArtist, year: newYear } = req.body;

    if (!newName || !newArtist || !newYear) {
      return res.status(400).send(errorMessages.missingSongData);
    }

    const index = songs.findIndex(
      (song) => song.name.toLowerCase() === oldName
    );

    if (index === -1) {
      return res.status(404).send(errorMessages.songNotFound);
    }

    songs[index] = {
      name: newName,
      artist: newArtist,
      year: newYear,
    };

    res.send({
      success: "true",
      message: successMesseges.songUpdated,
      result: songs[index],
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
