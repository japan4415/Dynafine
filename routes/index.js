var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/dynafine',function(req,res,next){
  console.log('チェックまでは遠てるで');
  res.render('testhtmls/test',{title:'render test'});
});

module.exports = router;
