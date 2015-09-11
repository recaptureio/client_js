var path = require('path');
var s3 = require('s3');
var semver = require('./package').version;
var stableVersion = semver.split('.')[0];

function uploadLib() {
  var options = require('./aws');
  var params = {
    localFile: path.join(__dirname, 'dist/recapture.min.js'),
    s3Params: {
      Bucket: options.bucket,
      Key: 'v' + stableVersion + '/' + 'recapture.min.js',
      ACL: 'public-read'
    }
  };
  
  var client = s3.createClient({
    s3Options: {
      accessKeyId: options.key,
      secretAccessKey: options.secret
    }
  });
  
  var uploader = client.uploadFile(params);
  
  uploader.on('error', function(err) {
    console.error('unable to upload:', err.stack);
  });
  
  uploader.on('progress', function() {
    console.log('progress', uploader.progressMd5Amount, uploader.progressAmount, uploader.progressTotal);
  });
  
  uploader.on('end', function() {
    console.log('done uploading');
  });
}

function uploadLoader() {
  var options = require('./aws');
  var params = {
    localFile: path.join(__dirname, 'dist/recapture-loader.min.js'),
    s3Params: {
      Bucket: options.bucket,
      Key: 'loader.min.js',
      ACL: 'public-read'
    }
  };
  
  var client = s3.createClient({
    s3Options: {
      accessKeyId: options.key,
      secretAccessKey: options.secret
    }
  });
  
  var uploader = client.uploadFile(params);
  
  uploader.on('error', function(err) {
    console.error('unable to upload:', err.stack);
  });
  
  uploader.on('progress', function() {
    console.log('progress', uploader.progressMd5Amount, uploader.progressAmount, uploader.progressTotal);
  });
  
  uploader.on('end', function() {
    console.log('done uploading');
  });
}

uploadLib();
uploadLoader();
