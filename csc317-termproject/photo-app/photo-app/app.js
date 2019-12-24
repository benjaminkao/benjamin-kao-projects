var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var imageController = require('./controllers/image-controller');
var imageHelper = require('./helpers/imageHelper');
var commentHelper = require('./helpers/commentHelper');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('csc317secret', {
    'maxAge': 900000

}));


app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);

app.use('/users', usersRouter);

app.get('/aboutus', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'aboutus.html'));
});

app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', usersRouter);

app.post('/logout', usersRouter);

app.get('/register', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'registration.html'));
});

app.post('/register', usersRouter);

app.get('/post-image', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'postimage.html'));
})

app.post('/post-image', imageController);


//Sends post request that contains how many images have already been shown and returns data
app.post('/images', function(req, res, next) {
    console.log(req.body.numOfPages);
    imageHelper.getRecentSixImages(req.body.numOfPages)
        .then((rows) => {
            res.send(rows);
        })
})

app.post('/search', function(req, res, next) {
    var values = req.body.values.replace(/,/g, "|");
    console.log(values);
    console.log(req.body.numOfPages);

    values = [
        values,
        values,
        values,
        values
    ]

    imageHelper.searchForSix(values, req.body.numOfPages)
        .then((rows) => {
            res.send(rows);
        })
});

app.post('/searchAll', function(req, res, next) {
    var values = req.body.values.replace(/,/g, "|");

    values = [
        values,
        values,
        values,
        values
    ]

    imageHelper.searchForAll(values)
        .then((rows) => {
            console.log(rows.length);
            res.send(rows);
        })
});

app.get('/totalimages', function(req, res, next) {
    console.log("Getting total number of images");
    imageHelper.getTotalNumberOfImages()
        .then((rows) => {
            res.send(rows);
        })
});

app.get('/nameTest', function(req, res, next) {
    imageHelper.getName()
        .then((rows) => {
            console.log(rows);
            res.send(rows);
        })
});

app.post('/postComment', function(req, res, next) {
    console.log(req.cookies);
    console.log(req.body.imageId);
    console.log(req.body.comment);
    
    commentHelper.postComment(req, res, next);
});


app.post('/getComments', function(req, res, next) {
    console.log(req.body.numOfPages);
    console.log(req.body.index);
    commentHelper.getRecentSixComments(req)
        .then((rows) => {
            res.send(rows);
        });
});


module.exports = app;