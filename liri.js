

require('dotenv').config({ debug: process.env.DEBUG });

var moment = require('moment');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var axios = require("axios");
var input = process.argv;
var action = input[2];
var movieName = "The Matrix";
var spot = "";
var spotify = new Spotify(keys.spotify);
var artist = "Carrie Underwood";

switch (action) {
  case "spotify-this-song":
    spotifyThis();
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

  axios.get(queryUrl).then(
    function (x) {
      disPlayMovie(x.data);
    })
    .catch(function (error) {
      console.log(error);
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


function concert() {
  for (var i = 3; i < input.length; i++) {
    if (i > 3 && i < input.length) {
      artist = artist + " " + input[i];
    } else {
      artist = input[i];
    }
  }

  var queryUrl_1 = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

  console.log(artist)
  axios.get(queryUrl_1)
    .then(function (response) {
      for (var i = 0; i < response.length; i++) {

      }
      var randomDate = response.data[i].datetime;
      var newDate = moment(randomDate).format('MM/DD/YYYY');
      console.log("The venue name is " + response.data[i].venue.name);
      console.log("The venue city is " + response.data[i].venue.city);
      console.log("The venue date is " + newDate);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function spotifyThis() {
  for (var i = 3; i < input.length; i++) {
    if (i > 3 && i < input.length) {
      spot = spot + " " + input[i];
    } else {
      spot = input[i];
    }
  }

  var queryUrl_1 = "https://api.spotify.com/";
  axios.get(queryUrl_1)
    .then(function (x) {
      console.log(x.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}















