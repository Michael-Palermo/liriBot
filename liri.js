var keys = require('./keys.js');

var Twitter = require('twitter');

var spotify = require('node-spotify-api');

var fs = require("fs");

var request = require('request');

var myArgs = process.argv.slice(3);

var twitterUsername = process.argv.slice(2);

var thirdItem = process.argv[3];

var secondItem = process.argv[2];

var tweetKey = keys.twitterKeys;

var spotKey = keys.spotifyKeys;

// Variable - Initilize Spotify
var spotify = new spotify({
    id: spotKey.client_id,
    secret: spotKey.client_secret
  });

  // Variable - Initilize Twitter
var twitter = new Twitter({
    consumer_key: tweetKey.consumer_key,
    consumer_secret: tweetKey.consumer_secret,
    access_token_key: tweetKey.access_token_key,
    access_token_secret: tweetKey.access_token_secret
  });
  

if (secondItem === 'movie-this') {

    if (!thirdItem) {

        request('http://www.omdbapi.com/?t=snatch&plot=full&apikey=40e9cece', function(error, response, body) {


            if (!error && response.statusCode == 200) {

               //console.log(JSON.stringify(response, null, 2));

               var obj = JSON.parse(body);

                console.log(obj.Title); 
                console.log(obj.Year);
                console.log(obj.imdbRating);
                console.log(obj.Country);
                console.log(obj.Language);
                console.log(obj.Plot);
                console.log(obj.Actors);
                //need to go over with TA or Instructor to understand
                console.log(obj.Ratings[1].Value);
                console.log(obj.Website);
            }


        });

    } else {


        request('http://www.omdbapi.com/?t=' + thirdItem +'&plot=full&apikey=40e9cece', function(error, response, body) {


            if (!error && response.statusCode == 200) {

                // console.log(JSON.stringify(res, null, 2));
                var obj = JSON.parse(body);

                console.log(obj.Title); // Show the HTML for the Modulus homepage.
                console.log(obj.Year);
                console.log(obj.imdbRating);
                console.log(obj.Country);
                console.log(obj.Language);
                console.log(obj.Plot);
                console.log(obj.Actors);
                console.log(obj.Ratings[1]);
                console.log(obj.Website);
            }


        });

    }

}


if (secondItem === "my-tweets") {

    if (!thirdItem) {

        twitter.get('statuses/user_timeline', { include_entities: true, count: 20 },
            function(err, tweets, response) {
                if (err) {
                    console.log(err.toString());
                } else {

                    for (var i = 0; i < tweets.length; i++) {
                        console.log(JSON.stringify(tweets[i].text)),
                            // console.log(JSON.stringify(data[i].text, null, 2)); 
                            console.log('------------------------------------------')
                    }

                }
            });

    }

}

if (secondItem == "twitterHandle@") {

    twitter.get('statuses/user_timeline', { screen_name: thirdItem, count: 20 }, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(JSON.stringify(tweets[i].text));
                console.log('------------------------------------------')
            }

        }

    });

}



if (secondItem === "spotify-this-song") {

    var string = myArgs.join(" ");

        spotify.search({ type: 'track', query: string }, function(err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return; //from spotify npm docs
            } 
                
                
                var songInfo = data.tracks.items[0];
                console.log(songInfo);
                console.log(songInfo.name);
                console.log(songInfo.artists[0].name);
                console.log(songInfo.preview_url);
                console.log(songInfo.album.name);
            
        });
        } 

    



if (secondItem === "do-this") {

    fs.readFile('./random.txt', "utf8", (err, data) => {
        if (err) throw err;
        var read = data.split(",")

        console.log(read[1]);

        spotify.search({ type: 'track', query: read[1] }, function(err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return; //from spotify npm docs
            } else {

                var songInfo = data.tracks.items[0];
                console.log(songInfo.artists[0].name);
                console.log(songInfo.preview_url);
                console.log(songInfo.album.name);



            };
        });




    });

}