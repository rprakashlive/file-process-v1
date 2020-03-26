var express = require('express');
var dataCtrl = require('../controllers/dataCtrl');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/json/generate', dataCtrl.createJson);

module.exports = router;
