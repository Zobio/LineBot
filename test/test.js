var request = require('sync-request');

var response = request('GET', 'https://zobio.github.io/image/pokemon-card/regulation_e/' + encodeURI('ダクマ') + '/1.txt');

console.log(response.getBody().toString());