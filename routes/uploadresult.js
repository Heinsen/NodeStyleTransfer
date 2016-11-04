var express = require('express');
var router = express.Router();

var multer  = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/results/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.jpg');
    }
});

var upload = multer({ storage: storage });

/* Upload result image */
router.post('/', upload.single('file'), function(req, res, next) {
    console.log('hej');
    console.log(req.file.path);

    res.sendStatus(200);
});

module.exports = router;