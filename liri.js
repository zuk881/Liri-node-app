// require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var input = process.argv;
var action = input[2];
var movieName = "";

switch (action) {
  case "spotify-this-song":
    spotify();
    break;

  case "movie-this":
    movie()
    break;

  case "concert-this":
    concert();
    break;

  case "do-what-it-says":
    doWhat();
    break;
}
function movie() {
for (var i = 3; i < input.length; i++) {
  if (i > 3 && i < input.length) {
    movieName = movieName + " " + input[i];
  } else {
    movieName = input[i];
  }
}

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&plot=short&apikey=trilogy";
console.log(movieName)
axios.get(queryUrl).then(
  function (x) {
   disPlayMovie(x.data);
   
  });
}


function disPlayMovie(response) {
  console.log("Movie title is " + response.Title);
  console.log("Movie came out in " + response.Year);
  console.log("IMBD rating is " + response.Rated);
  console.log("The Rotten Tomatoes rating is " + response.Ratings[1].Value);
  console.log("Country where movie was produced is " + response.Country);
  console.log("Language of movie is " + response.Language);
  console.log("Plot of the movie is " + response.Plot);
  console.log("Actors in the movie are " + response.Actors);
}























  // var movieRes = [
  //   "Movie title is " + response.data.Title,
  //   "Movie came out in " + response.data.Year,
  //   "IMBD rating is " + response.data.Rated,
  //   "The Rotten Tomatoes rating is " + response.data.Ratings[1].Value,
  //   "Country where movie was produced is " + response.data.Country,
  //   "Language of movie is " + response.data.Language,
  //   "Plot of the movie is " + response.data.Plot,
  //   "Actors in the movie are " + response.data.Actors
  // ]

  // for (var i = 0; i < movieRes.length; i++) {


  // }