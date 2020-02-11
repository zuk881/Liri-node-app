console.log('this is loaded');
require('dotenv').config({ debug: process.env.DEBUG });
exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};