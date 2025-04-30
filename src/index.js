const express = require("express");
const path = require("path");
const app = express();
const { errorMessages, successMesseges } = require("./objects.js");
const {
  initializeJsonFiles,
  getMoviesFromJson,
  saveMoviesToJson,
  getSeriesFromJson,
  saveSeriesToJson,
  getSongsFromJson,
  saveSongsToJson,
} = require("./helper_functions.js");

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

initializeJsonFiles();

app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
  });
});

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

app.get("/movies", (_req, res) => {
  try {
    const movies = getMoviesFromJson();

    if (movies.length === 0) {
      return res.send(errorMessages.noMovies);
    }

    res.status(200).send({
      success: true,
      result: movies,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
});

app.get("/movies/:title", async (req, res) => {
  try {
    const title = req.params.title.toLowerCase();
    const movies = getMoviesFromJson();
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
      return res.status(400).send(errorMessages.missingTitle);
    }

    const movies = getMoviesFromJson();
    const index = movies.findIndex(
      (movie) => movie.title.toLowerCase() === oldTitle
    );

    if (index !== -1) {
      movies[index].title = newTitle;
      saveMoviesToJson(movies);

      return res.send({
        success: true,
        message: successMesseges.movieUpdated,
        result: movies,
      });
    }

    movies.push({ title: newTitle });
    saveMoviesToJson(movies);

    res.status(200).send({
      success: true,
      message: successMesseges.movieAdded,
      result: movies,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
});

app.delete("/movies", async (_req, res) => {
  try {
    const movies = getMoviesFromJson();

    if (movies.length === 0) {
      return res.send(errorMessages.noMovies);
    }

    saveMoviesToJson([]);

    res.send({
      success: true,
      message: successMesseges.allMoviesDeleted,
      result: [],
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
});

app.delete("/movies/:title", async (req, res) => {
  try {
    const title = req.params.title.toLowerCase();
    const movies = getMoviesFromJson();
    const initialLength = movies.length;

    const updatedMovies = movies.filter(
      (movie) => movie.title.toLowerCase() !== title
    );

    if (updatedMovies.length === initialLength) {
      return res.status(404).send(errorMessages.movieNotFound);
    }

    saveMoviesToJson(updatedMovies);

    res.send({
      success: true,
      message: successMesseges.movieDeleted,
      result: updatedMovies,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
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

    saveMoviesToJson(newMovies);

    res.send({
      success: true,
      message: successMesseges.moviesReplaced,
      result: newMovies,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
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

    const movies = getMoviesFromJson();
    const index = movies.findIndex(
      (movie) => movie.title.toLowerCase() === oldTitle
    );

    if (index === -1) {
      return res.status(404).send(errorMessages.movieNotFound);
    }

    movies[index].title = newTitle;
    saveMoviesToJson(movies);

    res.send({
      success: true,
      message: successMesseges.movieUpdated,
      result: movies,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
});

app.get("/series", (_req, res) => {
  try {
    const series = getSeriesFromJson();

    if (series.length === 0) {
      return res.send(errorMessages.noSeries);
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

app.get("/series/:title", async (req, res) => {
  try {
    const title = req.params.title.toLowerCase();
    const allSeries = getSeriesFromJson();
    const seriesItem = allSeries.find((s) => s.title.toLowerCase() === title);

    if (!seriesItem) {
      return res.status(404).send({
        success: false,
        message: errorMessages.seriesNotFound,
      });
    }

    res.status(200).send({
      success: true,
      result: seriesItem,
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
      return res.status(400).send(errorMessages.missingSeriesTitle);
    }

    const allSeries = getSeriesFromJson();
    const index = allSeries.findIndex(
      (s) => s.title.toLowerCase() === oldTitle
    );

    if (index !== -1) {
      allSeries[index].title = newTitle;
      saveSeriesToJson(allSeries);

      return res.send({
        success: true,
        message: successMesseges.seriesUpdated,
        result: allSeries,
      });
    }

    allSeries.push({ title: newTitle });
    saveSeriesToJson(allSeries);

    res.status(200).send({
      success: true,
      message: successMesseges.seriesAdded,
      result: allSeries,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
});

app.delete("/series", async (_req, res) => {
  try {
    const series = getSeriesFromJson();

    if (series.length === 0) {
      return res.send(errorMessages.noSeries);
    }

    saveSeriesToJson([]);

    res.send({
      success: true,
      message: successMesseges.allSeriessDeleted,
      result: [],
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
});

app.delete("/series/:title", async (req, res) => {
  try {
    const title = req.params.title.toLowerCase();
    const allSeries = getSeriesFromJson();
    const initialLength = allSeries.length;

    const updatedSeries = allSeries.filter(
      (s) => s.title.toLowerCase() !== title
    );

    if (updatedSeries.length === initialLength) {
      return res.status(404).send(errorMessages.seriesNotFound);
    }

    saveSeriesToJson(updatedSeries);

    res.send({
      success: true,
      message: successMesseges.seriesDeleted,
      result: updatedSeries,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
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

    saveSeriesToJson(newSeries);

    res.send({
      success: true,
      message: successMesseges.seriesReplaced,
      result: newSeries,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
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

    const allSeries = getSeriesFromJson();
    const index = allSeries.findIndex(
      (s) => s.title.toLowerCase() === oldTitle
    );

    if (index === -1) {
      return res.status(404).send(errorMessages.seriesNotFound);
    }

    allSeries[index].title = newTitle;
    saveSeriesToJson(allSeries);

    res.send({
      success: true,
      message: successMesseges.seriesUpdated,
      result: allSeries,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
});

app.get("/songs", (_req, res) => {
  try {
    const songs = getSongsFromJson();

    if (songs.length === 0) {
      return res.send(errorMessages.noSongs);
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

app.get("/songs/:name", async (req, res) => {
  try {
    const name = req.params.name.toLowerCase();
    const songs = getSongsFromJson();
    const song = songs.find((song) => song.name.toLowerCase() === name);

    if (!song) {
      return res.status(404).send({
        success: false,
        message: errorMessages.songNotFound,
      });
    }

    res.status(200).send({
      success: true,
      result: song,
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
        success: false,
        message: errorMessages.missingSongData,
      });
    }

    const songs = getSongsFromJson();
    const exists = songs.find(
      (song) => song.name.toLowerCase() === name.toLowerCase()
    );

    if (exists) {
      return res.status(409).send({
        success: false,
        message: errorMessages.songAlreadyExists,
      });
    }

    const newSong = { name, artist, year };
    songs.push(newSong);
    saveSongsToJson(songs);

    res.status(201).send({
      success: true,
      message: successMesseges.songAdded,
      result: newSong,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
});

app.post("/songs/:name", async (req, res) => {
  try {
    const oldName = req.params.name.toLowerCase();
    const { name: newName } = req.body;

    if (!newName) {
      return res.status(400).send(errorMessages.missingSongTitle);
    }

    const songs = getSongsFromJson();
    const index = songs.findIndex(
      (song) => song.name.toLowerCase() === oldName
    );

    if (index !== -1) {
      songs[index].name = newName;
      saveSongsToJson(songs);

      return res.send({
        success: true,
        message: successMesseges.songUpdated,
        result: songs,
      });
    }

    songs.push({ name: newName });
    saveSongsToJson(songs);

    res.status(200).send({
      success: true,
      message: successMesseges.songAdded,
      result: songs,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
});

app.delete("/songs", async (_req, res) => {
  try {
    const songs = getSongsFromJson();

    if (songs.length === 0) {
      return res.send(errorMessages.noSongs);
    }

    saveSongsToJson([]);

    res.send({
      success: true,
      message: successMesseges.allSongDeleted,
      result: [],
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
});

app.delete("/songs/:name", async (req, res) => {
  try {
    const name = req.params.name.toLowerCase();
    const songs = getSongsFromJson();
    const initialLength = songs.length;

    const updatedSongs = songs.filter(
      (song) => song.name.toLowerCase() !== name
    );

    if (updatedSongs.length === initialLength) {
      return res.status(404).send(errorMessages.songNotFound);
    }

    saveSongsToJson(updatedSongs);

    res.send({
      success: true,
      message: successMesseges.songDeleted,
      result: updatedSongs,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
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

    saveSongsToJson(newSongs);

    res.send({
      success: true,
      message: successMesseges.songReplaced,
      result: newSongs,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
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

    const songs = getSongsFromJson();
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

    saveSongsToJson(songs);

    res.send({
      success: true,
      message: successMesseges.songUpdated,
      result: songs[index],
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Multimedia app listening on port ${port}`);
});

module.exports = { app };
