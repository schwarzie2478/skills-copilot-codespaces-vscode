// create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var comments = [];
var server = http.createServer(function (request, response) {
    var urlObj = url.parse(request.url, true);
    var pathname = urlObj.pathname;
    if (pathname === '/') {
        fs.readFile('./index.html', function (err, data) {
            if (err) {
                console.log(err);
                response.end('read file index.html error');
            } else {
                response.end(data);
            }
        });
    } else if (pathname === '/submit') {
        var comment = urlObj.query;
        comments.push(comment);
        response.end(JSON.stringify(comments));
    } else {
        fs.readFile('.' + pathname, function (err, data) {
            if (err) {
                console.log(err);
                response.end('read file error');
            } else {
                response.end(data);
            }
        });
    }
});
