var request = require('request');

var response = '';

request('https://zobio.github.io/image/pokemon-card/regulation_e/' + encodeURI('ダクマ') + '1.txt', function (error, response, body) {
	response = body;
});

console.log(response);