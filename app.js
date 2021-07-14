"use strict";

var express = require('express');
var expApp = express();
var http = require('http').Server(expApp);
var path = require('path');
var bodyParser = require('body-parser');

// all environments
expApp.set('port', process.env.PORT || 8000);
expApp.set('views', __dirname + '/views');
expApp.set('view engine', 'ejs');
expApp.use(bodyParser.urlencoded({ extended: true }));
expApp.use(bodyParser.json());
expApp.use(express.static(path.join(__dirname, 'public')));

//----------------ROUTES--------------------------//
require("./routes/route.js")(expApp);

http.listen(expApp.get('port'), function(){
	console.log('Spotify App Server listening on port ' + expApp.get('port'));
});
