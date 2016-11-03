var express = require('express');
var router = express.Router();

var loadbalancer = require('../models/loadbalancer.js');

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

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {uploadedImagePath: '/images/resources/white_square.png'});
});

/* Upload content image */
router.post('/uploadimage', upload.single('file'), function(req, res, next) {
	if(req.file != undefined) {
		res.render('index', { uploadedImagePath: req.file.path } );
	}
	else {
		res.render('index');
	}
});

router.get('/startstyletransfer', function(req, res, next) {

	var contentImage = req.query.content_image;
	var styleImage = req.query.style_image;

	loadbalancer.startstyletransfer(contentImage,
									styleImage,
									function(result) {
  		res.render('styletransferprogress', {});
	});
});

module.exports = router;