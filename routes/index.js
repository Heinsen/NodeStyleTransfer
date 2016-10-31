var express = require('express')
var router = express.Router();

var fs = require("fs");
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

var loadbalancer = require('../models/loadbalancer.js');

var contentImagePath;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* Upload content image */
router.post('/uploadimage', upload.single('file'), function(req, res, next) {
	//Still have not figured the correct way to determine the path, but this works
	var file = __dirname + '/../public/images/content/' + req.file.filename;
	console.log(file)
  	fs.rename(req.file.path, file, function(err) {
    	if (err) {
      		console.log(err);
      		res.send(500);
    	} else {
    		contentImagePath = req.file.filename;

      		res.render('index', {
      		uploadedImagePath: req.file.filename });
    	}
  	});
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