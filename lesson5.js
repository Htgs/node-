// https://github.com/alsotang/node-lessons/tree/master/lesson5
const url = require('url');

// eventproxy处理并发请求
// superagent获取请求网站信息
// cheerio处理网页文本中的标签元素
const eventproxy = require('eventproxy');
const superagent = require('superagent');
const cheerio = require('cheerio');
const express = require('express');
const async = require("async");

const app = new express();

let cnodeUrl = 'https://cnodejs.org/';

app.get('/', function(req, res, next) {
    /* ---------------------------------------------------- 模仿例子代码start */
    // let urls = [];
    // for (let i = 0; i < 40; i++) {
    //     urls.push(`http://www.baidu.com/${i}`);
    // }
    // let count = 0;
    // function fetch(url) {
    //     let delay = parseInt(Math.random() * 1000000 % 2000, 10);
    //     count++;
    //     console.log(`现在的并发数${count}条，正在抓取${url}，耗时${delay}毫秒`);
    //     return new Promise(resolve => {
    //         setTimeout(function () {
    //             count--;
    //             resolve({body: url + ' html content'});
    //         }, delay);
    //     });
    // }
    // async.mapLimit(urls, 5, async function(url) {
    //     const response = await fetch(url);
    //     return response.body;
    // }, (err, results) => {
    //     if (err) throw err
    //     // results is now an array of the response bodies
    //     console.log(results)
    // });
    /* ---------------------------------------------------- 模仿例子代码end */
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
            // console.log(topicUrls);
            let ep = new eventproxy();
            ep.after('topic_html', topicUrls.length, function (topics) {
                // 在所有文件的异步执行结束后将被执行
                // 所有文件的内容都存在list数组中
                let result = topics.map(topic => {
                    let $t = cheerio.load(topic[1]);
                    return ({
                        title: $t('.topic_full_title').text().trim(),
                        href: topic[0],
                        comment1: $t('.reply_content').eq(0).text().trim(),
                    });
                });
                res.send(result);
            });

            let count = 0;
            function fetchUrl(url) {
                count++;
                return new Promise(resolve => {
                    console.log(`现在的并发数${count}条，正在抓取${url}`);
                    superagent.get(url)
                        .end(function (err, topicSres) {
                            if (err) {
                                throw err;
                            }
                            count--;
                            resolve([url, topicSres.text]);
                            // ep.emit('topic_html', [url, topicSres.text]);
                        })
                });
            }
            // ...or ES2017 async functions
            async.mapLimit(topicUrls, 5, async function(url) {
                const response = await fetchUrl(url);
                return response;
            }, (err, results) => {
                if (err) throw err;
                // results is now an array of the response bodies
                console.log(results);
                results.forEach(result => {
                    ep.emit('topic_html', result);
                });
            });
    	});
});

app.listen(3000, function() {
	console.log('http://localhost:3000');
});
