var Q = require('q');
var knox = require('knox');

var UserImageUploader = function(options){
  //deffered is used to handle async functions with callbacks (rather than asynch promises)
  //deffered is a deffered object that returns a promise to the caller (ImageUploader() in imageRoutes.js)
  //so the .then() on ImageUploader will not fire until deferred is resolved or rejected
  var deferred = Q.defer();
  var buf = new Buffer(options.data_uri.replace(/^data:image\/\w+;base64,/, ""),'base64');
console.log('in UserImageUploader, these are teh options, make sure id and caption are here++++', options);
  var knoxClient = knox.createClient({
    key: '',//use .env for these
    secret: '',
    bucket: ''
  });
  // var knoxClient = knox.createClient({
  //    key: 'AKIAJDZGCTJ676WJRFXA',
  //    secret: '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',
  //    bucket: 'giraffepawprints'
  //  });

  // endpoint and options for the request headers to the s3 bucket, sent with req.end(buf)
  req = knoxClient.put('/photos/' + options.filename, {
   'Content-Length': buf.length,
   'Content-Type': options.filetype,
   'x-amz-acl': 'public-read'
  });

  //on response from the s3 bucket send the url of the saved image to ImageUploader.then() in imageRoutes
  req.on('response', function(res) {
    if (res.statusCode === 200) {
      deferred.resolve({url: req.url, id: options.id, caption: options.caption});
    } else
      deferred.reject({error: 'true'});
  });
//start the requset by sending the file as a buffer to the s3 Bucket
  req.end(buf);
  return deferred.promise;
}

module.exports = UserImageUploader;
