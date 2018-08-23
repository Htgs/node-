// https://juejin.im/post/58cf180b0ce4630057d6727c
for (var i = 0; i < 5; i++) {
	setTimeout((function (i) {
		console.log(new Date, i);
	})(i), 1000);
}
console.log(new Date, i);

// ----------------------------------------
let output = function (i) {
	setTimeout(function () {
		console.log(new Date, i);
	}, 1000);
}

for (var i = 0; i < 5; i++) {
	output(i)
}

console.log(new Date(), i);

for (var i = 0; i < 5; i++) {
	(function (j) {
		setTimeout(function () {
			console.log(new Date, j);
		}, 1000 * j);
	})(i)
}

setTimeout(function () {
	console.log(new Date, i);
}, 1000 * i);
//  ---------------------------------------
const tasks = [];
const output = (j) => new Promise((resolve) => {
	setTimeout(() => {
		console.log(new Date(), j);
		resolve();  // 这里一定要 resolve，否则代码不会按预期 work
	}, 1000 * j);   // 定时器的超时时间逐步增加
});

for (var i = 0; i < 5; i++) {
	tasks.push(output(i))
}

Promise.all(tasks).then(() => {
	setTimeout(function () {
		console.log(new Date(), i);
	}, 1000);
});
// -------------------------------------------------------
const sleep = (time) => new Promise((resolve) => {
	setTimeout(() => {
		resolve();
	}, time);
});
(async () => {
	for (var i = 0; i < 5; i++) {
		console.log(new Date(), i);
		await sleep(1000);
	}
	console.log(new Date(), i)
})()

// 模拟其他语言中的 sleep，实际上可以是任何异步操作
const sleep = (timeountMS) => new Promise((resolve) => {
	setTimeout(resolve, timeountMS);
});
(async () => {  // 声明即执行的 async 函数表达式
	for (var i = 0; i < 5; i++) {
		await sleep(1000);
		console.log(new Date, i);
	}
	await sleep(1000);
	console.log(new Date, i);
})();
