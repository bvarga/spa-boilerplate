var fs = require('fs')
  , doT = require('dot');

module.exports = function(release){
  var assets = {};

  assets.template = doT.template(fs.readFileSync('./public/templates/main.html', { encoding: 'utf8' }));
  assets.loginbody = doT.template(fs.readFileSync( './public/templates/loginbody.html', { encoding: 'utf8'}));
  assets.homebody = doT.template(fs.readFileSync( './public/templates/homebody.html', { encoding: 'utf8'}));

  if (release) {
    //assets.requirejs = false;
    var files = fs.readdirSync('./release/js');
    for(var i = 0; i < files.length; i++){
      if ( files[i].match(/^login-/))
        assets.loginjs = '/js/' + files[i]
      else if ( files[i].match(/^home-/))
        assets.homejs = '/js/' + files[i];
    }
    var files = fs.readdirSync('./release/css');
    for(var i = 0; i < files.length; i++){
      if ( files[i].match(/^login-/))
        assets.logincss = '/css/' + files[i]
      else if ( files[i].match(/^home-/))
        assets.homecss = '/css/' + files[i]
      else if ( files[i] == 'logininline.css' )
        assets.logininlinestyle = fs.readFileSync( './release/css/' + files[i], { encoding: 'utf8'})
      else if ( files[i] == 'homeinline.css' )
        assets.homeinlinestyle = fs.readFileSync( './release/css/' + files[i], { encoding: 'utf8'});
    }
  } else {
    assets.requirejs = '/js/lib/require.js';
    assets.requirejsconfig = '/js/config.js';
    assets.loginjs = '/js/login.js';
    assets.homejs = '/js/home.js';
    assets.logincss = '/css/login.css';
    assets.homecss = '/css/home.css';
    assets.logininlinestyle = '/css/logininline.css';
    assets.homeinlinestyle = '/css/homeinline.css';
  }
  return assets;
};