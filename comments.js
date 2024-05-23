//create web server
var express = require('express');
var app = express();

//use the body parser to parse the body of the request
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connect to the database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/comments');

//create the schema
var Schema = mongoose.Schema;
var commentSchema = new Schema({
    name: String,
    comment: String,
    date: Date
});

//create the model
var Comment = mongoose.model('Comment', commentSchema)