var config = require('./config')
  , express = require('express')
  , doT = require('dot')
  , app = express()
  , http = require('http')
  , fs = require('fs')
  , assets = {}
  ;

// read the template file
fs.readFile('./views/main.dot', { encoding: 'utf8' }, function(err,data){
  assets.template = doT.template(data);
});



if (config.release) {
  fs.readdir('./release/js', function(err,files){
    if (err)
      return console.error('error reading assets', err);
    for(var i = 0; i < files.length; i++){
      if ( files[i].match(/^login-/))
        assets.loginjs = '/js/' + files[i]
      else if ( files[i].match(/^home-/))
        assets.homejs = '/js/' + files[i];
    }
  });
  
  fs.readdir(__dirname + '/release/js/lib', function(err,files){
    if (err)
      return console.error('error reading assets', err);
    for(var i = 0; i < files.length; i++){
      if ( files[i].match(/^require-/))
        assets.requirejs = '/js/lib/' + files[i]
    }
  });

  fs.readdir('./release/css', function(err,files){
    if (err)
      return console.error('error reading assets', err);
    for(var i = 0; i < files.length; i++){
      if ( files[i].match(/^login-/))
        assets.logincss = '/css/' + files[i]
      else if ( files[i].match(/^home-/))
        assets.homecss = '/css/' + files[i];
    }
  });
  
  fs.readFile('./release/js/config.js', { encoding: 'utf8' }, function(err,data){
    assets.requirejsconfig = data;
  });

} else {
  fs.readFile('./public/js/config.js', { encoding: 'utf8' }, function(err,data){
    assets.requirejsconfig = data;
  });
  
  assets.loginjs = '/js/login.js';
  assets.homejs = '/js/home.js';
  assets.requirejs = '/js/lib/require.js';
  assets.logincss = '/css/login.css';
  assets.homecss = '/css/home.css';
}

app.configure(function(){
  app.set('port', config.port);
  app.use(express.static(config.staticPath));
});

app.get( '*',  function( req, res, next ){
  console.log('get');
  res.end(assets.template({
    requirejs: assets.requirejs,
    requireconfig: assets.requirejsconfig,
    caption: 'hey', 
    assetjs: req.user ? assets.homejs : assets.loginjs,
    assetcss: req.user ? assets.homecss : assets.logincss,
    user: req.user ? req.user.toJSON() : null,
    bs: JSON.stringify({ user: 'bob', license: true }) 
  }));
});


server = http.createServer(app).listen(config.port);
console.log( 'Server is listening on port', config.port );