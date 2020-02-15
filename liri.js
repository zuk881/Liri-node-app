

// global variables and require modules needed for app
var fs = require("fs");
var moment = require('moment');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var axios = require("axios");
var inquirer = require("inquirer");
var input = process.argv;
var spotify = new Spotify(keys.spotify);

// Create a series of inquirer questions to get user info and direction
inquirer.prompt([

  {
    type: "input",
    name: "name",
    message: "What is your name?"
  },

  {
    type: "list",
    name: "doingWhat",
    message: "What would you like to do?",
    choices: ["", "spotify-this-song", "movie-this", "concert-this", "do-what-it-says"]
  },

  {
    type: "input",
    name: "choice",
    message: "Search parameters?"
  },

  {
    type: "confirm",
    message: "Are you sure:",
    name: "confirm",
    default: true
  }

  // function that gets inquirer inputs and sets them to variables for use in switch statements to determine next action  
]).then(function (user) {

  // falsy value check in case choice is undefined and if it is default = spotify-this-song  
  if (user.doingWhat) {
    user.doingWhat = user.doingWhat;
    // do something else
  } else {
    user.doingWhat = "spotify-this-song";
  }

  // If the user confirms, store values in variables 
  if (user.confirm) {
    var action = user.doingWhat;
    var search = user.choice;
  }

  // If the user doesn't confirm
  else {

    // console.log message if users fails to confirm  
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

    // falsy value check in case search is undefined and if it is search = default  
    if (search) {
      search = search;
      // do something else
    } else {
      search = "Mr Nobody";
    }

    // create variable to hold axios search parameters
    var queryUrl = "http://www.omdbapi.com/?t=" + search + "&plot=short&apikey=trilogy";

    // axios call to omdb based on user input
    axios.get(queryUrl).then(
      function (response) {

        //  falsy value check to see if response comes back undefined, and if it does console log sorry message
        if (response.data.Title) {
          response.data.Title = response.data.Title;
          // do something else
        } else {
          return console.log("Sorry " + user.name + "," + " we could not find any results");
        }

        // console.log movie search results  
        console.log("Here are your results " + user.name);
        console.log("Movie title is " + response.data.Title);
        console.log("Movie came out in " + response.data.Year);
        console.log("IMBD rating is " + response.data.Rated);
        console.log("The Rotten Tomatoes rating is " + response.data.Ratings[1].Value);
        console.log("Country where movie was produced is " + response.data.Country);
        console.log("Language of movie is " + response.data.Language);
        console.log("Plot of the movie is " + response.data.Plot);
        console.log("Actors in the movie are " + response.data.Actors);

      })
      .catch(function (error) {
        console.log(error);
      });
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

    // falsy value check in case search is undefined and if it is search = default  
    if (search) {
      search = search;
      // do something else
    } else {
      search = "Carrie Underwood";
    }

    // create variable to hold axios search parameters
    var queryUrl_1 = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp";

    // axios call to bands-in-town based on user input 
    axios.get(queryUrl_1)
      .then(function (response) {
        for (var i = 0; i < response.length; i++) {
        }

        //  falsy value check to see if response comes back undefined, and if it does console log sorry message
        if (response.data[i]) {
          response.data[i] = response.data[i];
          // do something else
        } else {
          return console.log("Sorry " + user.name + "," + " we could not find any results");
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

    // falsy value check in case search is undefined and if it is search = default  
    if (search) {
      search = search;
      // do something else
    } else {
      search = "The Sign";
    }

    // spotify search based on user input  
    spotify.search({ type: 'track', query: search, limit: 1 }, function (err, data) {
      if (!err) {
        for (var i = 0; i < data.tracks.items.length; i++) {
          var song = data.tracks.items[i];

          // console.log song info       
          console.log("Here are your results " + user.name);
          console.log("Artist is " + song.artists[0].name);
          console.log("Song is " + song.name);
          console.log("Preview link is " + song.preview_url);
          console.log("Album is " + song.album.name);
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
        // set variables to the 2 items in the array  
        var output1 = output[0];
        var output2 = output[1]
      }

      // check 1st item in the array and set search equal to 2nd item in the array, then call appropriate function
      if (output1 === "spotify-this-song") {
        search = output2;
        spotifyThis();
      } else if (output1 === "movie-this") {
        search = output2;
        movie();
      } else if (output1 === "concert-this") {
        search = output2;
        concert();
      } else {
        search = output2;
      }
    });
  }
  //############################################################################################################

});














