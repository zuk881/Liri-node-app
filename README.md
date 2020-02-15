# LIRI_Bot
LIRI Bot LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface,
LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in 
parameters and gives you back data.
LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

## Overview 

This app is a command line interface program that uses Node.js with various NPM isntalled to ask the users a few questions,
and based on answers queries three different API's and console.logs the results. 
The API's used are,

* Spotify
* Bands in Town
* OMDB

Some of the technology involed to make app are JavaScript, Node.js, and Node packages from Spotify, Axios, Moment, DotENv, fs-node,
and inquirer.
*Overall this was a challenging project, from figuring out how to get the authorization keys from Spotify to work correctly, to bringing all the different functions together to get the application working smoothly. That being said this was also  a fun assignment. Seeing it all come together and work properly was very rewarding.

## Instructions

The app will start out by asking for your name. 
It will then present you with a list of choices of what it can do.

* spotify-this-song
* movie-this
* concert-this
* do-what-it-says

After you have chosen a task it will ask for search parameters.
If you have chosen "do-what-it-says" just enter past it.
It will then ask you to confirm, at which point it will query API chosen.
After getting results it will then display them on the command line.
If no search parameters are chosen it will search based on default search parameters.

* For "spotify-this song" Ace of Bass "The Sign".
* For "movie-this" "Mr. Nobody"
* For "concert-this" "Carrie Underwood"
* For "do-what-it-says" "I Want it That Way"

For do-what-it-says, it is running instructions in the random.txt file. *example* spotify-this-song, "Thunderstruck"
You can edit the first argument, to change what it does, or the second argument to change search parameters.

# Note

To be able to run this App you will need to provide your own .env file with Spotify ID and Secret.
 
 Spotify API keys

SPOTIFY_ID=<your Spotify_ID>

SPOTIFY_SECRET=<your Spotify_secret>

## This is a link to video demonstrating usage!
https://drive.google.com/file/d/1YHuMnPNlhwz3MZKJcG4Nny5R_8IBumNn/view
 
