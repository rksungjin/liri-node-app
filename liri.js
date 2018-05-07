require("dotenv").config();

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require('fs');

var keys = require('./keys.js');

var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

// console.log(client);
// console.log(spotify);

var task = process.argv[2];
var secondTask = process.argv[3];

if (task === "my-tweets") {
  console.log("Tweet on!");
  showTweets();
}
if (task === "spotify-this-song") {
  console.log("New hit coming your way!");
  spotifyMe();
}
if (task === "movie-this") {
  console.log("Fun movies!");
  showMovie();
}
if (task === "do-what-it-says") {
  console.log("Here you go!");
  readSong();
}
  // var client = new twitter({
	// 	consumer_key: keys.twitterKeys.consumer_key,
	// 	consumer_secret: keys.twitterKeys.consumer_secret,
	// 	access_token_key: keys.twitterKeys.access_token_key,
  // 	access_token_secret: keys.twitterKeys.access_token_secret
function showTweets() {

  var tweets = [];

  var params = {
    screen_name: 'rk_sungjin',
    //count: 20
  };
  
  client.get('statuses/user_timeline', function(error, tweet, response) {
    if (!error) {
      tweets.push(tweet);
      console.log(tweets);
    }
  });

  }
  
function spotifyMe() {
  var searchTrack;
	if(secondTask === undefined){
		searchTrack = "What's My Age Again?";
	}else{
		searchTrack = secondTask;
	}
	
	spotify.search({type:'track', query:searchTrack}, function(err,data){
  if(err){
      console.log('Error occurred: ' + err);
      return;
  }else{
      console.log(data.tracks);
      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      console.log("Song: " + data.tracks.items[0].name);
      console.log("Album: " + data.tracks.items[0].album.name);
      console.log("Preview Here: " + data.tracks.items[0].preview_url);
	    }
	});
}

function showMovie() {
  var movieTitle;

  if (secondTask === undefined) {

    movieTitle = "Mr. Nobody";
  }
  else {
    movieTitle = secondTask;
  };

  var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";
  console.log(queryUrl);
  
  request(queryUrl, function(error, response, body) {
  
    if (!error && response.statusCode === 200) {
  console.log(JSON.parse(body));
  console.log("Title: " + JSON.parse(body).Title);
  console.log("Release Year: " + JSON.parse(body).Year);
  console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
  console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings);
  console.log("Country: " + JSON.parse(body).Country);
  console.log("language: " + JSON.parse(body).Language);
  console.log("Plot: " + JSON.parse(body).Plot);
  console.log("Actors: " + JSON.parse(body).Actors);
    }
  });
}

function readSong() {

fs.readFile("random.txt", "utf8", function(error, data) {

  if (error) {
    return console.log(error);
  }
  console.log(data);

	spotify.search({type:'track', query:data}, function(err,data){
    if(err){
  console.log('Error occurred: ' + err);
  return;
}
  else{
  console.log(data.tracks);
}
  })
})

};



  // if(task === `my-tweets`) {
  //   //getTweets();
  //   console.log("Came back from 3-1");
  // } else {
  //   console.log("I don't know this task.");
  // }

