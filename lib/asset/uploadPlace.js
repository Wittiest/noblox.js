// Includes
var http = require('../util/http.js').func;

// Args
exports.required = ['data'];
exports.optional = ['asset', 'jar'];

// Define
function uploadPlace(jar, data, asset) {
  var httpOpt = {
    url: '//data.roblox.com/Data/Upload.ashx?json=1&assetid=' + asset + '&type=Place',
    options: {
      resolveWithFullResponse: true,
      method: 'POST',
      jar: jar,
      body: data,
      headers: {
        'Content-Type': 'application/xml'
      }
    }
  };
  return http(httpOpt)
    .then(function (res) {
      if (res.statusCode === 200) {
        var body = res.body;
        var parsed;
        try {
          parsed = JSON.parse(body);
        } catch (e) {
          throw new Error('Could not parse JSON, returned body:' + body);
        }
        return parsed;
      } else {
        throw new Error('Upload failed');
      }
    });
}

exports.func = function (args) {
  return uploadPlace(args.jar, args.data, args.asset);
};
