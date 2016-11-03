var express = require('express');
var router = express.Router();
var app = express();

var express      = require('express');
var cookieParser = require('cookie-parser');

app.use(cookieParser());

var fs = require("fs");
var multer  = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'contentuploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg');
  }
});

var upload = multer({ storage: storage });

var loadbalancer = require('../models/loadbalancer.js');

var contentImagePath;

/* GET home page. */
router.get('/', function(req, res, next) {
	//console.log('Cookies: ', req.cookies);
  	res.render('index', {uploadedImagePath: '/images/resources/white_square.png'});
})

/* Upload content image */
router.post('/uploadimage', upload.single('file'), function(req, res, next) {
	res.render('index', { uploadedImagePath: req.file.path } );
});

router.get('/startstyletransfer', function(req, res, next) {

	var publicimagePath = __dirname + '../public/images/';

	loadbalancer.startstyletransfer(publicimagePath + 'content/' + contentImagePath,
									publicimagePath + 'style/art_the_great_wave_off_kanagawa.jpg',
									function(result) {
  		res.render('styletransferprogress', {});
	});
});

module.exports = router;