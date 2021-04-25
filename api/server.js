'use strict';

const express = require('express');
var request = require('sync-request');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;

const config = {
	channelSecret: '8e5808bb7dfbbdd9fdb004244d338885',
	channelAccessToken: '/YNMphMKCbCMUlvnMm0588AcSZT16/W3LjSXGLgZ9z2Pj1qiR0luMpiL0uogv3T04nFL16WadXGaI87g4gTr+Nyai0VrH/CoCtCbBRvkevpNJoqZ0oy3yZnuBa0GjKHb1HlYmrSxakEqV3Pp7hTm1QdB04t89/1O/w1cDnyilFU='
};

const app = express();

app.post('/webhook', line.middleware(config), (req, res) => {
	console.log(req.body.events);

	res.send('Hello LINE BOT!(POST)');
	console.log('疎通確認用');

	Promise
		.all(req.body.events.map(handleEvent))
		//.then((result) => res.json(result));
});

const client = new line.Client(config);

async function handleEvent(event) {
	if (event.type !== 'message' || event.message.type !== 'text') {
		return Promise.resolve(null);
	}

	var receivedText = event.message.text;

	var url = 'https://zobio.github.io/image/pokemon-card/regulation_e/';
	url += receivedText;
	url += '/1.jpg';
	console.log(url);
	console.log('https://zobio.github.io/image/pokemon-card/regulation_e/' + receivedText + '/1.txt')
	var rep = ''
	try{
		var response = request('GET', 'https://zobio.github.io/image/pokemon-card/regulation_e/' + encodeURI(receivedText) + '/1.txt');
		rep = response.getBody().toString();
	}catch(error){
		return client.replyMessage(event.replyToken, {
		type: 'text',
		text: '指定された名前のカードが見つかりませんでした。'
	});
	}

	return client.replyMessage(event.replyToken, [{
		type: 'image',
		originalContentUrl: encodeURI(url),
		previewImageUrl: encodeURI(url)
	}, {
		type: 'text',
		text: rep
	}, {
		type: 'text',
		text: receivedText + 'の相場: ' + 'https://www.mercari.com/jp/search/?sort_order=price_asc&keyword=' + decodeURI(receivedText) + '&category_root=1328&category_child=82&category_grand_child%5B1289%5D=1&brand_name=&brand_id=&size_group=&price_min=&price_max='
	}
	]);
}

(process.env.NOW_REGION) ? module.exports = app : app.listen(PORT);
console.log(`Server running at ${PORT}`);