var http = require('../util/http.js').func;

exports.required = ['assetId'];

exports.func = (args) => {
  const jar = args.jar;

  return http({
    url: 'http://assetgame.roblox.com/Asset/?id=' + args.assetId,
    options: {
      method: 'GET',
      jar: jar,
      resolveWithFullResponse: true,
      followRedirect: false
    }
  }).then((res) => {
    if (res.statusCode !== 200) {
      throw new Error('You are not logged in');
    } else {
      return res;
    }
  });
};
