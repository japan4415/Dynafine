var result = db.wordsapi.aggregate([
  {$group:{_id:{id:'$siteID',sitename:'$sitename',kanren:'$kanren'},c:{$sum:1}}}
]);
DBQuery.shellBatchSize = result.count();
result
