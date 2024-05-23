//create a web Server
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var comments = [];

http.createServer(function (req, res) {
    var url_parts = url.parse(req.url);

    if (url_parts.pathname == '/') {
        fs.readFile('./comment.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    } else if (url_parts.pathname == '/comment') {
        var body = '';
        req.on('data', function (data) {
            body += data;
            console.log('Partial body: ' + body);
        });
        req.on('end', function () {
            var POST = qs.parse(body);
            comments.push(POST['comment']);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<html><head><title>Comment Page</title></head><body>');
            res.write('<h1>Comments</h1>');
            for (var i in comments) {
                res.write('<p>' + comments[i] + '</p>');
            }
            res.write('<form method="post" action="/comment">');
            res.write('<input type="text" name="comment">');
            res.write('<input type="submit" value="Submit Comment">');
            res.write('</form>');
            res.write('</body></html>');
            res.end();
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('Page not found');
        res.end();
    }
}).listen(8080); //the server object listens on port 8080
console.log('Server started on localhost:8080; press Ctrl-C to terminate....');