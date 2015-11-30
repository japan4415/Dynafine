var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/Dynafine',function(req,res,next){
  res.render('test',{'render test'});
});

module.exports = router;
