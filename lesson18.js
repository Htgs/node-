var http = require('http');

var server = http.createServer(requestHandler);

// 1. 检测请求中请求体是否存在，若存在则解析请求体；
// 2. 查看请求体中的id是否存在，若存在则去数据库查询；
// 3. 根据数据库结果返回约定的值；
function parseBody(req, callback) {
    // 根据http协议从req中解析body
    // console.log('headers', req.headers);
    // console.log('httpVersion', req.httpVersion);
    // console.log('method', req.method);
    // console.log('rawHeaders', req.rawHeaders);
    // console.log('rawTrailers', req.rawTrailers);
    // console.log('socket',req.socket);
    // console.log('statusCode', req.statusCode);
    // console.log('statusMessage', req.statusMessage);
    // console.log('trailers', req.trailers);
    // console.log('url', req.url);
    console.log(req);
    callback(null, body);
}
function checkIdInDatabase(body, callback) {
    //根据body.id在Database中检测，返回结果
    callback(null, dbResult);
}
function returnResult(dbResult, res) {
    if (dbResult && dbResult.length > 0) {
        res.end('true');
    } else {
        res.end('false');
    }
}
const middlewares = [
    function fun1(req, res, next) {
        parseBody(req, function(err, body) {
            if (err) return next(err);
            req.body = body;
            console.log('parseBody');
            next();
        });
    },
    function fun2(req, res, next) {
        checkIdInDatabase(req.body.id, function(err, rows) {
            if (err) return next(err);
            res.dbResult = rows;
            console.log('checkIdInDatabase');
            next();
        });
    },
    function fun3(req, res, next) {
        if (res.dbResult && res.dbResult.length > 0) {
            res.end('true');
        } else {
            res.end('false');
        }
        next();
    }
];

function requestHandler(req, res) {
    // parseBody(req, function(err, body) {
    //     checkIdInDatabase(body, function(err, dbResult) {
    //         returnResult(dbResult, res);
    //     });
    // });
    let i = 0;
    //由middlewares链式调用
    function next(err) {
        if (err) {
            return res.end('error:', err.toString());
        }
        if (i<middlewares.length) {
            middlewares[i++](req, res, next);
        } else {
            return;
        }
    }
    //触发第一个middleware
    next();
}
server.listen(3000);
