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
  { name: "Feeling Like Cryril", artist: "WxymeDeneiro", year: 2024 },
  { name: "Isibaya", artist: "WxymeDeneiro", year: 2023 },
  { name: "Young kupha", artist: "Brotherkupha", year: 2024 },
  { name: "How I feel", artist: "BrotherKupha", year: 2023 },
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
  noSongs: "No Songs in library",
  songNotFound: "Song title not found",
  missingSongTitle: "Song Title Required",
  songAlreadyExists: "Song title Already exists in library",
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
  songAdded: "Song added to Library.",
  allSongDeleted: "All songs Deleted.",
  songDeleted: "Song Deleted.",
  songReplaced: "Song library Replaced.",
  songUpdated: "Song updated.",
};

module.exports = { movies, series, songs, errorMessages, successMesseges };
