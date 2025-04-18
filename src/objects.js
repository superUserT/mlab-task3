const movies = [
  { title: "The Godfather" },
  { title: "The Dark Knight" },
  { title: "Jerusalema" },
  { title: "tsotsi" },
  { title: "The Lord of the Rings" },
  { title: "up!" },
];
const series = [
  { title: "Game of Thrones" },
  { title: "The Wire" },
  { title: "Shaka" },
  { title: "Generations" },
  { title: "Devil May Cry" },
];
const songs = [
  { songName: "Feeling Like Cryril", artist: "WxymeDeneiro" },
  { songName: "Isibaya", artist: "WxymeDeneiro" },
  { songName: "Young kupha", artist: "Brotherkupha" },
  { songName: "How I feel", artist: "BrotherKupha" },
];

const errorMessages = {
  noMovies: "No Movies in library",
  movieNotFound: "Movie not found",
  missingTitle: "Movie Title Required",
  movieAlreadyExists: "Movie Already exists in library",
  invalidFormat: "Invalid Format entered",

  noSeries: "No Series in library",
  seriesNotFound: "Series title not found",
  missingSeriesTitle: "Series Title Required",
  seriesAlreadyExists: "Series title Already exists in library",
};

const successMesseges = {
  movieAdded: "Movie added to Library.",
  allMoviesDeleted: "All movies Deleted.",
  movieDeleted: "Movie Deleted.",
  moviesReplaced: "Movies library Replaced.",
  movieUpdated: "Movie updated.",
  seriesAdded: "Series added to Library.",
  allSeriessDeleted: "All series Deleted.",
  seriesDeleted: "Series Deleted.",
  seriesReplaced: "Series library Replaced.",
  seriesUpdated: "Series updated.",
};

module.exports = { movies, series, songs, errorMessages, successMesseges };
