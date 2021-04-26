'use strict';

const express = require('express');
var request = require('sync-request');
var https = require('https');
var urlList = [];
const line = require('@line/bot-sdk');
const { WSAEHOSTUNREACH } = require('constants');
const { createCipher } = require('crypto');
const PORT = process.env.PORT || 3000;

const config = {
	channelSecret: '8e5808bb7dfbbdd9fdb004244d338885',
	channelAccessToken: '/YNMphMKCbCMUlvnMm0588AcSZT16/W3LjSXGLgZ9z2Pj1qiR0luMpiL0uogv3T04nFL16WadXGaI87g4gTr+Nyai0VrH/CoCtCbBRvkevpNJoqZ0oy3yZnuBa0GjKHb1HlYmrSxakEqV3Pp7hTm1QdB04t89/1O/w1cDnyilFU='
};

const app = express();

app.get('/', (req, res) => res.send('Hello LINE BOT!(GET)')); //ブラウザ確認用(無くても問題ない)
app.post('/webhook', line.middleware(config), (req, res) => {
	console.log(req.body.events);

	//ここのif分はdeveloper consoleの"接続確認"用なので削除して問題ないです。
	if (req.body.events[0].replyToken === '00000000000000000000000000000000' && req.body.events[1].replyToken === 'ffffffffffffffffffffffffffffffff') {
		res.send('Hello LINE BOT!(POST)');
		console.log('疎通確認用');
		return;
	}

	Promise
		.all(req.body.events.map(handleEvent))
		.then()
});

const client = new line.Client(config);

async function handleEvent(event) {
	if (event.type !== 'message' || event.message.type !== 'text') {
		return Promise.resolve(null);
	}

	var receivedText = event.message.text;

	urlList = putToUrlList(receivedText);

	setTimeout(() => {
		console.log('MAIN: ' + toString(urlList[0]) + " " + urlList.length);
	
		if(urlList.length === 0) {
			return client.replyMessage(event.replyToken, {
				type: 'text',
				text: '指定された名前のカードが見つかりませんでした。 ' + toString(urlList.length)
			});
		}
	
		//urlListの要素数ごとに場合分けして書くと数が膨大になるので、これもforかなんかでうまくまとめられるように
		if(urlList.length === 1) {
			return client.replyMessage(event.replyToken, [{
				type: 'image',
				originalContentUrl: urlList[0] + '.jpg',
				previewImageUrl: urlList[0] + '.jpg'
			}, {
				type: 'text',
				text: request('GET', urlList[0] + '.txt').getBody().toString()
			}, {
				type: 'text',
				text: receivedText + 'の相場: ' + 'https://www.mercari.com/jp/search/?sort_order=price_asc&keyword=' + decodeURI(receivedText) + '&category_root=1328&category_child=82&category_grand_child%5B1289%5D=1&brand_name=&brand_id=&size_group=&price_min=&price_max='
			}
			]);
		}
		return client.replyMessage(event.replyToken, {
			type: 'text',
			text: '該当なし'
		});

	}, 200);
}

function putToUrlList(receivedText) {
	//ぐちゃぐちゃだからforで回す
	https.get('https://zobio.github.io/image/pokemon-card/regulation_c/' + encodeURI(receivedText) + '/1.jpg', function (res) {
		if (res.statusCode === 200)
			urlList.push('https://zobio.github.io/image/pokemon-card/regulation_c/' + encodeURI(receivedText) + '/1');
		console.log(res.statusCode + " " + urlList.length);
	});
	https.get('https://zobio.github.io/image/pokemon-card/regulation_c/' + encodeURI(receivedText) + '/2.jpg', function (res) {
		if (res.statusCode === 200)
			urlList.push('https://zobio.github.io/image/pokemon-card/regulation_c/' + encodeURI(receivedText) + '/2');
		console.log(res.statusCode + " " + urlList.length);
	});
	https.get('https://zobio.github.io/image/pokemon-card/regulation_c/' + encodeURI(receivedText) + '/3.jpg', function (res) {
		if (res.statusCode === 200)
			urlList.push('https://zobio.github.io/image/pokemon-card/regulation_c/' + encodeURI(receivedText) + '/3');
		console.log(res.statusCode + " " + urlList.length);
	});
	https.get('https://zobio.github.io/image/pokemon-card/regulation_d/' + encodeURI(receivedText) + '/1.jpg', function (res) {
		if (res.statusCode === 200)
			urlList.push('https://zobio.github.io/image/pokemon-card/regulation_d/' + encodeURI(receivedText) + '/1');
		console.log(res.statusCode + " " + urlList.length);
	});
	https.get('https://zobio.github.io/image/pokemon-card/regulation_d/' + encodeURI(receivedText) + '/2.jpg', function (res) {
		if (res.statusCode === 200)
			urlList.push('https://zobio.github.io/image/pokemon-card/regulation_d/' + encodeURI(receivedText) + '/2');
		console.log(res.statusCode + " " + urlList.length);
	});
	https.get('https://zobio.github.io/image/pokemon-card/regulation_d/' + encodeURI(receivedText) + '/3.jpg', function (res) {
		if (res.statusCode === 200)
			urlList.push('https://zobio.github.io/image/pokemon-card/regulation_d/' + encodeURI(receivedText) + '/3');
		console.log(res.statusCode + " " + urlList.length);
	});
	https.get('https://zobio.github.io/image/pokemon-card/regulation_e/' + encodeURI(receivedText) + '/1.jpg', function (res) {
		if (res.statusCode === 200)
			urlList.push('https://zobio.github.io/image/pokemon-card/regulation_e/' + encodeURI(receivedText) + '/1');
		console.log(res.statusCode + " " + urlList.length);
	});
	https.get('https://zobio.github.io/image/pokemon-card/regulation_e/' + encodeURI(receivedText) + '/2.jpg', function (res) {
		if (res.statusCode === 200)
			urlList.push('https://zobio.github.io/image/pokemon-card/regulation_e/' + encodeURI(receivedText) + '/2');
		console.log(res.statusCode + " " + urlList.length);
	});
	https.get('https://zobio.github.io/image/pokemon-card/regulation_e/' + encodeURI(receivedText) + '/3.jpg', function (res) {
		if (res.statusCode === 200)
			urlList.push('https://zobio.github.io/image/pokemon-card/regulation_e/' + encodeURI(receivedText) + '/3');
		console.log(res.statusCode + " " + urlList.length);
	});
		return urlList;
}

(process.env.NOW_REGION) ? module.exports = app : app.listen(PORT);
console.log(`Server running at ${PORT}`);