import express from 'express';
var app = express();

app.all('/secret', function(req, res, next) {
    console.log('Accessing the secret section ...');
    next(); // pass control to the next handler
});

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.get('/about', function(req, res) {
    res.send('About this wiki');
});

export default app;
