var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('homeは通過しているよ');
  res.render('index', { title: 'Express tesssts' });
});

router.get('/dynafine',function(req,res,next){
  console.log(req+res);
  res.render('testhtmls/test',{title:'render test'});
});

router.get('/test.css',function(req,res,next){
  console.log(req+res);
  res.send('testhtmls/test');
});

module.exports = router;
