var https = require('https');
var urlList = [];
var request = require('sync-request');
var receivedText = 'ヤヤコマ';
var url = 'https://zobio.github.io/image/pokemon-card/regulation_e/' + encodeURI('ヤヤコマ') + '/1';
console.log(request('GET', url + '.txt').getBody().toString());