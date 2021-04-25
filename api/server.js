'use strict';

console.log('TEST');

const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;

const config = {
	channelSecret: '8e5808bb7dfbbdd9fdb004244d338885',
	channelAccessToken: '/YNMphMKCbCMUlvnMm0588AcSZT16/W3LjSXGLgZ9z2Pj1qiR0luMpiL0uogv3T04nFL16WadXGaI87g4gTr+Nyai0VrH/CoCtCbBRvkevpNJoqZ0oy3yZnuBa0GjKHb1HlYmrSxakEqV3Pp7hTm1QdB04t89/1O/w1cDnyilFU='
};

const app = express();

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
		.then((result) => res.json(result));
});

const client = new line.Client(config);

async function handleEvent(event) {
	if (event.type !== 'message' || event.message.type !== 'text') {
		return Promise.resolve(null);
	}

	var path = 'C:/Users/soshi/Desktop/LineBot';

	var nameFunc = require(path + '/api/fix_name.js');
	var receivedText = nameFunc.fix_name(event.message.text);

	var url = 'https://zobio.github.io/image/pokemon-card/regulation_e/';
	url += receivedText;
	url += '/1.jpg';
	console.log(url);
	console.log('https://zobio.github.io/image/pokemon-card/regulation_e/' + receivedText + '/1.txt')
	const fs = require('fs');
	var text = fs.readFileSync(encodeURI(path + '/image/pokemon-card/regulation_e/') + receivedText + '/1.txt', 'utf8');
	//ファイルが見つからなかった時の処理を追記する
	var lines = text.toString().split('¥n');
	var rep = '';
	for (var ln of lines) {
		rep += ln;
	}

	return client.replyMessage(event.replyToken, [{
		type: 'image',
		originalContentUrl : encodeURI(url), //ローカルでできる？できるなら変更
		previewImageUrl: encodeURI(url)
	},{
		type: 'text',
		text : rep
	}
	]);
}

(process.env.NOW_REGION) ? module.exports = app : app.listen(PORT);
console.log(`Server running at ${PORT}`);