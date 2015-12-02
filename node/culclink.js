mg = require('mongoose');
async = require('async');

var Schema = mg.Schema;
var fstschema2 = new Schema({
  siteID:String,
  sitename:String,
  siteurl:String,
  sitesnippet:String,
  nakami:String,
  sitetango:Number,
  flag:Number,
  words:{
    hyoso:String,
    kaisu:Number,
    sitekaisu:Number,
    tfidf:Number
  }
},{collection:'wordsapi'});
mg.model('Googleapi2',fstschema2);
//mg.connect('mongodb://localhost/test');
var User2 = mg.model('Googleapi2');

//mongodb準備
var agschema = new Schema({
  _id:String,
  c:Number,
  result:String
},{collection:'wordsapi'});
mg.model('Googleapiag',agschema);
//mg.connect('mongodb://localhost/test');
var Userag = mg.model('Googleapiag');

mg.connect('mongodb://localhost/test');

console.log('変更を開始します。');
Userag.aggregate([
  {$group:{_id:'$sitename',c:{$sum:1}}}
]).exec(function(err,result){
  console.log('aggregate終了');
  var i = 0;
  async.eachSeries(result,function(line,next){
    console.log(line._id+'を書き換えるよ');
    User2.update({'sitename':line._id},{$set:{'siteID':i}},{upsert:false,multi:true},function(err){
      console.log(i + line._id +'の書き換え完了'+err);
      i++;
      next(null,err);
    });
  },function(err,results){
    console.log('最後まで行ったよ');
    mg.disconnect(function(err){
      console.log(err);
    });
  });
});
