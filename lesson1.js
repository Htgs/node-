const express = require('express');
const app = new express();

app.get('', function(req, res, next) {
	res.send('hello world');
});

app.listen(3000, function() {
	console.log('http://localhost:3000');
});
