// https://github.com/alsotang/node-lessons/tree/master/lesson10
// https://github.com/bestiejs/benchmark.js
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;
function int1(str) {
    return +str;
}
function int2(str) {
    return parseInt(str);
}
function int3(str) {
    return Number(str);
}

// add tests
suite.add('+ time', function() {
    int1('100');
})
.add('parseInt time', function() {
    int2('100');
})
.add('Number time', function() {
    int3('100');
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': true });