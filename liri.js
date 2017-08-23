var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require("fs");
var keys = require('./keys.js');

var inputOne = process.argv[2];

var client = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
});


var params = { screen_name: 'CasClairely', count: 20 };
function myTweets() {
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {

            for (var i = 0; i < tweets.length; i++) {
                var tweet = tweets[i].text;
                var tweetTime = tweets[i].created_at;

                console.log('*********');
                console.log('You tweeted: "' + tweet + '"');
                console.log('Created on: ' + tweetTime)
                console.log('*********');
            }
        } else {
            console.log(error);
        }
    });
};


function movieThis() {
    var movie = encodeURI(movieName);
    var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece";

    request(queryURL, function (error, response, body) {
        if(error) {
            console.log(error);
        };

        var info = JSON.parse(body);
        // console.log(info);
        console.log('*********************')
        console.log('*********************')
        console.log('Movie: ' + info.Title);
        console.log('*********************')
        console.log('Year: ' + info.Year);
        console.log('Rated: ' + info.Rated);
        console.log('Language: ' + info.Language);
        console.log('Country: ' + info.Country);
        console.log('DESCRIPTION:');
        console.log(info.Plot);
        console.log('*********************')
        console.log('*********************')
    });
};

function doWhatItSays() {

    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        } else {
            var dataArr = data.split(",")
            var command = dataArr[0];
            var song = dataArr[1];

            console.log("I would then spotify " + song)
        }

    })
}

switch (inputOne) {
    case "my-tweets":
        myTweets();
        break;

    case "spotify-this-song":
        var song = '';
        song = process.argv[3];
        if (process.argv[3] === undefined) {
            var song = "The Sign Ace of Base"
        }
        console.log("I would then put " + song + " into a function to spotify it.")
        break;

    case "movie-this":
        var restOfArgs = process.argv.splice(3, process.argv.length);
        var movieName = restOfArgs.join(" ");
        console.log(restOfArgs);
        if (movieName === "") {
            movieName = "Mr. Nobody"
        }
        movieThis();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;
    case "commands":
        console.log("\nmy-tweets\nspotify-this-song\nmovie-this\ndo-what-it-says");
        break;
}
