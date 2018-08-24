// https://github.com/alsotang/node-lessons/tree/master/lesson6
// 学习使用测试框架 mocha : http://mochajs.org/
// 学习使用断言库 should : https://github.com/tj/should.js
// 学习使用测试率覆盖工具 istanbul : https://github.com/gotwarlost/istanbul
// 简单 Makefile 的编写 : http://blog.csdn.net/haoel/article/details/2886

// mocha必须按照在文件夹目录
// 测试命令 istanbul cover ./node_modules/mocha/bin/_mocha

// * 当 n === 0 时，返回 0；n === 1时，返回 1;
// * n > 1 时，返回 `fibonacci(n) === fibonacci(n-1) + fibonacci(n-2)`，如 `fibonacci(10) === 55`;
// * n 不可大于10，否则抛错，因为 Node.js 的计算性能没那么强。
// * n 也不可小于 0，否则抛错，因为没意义。
// * n 不为数字时，抛错。
var fibonacci = function (n) {
    if (typeof n !== 'number') {
        throw new Error('n必须为数字');
    }
    if (n < 0) {
        throw new Error('n不能小于0');
    }
    if (n === 0) {
        return 0;
    }
    if (n === 1) {
        return 1;
    }
    if (n > 10) {
        throw new Error('n不能大于10,因为 Node.js 的计算性能没那么强');
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
};

if (require.main === module) {
    var n = Number(process.argv[2]);
    console.log(`fibonacci(${n})is ${fibonacci(n)}`);
}

exports.fibonacci = fibonacci;
