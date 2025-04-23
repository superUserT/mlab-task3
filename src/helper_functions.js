const fs = require("fs");
const path = require("path");
const { fileErrors } = require("./objects.js");
const saveDir = path.join(__dirname, "../json_files");
const { movies, series, songs } = require("./objects.js");

function createMoviesJson() {
  try {
    if (!fs.existsSync(saveDir)) {
      fs.mkdirSync(saveDir);
    }

    const moviesFilepath = path.join(saveDir, "movies.json");
    const currentContent = fs.existsSync(moviesFilepath)
      ? fs.readFileSync(moviesFilepath, "utf8")
      : null;
    const newContent = JSON.stringify(movies, null, 2);

    if (currentContent !== newContent) {
      fs.writeFileSync(moviesFilepath, newContent);
    }
  } catch (error) {
    throw new Error(fileErrors.moviesFileNotCreated);
  }
}

function createSeriesJson() {
  try {
    if (!fs.existsSync(saveDir)) {
      fs.mkdirSync(saveDir);
    }

    const seriesFilepath = path.join(saveDir, "series.json");
    const currentContent = fs.existsSync(seriesFilepath)
      ? fs.readFileSync(seriesFilepath, "utf8")
      : null;
    const newContent = JSON.stringify(series, null, 2);

    if (currentContent !== newContent) {
      fs.writeFileSync(seriesFilepath, newContent);
    }
  } catch (error) {
    throw new Error(fileErrors.seriesFileNotCreated);
  }
}

function createSongsJson() {
  try {
    if (!fs.existsSync(saveDir)) {
      fs.mkdirSync(saveDir);
    }

    const songsFilepath = path.join(saveDir, "songs.json");
    const currentContent = fs.existsSync(songsFilepath)
      ? fs.readFileSync(songsFilepath, "utf8")
      : null;
    const newContent = JSON.stringify(songs, null, 2);

    if (currentContent !== newContent) {
      fs.writeFileSync(songsFilepath, newContent);
    }
  } catch (error) {
    throw new Error(fileErrors.songsFileNotCreated);
  }
}

function saveMoviesToJson() {
  try {
    const moviesFilepath = path.join(saveDir, "movies.json");
    fs.writeFileSync(moviesFilepath, JSON.stringify(movies, null, 2));
  } catch (error) {
    throw new Error(fileErrors.moviesFileNotCreated);
  }
}

function saveSeriesToJson() {
  try {
    const seriesFilepath = path.join(saveDir, "series.json");
    fs.writeFileSync(seriesFilepath, JSON.stringify(series, null, 2));
  } catch (error) {
    throw new Error(fileErrors.seriesFileNotCreated);
  }
}

function saveSongsToJson() {
  try {
    const songsFilepath = path.join(saveDir, "songs.json");
    fs.writeFileSync(songsFilepath, JSON.stringify(songs, null, 2));
  } catch (error) {
    throw new Error(fileErrors.songsFileNotCreated);
  }
}

module.exports = {
  createMoviesJson,
  createSeriesJson,
  createSongsJson,
  saveMoviesToJson,
  saveSeriesToJson,
  saveSongsToJson,
};
