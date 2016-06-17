var http = require('http');
var fs = require('fs');

var salient = require('salient');
var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: 'tAc9Py4kzJ4uwdarpEdNW2KqQ',
  consumer_secret: 'F3twMUPMgECIW8uORpAGuczodDLqyN6Bf4COmTSllGZINqKL8T',
  access_token_key: '794488460-qSp3aLghHgpXs2S3REsPOpmXTvQbYeSetOEQXSl0',
  access_token_secret: 'RFGoXFwC4CIwxz40OePPEeYm77BNgwsm6Z51W6HIQRevC'
});
var analyser = new salient.sentiment.BayesSentimentAnalyser();
var tokenizer = new salient.tokenizers.TweetTokenizer();
var arttokenizer = new salient.tokenizers.ArticleTokenizer({ compressWhitespace: true });
var a = [];
var tweets = 0

client.stream('statuses/filter', {track: 'nike',language:'en'},  function(stream) {
  stream.on('data', function(tweet) {
  	var score = analyser.classify(arttokenizer.clean(tweet.text));
	
	console.log("Tweet:" +tweet.text);
	console.log("Tweet Score:" +score);    
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});


// var glossary = new salient.glossary.Glossary();
// glossary.parse("This is never going to be an awesome test");
// console.log(glossary.toJSON());

