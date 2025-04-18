const { errorMessages } = require("./objects");

function checkMovies(movies) {
  if (movies.length === 0) {
    return errorMessages.noMovies;
  }
}

module.exports = { checkMovies };
