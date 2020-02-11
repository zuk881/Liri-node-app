

// global variables and require modules needed for app
var fs = require("fs");
var moment = require('moment');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var axios = require("axios");
var inquirer = require("inquirer");
var input = process.argv;
var spotify = new Spotify(keys.spotify);

// Created a series of questions to get user info and direction
inquirer.prompt([
  
  {
    type: "input",
    name: "name",
    message: "Who are you?"
  },

  {
    type: "list",
    name: "doingWhat",
    message: "What would you like to do?",
    choices: ["", "spotify-this-song", "movie-this", "concert-this", "do-what-it-says"]
  },

  {
    type: "input",
    name: "search",
    message: "Search parameters?"
  },

  {
    type: "confirm",
    message: "Are you sure:",
    name: "confirm",
    default: true
  }

]).then(function (user) {

  // If the user confirms 
  if (user.confirm) {
    var action = user.doingWhat
    var search = user.search
  }

  // If the user doesn't confirm
  else {

    console.log("==============================================");
    console.log("");
    console.log("Maybe another time " + user.name);
    console.log("");
    console.log("==============================================");

  }

  // switch function to route which function to run depending on user choice
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

  // !display movie info function! =============================================================
  function movie() {

  // loop through search results to allow multiple word searches
    for (var i = 3; i < input.length; i++) {
      if (i > 3 && i < input.length) {
        search = search + " " + input[i];
      } else {
        search = input[i];
      }
    }

  // create variable to hold axios search parameters
    var queryUrl = "http://www.omdbapi.com/?t=" + search + "&plot=short&apikey=trilogy";

  // axios call to omdb based on user input
    axios.get(queryUrl).then(
      function (x) {
        disPlayMovie(x.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // function to display movie data
  function disPlayMovie(response) {
    console.log("Here are your results " + user.name);
    console.log("Movie title is " + response.Title);
    console.log("Movie came out in " + response.Year);
    console.log("IMBD rating is " + response.Rated);
    console.log("The Rotten Tomatoes rating is " + response.Ratings[1].Value);
    console.log("Country where movie was produced is " + response.Country);
    console.log("Language of movie is " + response.Language);
    console.log("Plot of the movie is " + response.Plot);
    console.log("Actors in the movie are " + response.Actors);
  }
  //=================================================================================================


  // !concert info function! ****************************************************************** 
  function concert() {

  // loop through search results to allow multiple word searches
    for (var i = 3; i < input.length; i++) {
      if (i > 3 && i < input.length) {
        search = search + " " + input[i];
      } else {
        search = input[i];
      }
    }

  // create variable to hold axios search parameters
    var queryUrl_1 = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp";
    
  // axios call to bands-in-town based on user input 
    axios.get(queryUrl_1)
      .then(function (response) {
        for (var i = 0; i < response.length; i++) {
        }

  // convert date from data to new format     
        var randomDate = response.data[i].datetime;
        var newDate = moment(randomDate).format('MM/DD/YYYY');
        
  // console.log artist data      
        console.log("Here are your results " + user.name);
        console.log("The artist is " + search);
        console.log("The venue name is " + response.data[i].venue.name);
        console.log("The venue city is " + response.data[i].venue.city);
        console.log("The venue date is " + newDate);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  //********************************************************************************************************


  // !spotify music info function! +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  function spotifyThis() {
    
  // loop through search results to allow multiple word searches
    for (var i = 3; i < input.length; i++) {
      if (i > 3 && i < input.length) {
        search = search + " " + input[i];
      } else {
        search = input[i];
      }
    }
   
  // spotify search based on user input  
    spotify.search({ type: 'track', query: search, limit: 1 }, function (err, data) {
      if (!err) {
        for (var i = 0; i < data.tracks.items.length; i++) {
          var song = data.tracks.items[i];
  
  // console.log song info       
          console.log("Here are your results " + user.name);
          console.log("Artist: " + song.artists[0].name);
          console.log("Song: " + song.name);
          console.log("Preview link: " + song.preview_url);
          console.log("Album: " + song.album.name);
          console.log("-----------------------");
        }
      } else {
        console.log('Error occurred.');
      }
    });
  }

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


  // !do-what-it-says function! #############################################################################
  function doWhat() {
    fs.readFile("random.txt", "utf8", function (err, data) {
      if (err) {
        return console.log(err);
      }

      // Break the string down by comma separation and store the contents into the output array.
      var output = data.split(",");
        
     // Loop Through the newly created output array
      for (var i = 0; i < output.length; i++) {
   
      }

     // grab the second item in the array and set it to search 
        search = output[1];
        spotifyThis();
     
    
    });
  }
  //############################################################################################################

});











