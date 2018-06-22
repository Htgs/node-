// https://github.com/alsotang/node-lessons/tree/master/lesson3
// 简单的爬虫
// superagent获取请求网站信息
// cheerio处理网页文本中的标签元素
const express = require('express');
const superagent = require('superagent');
const cheerio = require('cheerio');

const app = new express();

app.get('/', function(req, res, next) {
	superagent.get('https://cnodejs.org/')
		.end(function (err, sres) {
			if (err) {
				throw err;
			}
			console.log(sres);
			let $ = cheerio.load(sres.text);
			let items = [];
			$('#topic_list .topic_title').each(function(idx, element) {
				let $element = $(element);
				items.push({
					title: $element.attr('title'),
					href: $element.attr('href'),
				})
			});
			// res.send(sres.text);
			res.send(items);
		});
});

app.listen(3000, function() {
	console.log('http://localhost:3000');
});
