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
  kanren:[Number],
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


console.log('処理を開始します');
async.waterfall([
  /* siteIDの数を数え上げ */
  function(next){
    idlist = ['0','1','2','3','4','5','6','7','8','9','10'];
    next(null,idlist);
  },
  /* ここからそれぞれに分岐 */
  function(result,next){
    async.eachSeries(idlist,function(line,nextline){
      console.log('これから' + line + 'を見ていくよ');
      async.waterfall([
        function(next2){
            User2.update({},{$set:{flag:0}},{upsert:false,multi:true},function(err){
            //console.log(err);
            next2(null,'test');
          });
        },
        function(result,next2){
          //console.log(siteurlurl);
          User2.aggregate([
            {$match:{'siteID':line}},
            {$group:{_id:'$words.hyoso',c:{$sum:'$words.tfidf'}}},
            {$sort:{c:-1}},
            {$limit:5}
          ]).exec(function(err,res2){
            console.log(res2[0]._id + res2[1]._id + res2[2]._id + res2[3]._id + res2[4]._id);
            User2.update({$or:[{'words.hyoso':res2[0]._id},{'words.hyoso':res2[1]._id},{'words.hyoso':res2[2]._id},{'words.hyoso':res2[3]._id},{'words.hyoso':res2[4]._id}]},{$set:{'flag':1}},{upsert:false,multi:true},function(errrrrr){
              next2(null,null);
            });
          });
        },
      function(result,next2){
          User2.aggregate([
            {$match:{'flag':1}},
            {$group:{_id:'$siteID',c:{$sum:'$words.tfidf'}}},
            {$sort:{c:-1}},
            {$limit:5}
          ]).exec(function(err,fires){
            next2(null,fires);
          });
      }
    ],function(err,results){
      console.log('top5は' + results[0]._id + results[1]._id + results[2]._id + results[3]._id + results[4]._id);
      User2.update({siteID:line},{$set:{kanren:[results[0]._id,results[1]._id,results[2]._id,results[3]._id,results[4]._id,]}},{upsert:false,multi:true},function(){
        nextline(null,line._id);
      });
    });
  },function(err,result){
    next(err,result);
  });
}],function(err,result){
  console.log(result + 'について書き換えが完了');
  mg.disconnect();
});
