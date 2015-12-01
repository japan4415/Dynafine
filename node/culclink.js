mg = require('mongoose');

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

mg.connect('mongodb://localhost/test');

User2.aggregate([
  {$group:{_id:'$sitename',c:{$sum:1}}}
]).exec(function(result){
  console.log(result);
});

});
