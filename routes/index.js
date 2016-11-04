var express = require('express');
const jade = require('jade');
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
var uploadStyleTansfer = multer({ dest: "public/images/results/" });

const resulttemplateCompileFunction = jade.compileFile('views/partials/resulttemplate.jade');

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

/* Upload completed styl-transfer */
router.post('/public/images/results', uploadStyleTansfer.single('file'), function(req, res, next) {
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

	var resul = loadresult();
	console.log(resul);
	loadbalancer.startstyletransfer(contentImage,
									styleImage,
									function(result) {
  		res.render('styletransferprogress', { results : resul });
	});
});

router.get('/completedstyletransfers', function(req, res, next) {
	var resul = loadresult();
	res.render('completedstyletransfers', { results : resul });
});


function loadresult() {

	var files = fs.readdirSync('./public/images/results/');
	var resultDiv = "";
	files.forEach(file => {
		resultDiv += resulttemplateCompileFunction({
			result_name : ('/images/results/' + file)
		});
	});
	return resultDiv;
}

module.exports = router;