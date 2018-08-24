// https://github.com/alsotang/node-lessons/tree/master/lesson4
const url = require('url');

// eventproxy处理并发请求
// superagent获取请求网站信息
// cheerio处理网页文本中的标签元素
const eventproxy = require('eventproxy');
const superagent = require('superagent');
const cheerio = require('cheerio');
const express = require('express');

const app = new express();

let cnodeUrl = 'https://cnodejs.org/';

app.get('/', function(req, res, next) {
	superagent.get(cnodeUrl)
		.end(function (err, sres) {
			if (err) {
				throw err;
            }
			let $ = cheerio.load(sres.text);
			let topicUrls = [];
			$('#topic_list .topic_title').each(function(idx, element) {
				let $element = $(element);
                // $element.attr('href') 本来的样子是 /topic/542acd7d5d28233425538b04
                // 我们用 url.resolve 来自动推断出完整 url，变成
                // https://cnodejs.org/topic/542acd7d5d28233425538b04 的形式
                // 具体请看 http://nodejs.org/api/url.html#url_url_resolve_from_to 的示例
                let href = url.resolve(cnodeUrl, $element.attr('href'));
                topicUrls.push(href);
            });
            console.log(topicUrls);
            let ep = new eventproxy();
            ep.after('topic_html', topicUrls.length, function (topics) {
                // 在所有文件的异步执行结束后将被执行
                // 所有文件的内容都存在list数组中
                let result = topics.map(topic => {
                    let $t = cheerio.load(topic[1]);
                    // console.log($t('.topic_full_title'));
                    return ({
                        title: $t('.topic_full_title').text().trim(),
                        href: topic[0],
                        comment1: $t('.reply_content').eq(0).text().trim(),
                    });
                });
                // console.log(result);
                res.send(result);
            });
            topicUrls.forEach(function (topicUrl) {
                superagent.get(topicUrl)
                .end(function (err, res) {
                    // console.log('fetch ' + topicUrl + ' successful');
                    ep.emit('topic_html', [topicUrl, res.text]);
                });
            });
		});
});

app.listen(3000, function() {
	console.log('http://localhost:3000');
});
