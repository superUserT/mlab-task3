const fs = require("fs");
const path = require("path");
const { fileErrors } = require("./objects.js");
const saveDir = path.join(__dirname, "../json_files");

function initializeJsonFiles() {
  try {
    if (!fs.existsSync(saveDir)) {
      fs.mkdirSync(saveDir, { recursive: true });
    }

    const files = {
      "movies.json": [],
      "series.json": [],
      "songs.json": [],
    };

    Object.entries(files).forEach(([filename, defaultContent]) => {
      const filepath = path.join(saveDir, filename);
      if (!fs.existsSync(filepath)) {
        fs.writeFileSync(filepath, JSON.stringify(defaultContent, null, 2));
      }
    });
  } catch (error) {
    console.error("Failed to initialize JSON files:", error);
    throw error;
  }
}

function getMoviesFromJson() {
  try {
    const moviesFilepath = path.join(saveDir, "movies.json");
    if (!fs.existsSync(moviesFilepath)) {
      return [];
    }
    const content = fs.readFileSync(moviesFilepath, "utf8");
    return JSON.parse(content);
  } catch (error) {
    console.error("Error reading movies file:", error);
    return [];
  }
}

function saveMoviesToJson(movies) {
  try {
    const moviesFilepath = path.join(saveDir, "movies.json");
    fs.writeFileSync(moviesFilepath, JSON.stringify(movies, null, 2));
    return true;
  } catch (error) {
    console.error("Error saving movies file:", error);
    throw new Error(fileErrors.moviesFileNotCreated);
  }
}

function getSeriesFromJson() {
  try {
    const seriesFilepath = path.join(saveDir, "series.json");
    if (!fs.existsSync(seriesFilepath)) {
      return [];
    }
    const content = fs.readFileSync(seriesFilepath, "utf8");
    return JSON.parse(content);
  } catch (error) {
    console.error("Error reading series file:", error);
    return [];
  }
}

function saveSeriesToJson(series) {
  try {
    const seriesFilepath = path.join(saveDir, "series.json");
    fs.writeFileSync(seriesFilepath, JSON.stringify(series, null, 2));
    return true;
  } catch (error) {
    console.error("Error saving series file:", error);
    throw new Error(fileErrors.seriesFileNotCreated);
  }
}

function getSongsFromJson() {
  try {
    const songsFilepath = path.join(saveDir, "songs.json");
    if (!fs.existsSync(songsFilepath)) {
      return [];
    }
    const content = fs.readFileSync(songsFilepath, "utf8");
    return JSON.parse(content);
  } catch (error) {
    console.error("Error reading songs file:", error);
    return [];
  }
}

function saveSongsToJson(songs) {
  try {
    const songsFilepath = path.join(saveDir, "songs.json");
    fs.writeFileSync(songsFilepath, JSON.stringify(songs, null, 2));
    return true;
  } catch (error) {
    console.error("Error saving songs file:", error);
    throw new Error(fileErrors.songsFileNotCreated);
  }
}

module.exports = {
  initializeJsonFiles,
  getMoviesFromJson,
  saveMoviesToJson,
  getSeriesFromJson,
  saveSeriesToJson,
  getSongsFromJson,
  saveSongsToJson,
};
